var Digests             = require("../collections/digests"),
    Groups              = require("../collections/groups"),
    Posts               = require("../collections/posts"),
    Subscriptions       = require("../collections/subscriptions"),
    Users               = require("../collections/users"),
    GroupIntegrations   = require("../collections/group_integrations"),
    UserIntegrations    = require("../collections/user_integrations"),
    Digest              = require("../models/digest"),
    Group               = require("../models/group"),
    Post                = require("../models/post"),
    Subscription        = require("../models/subscription"),
    User                = require("../models/user"),
    GroupIntegration   = require("../models/group_integration"),
    UserIntegration    = require("../models/user_integration");

var _ = require("lodash");

var Controller = function (req, res) {

  var command = "/parry",
      integration = "hipchat";

  var messagePath = "body.item.message.message",
      message = _.get(req, messagePath).substr(command.length + 1),
      roomId = _.get(req, "body.item.room.id"),
      roomName = _.get(req, "body.item.room.name"),
      userId = _.get(req, "body.item.message.from.id"),
      userName = _.get(req, "body.item.message.from.mention_name"),
      words = message.split(" "),
      action = words.shift(),
      actions = [
        "add",
        "digest",
        "groups",
        "help",
        "join",
        "post",
        "repost",
        "resend",
        "subscriptions",
        "subscribe"
      ];

  var printSuccess = function(message){
      return res.status(200).json({
        "color": "green",
        "message": message,
        "notify": false,
        "message_format": "text"
      });
    },
    printError = function(message, err){
      return res.status(200).json({
        "color": "red",
        "message": "Error: " + message + " " + err,
        "notify": false,
        "message_format": "text"
      });
    }

  if(actions.indexOf(action) === -1){
    printError('Action not found.');
  }

  // Create group based on room
  function groupIntegrationExists(fnExists, fnDoesnt){
    GroupIntegration.forge({key: roomId, name: integration})
      .fetch({require: true})
      .then(fnExists)
      .catch(function(err){

        if(_.isFunction(fnDoesnt)){
          fnDoesnt();
        }else {
           printError("No group, please use /add", err);
        }

      });
  }

  function userIntegrationExists(fnExists, fnDoesnt){
    UserIntegration.forge({key: userId, name: integration})
      .fetch({require: true})
      .then(fnExists)
      .catch(function(err){

        if(_.isFunction(fnDoesnt)){
          fnDoesnt();
        }else {
           printError("No user found. Please use /join {email}", err);
        }

      });
  }

  switch(action){

    case "add":
      GroupIntegration.forge({key: roomId})
      .fetch({require: true})
      .then(printError.bind(this, "Group already added."))
      .catch(function(err){
        Group.forge({name: roomName}).save()
          .then(function(group){
            GroupIntegration.forge({key: roomId, group_id: group.get("id"), name: integration}).save()
            .then(printSuccess.bind(this, "Group " + roomName + " created"))
            .catch(printError.bind(this, "Group " + roomName + " integration failed."))
          })
      });
      break;

    /////////////////////////////////////////////////
    case "subscribe":
      userIntegrationExists(function(userIntegration){
        groupIntegrationExists(function(groupIntegration){
          Subscription.forge({
            user_id: userIntegration.get("id"),
            group_id: groupIntegration.get("id")
          })
          .fetch({require: true})
          .then(printError.bind(this, "Already subscribed!"))
          .catch(function(err){
            Subscription.forge({
              user_id: userIntegration.get("id"),
              group_id: groupIntegration.get("id")
            }).save()
              .then(printSuccess.bind(this, "Subscribed to " + roomName))
              .catch(printError.bind(this, "Subscription to " + roomName + " failed."))
          });
        });
      });
      break;

    /////////////////////////////////////////////////

    case "join":

      // /join {email}
      var email = words[0];

      if(_.isEmpty(email)){
        printError("Missing email");
        return;
      }

      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(email)){
        printError("Email invalid");
        return;
      }

      userIntegrationExists(printError.bind(this, "User already joined."),
        function(err){

          User.forge({
            name: userName,
            email: email
          })
          .save()
          .then(function (user) {
            UserIntegration.forge({
              user_id: user.get("id"),
              key: userId,
              name: "hipchat"
            })
            .save()
            .then(printSuccess.bind(this,"Hipchat user " + userName + " added!"))
            .catch(printError.bind(this, "Hipchat integration failed."))
          })
        });
      break;

    /////////////////////////////////////////////////
    case "post":
    case "repost":

      var url = words.shift(),
          description = words.join(" ");

      var re = /(([\w\.\-\+]+:)\/{2}(([\w\d\.]+):([\w\d\.]+))?@?(([a-zA-Z0-9\.\-_]+)(?::(\d{1,5}))?))?(\/(?:[a-zA-Z0-9\.\-\/\+\%]+)?)(?:\?([a-zA-Z0-9=%\-_\.\*&;]+))?(?:#([a-zA-Z0-9\-=,&%;\/\\"'\?]+)?)?/g;
      if(!re.test(url)){
        printError(url + " is a malformed URL.");
        return;
      }

      if(!description.length){
        printError("Missing description");
        return;
      }

      var isntRepost = action === "post"

      userIntegrationExists(function(userIntegration){
        groupIntegrationExists(function(groupIntegration){

          var savePost = function(){
            Post.forge({
              user_id: userIntegration.get('id'),
              url: url,
              description: description,
              group_id: groupIntegration.get("group_id")
            }).save()
            .then(printSuccess.bind(this, url + " " + action + "ed!"))
            .catch(printError.bind(this, url + " save failed."));
          }

          Post.forge({
            url: url,
            group_id: groupIntegration.get("group_id")
          })
          .fetch({require: isntRepost})
          .then(function(post){
            if(isntRepost){
              printError("Already been posted to group. Please use '/repost' to post again");
            } else {
              savePost();
            }
          })
          .catch(savePost);

        });
      });

      break;

    /////////////////////////////////////////////////
    case "digest":

      Post.forge({digest_id: null})
      .fetchAll({withRelated: ["digest", "user"]})
      .then(function(posts){

        var message = posts.serialize().reduce(function(memo, post, index) {
          return memo + "\n" + (index + 1) + ") " + post.url + " by @" + post.user.name;
        }, '')
        return printSuccess("Today's digest: \n" + message);
      })
      .catch(printError.bind(this, "No links in current digest!"))
      break;

  }
}


module.exports = Controller;
