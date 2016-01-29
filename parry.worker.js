var cronJob = require("cron").CronJob,
  nodemailer = require("nodemailer"),
  config = require("./parry.config");

var Group = require("./models/group");
var Post = require("./models/post");



//new cronJob(config.cron.pattern, function() {
  console.log("Running...")
  Group.forge()
    .fetch({withRelated: ["subscriptions"]})
    .then(function (group) {


        var subscriptions = group.related("subscriptions");
        var emails = subscriptions.reduce(function(memo, subscription){
          memo.push(subscription.get("email"));
          return memo;
        }, []);

        Post.forge({group_id: group.get("id")})
        .fetchAll({withRelated: ["user"]})
        .then(function(posts){
          console.log(posts.toJSON())
        })
        .catch(function(err){ console.log("No posts found.")});






        var smtpTransport = nodemailer.createTransport(config.nodemailer);
        /*smtpTransport.sendMail({
          from: "Parry", // sender address
          to: "postmaster@parry.email",
          subject: "Parry : " + group.get("name"),
          cc: emails,
          text: "Parry " + group.get("name")
        }, function(error, response){
          if(error){
            console.log(error);
          }else{
            console.log("Message sent: " + JSON.stringify(response));
          }
        });*/

    })
    .catch(function (err) {
      console.log(err);
    }).toJSON();

//}, null, true, config.cron.timeZone);
