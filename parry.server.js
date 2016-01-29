var bodyParser                = require("body-parser"),
    ControllerDigest          = require("./controllers/digest"),
    ControllerGroup           = require("./controllers/group"),
    ControllerPost            = require("./controllers/post"),
    ControllerSubscription    = require("./controllers/subscription"),
    ControllerUser            = require("./controllers/user"),
    ControllerHipChat         = require("./controllers/hipchat")
    express                   = require("express");

    // Routes

    express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

    .get("/api", function (req, res) {
      res.json(200, {msg: "OK" });
    })

    ////////////////////////////////////////////////////////////////////////////
    // DIGESTS

    .get("/api/digests", ControllerDigest.getAll)

    .get("/api/digests/:id([0-9]+)", ControllerDigest.getOne)

    ////////////////////////////////////////////////////////////////////////////
    // GROUPS

    .get("/api/groups", ControllerGroup.getAll)

    .get("/api/groups/:id([0-9]+)", ControllerGroup.getOne)

    ////////////////////////////////////////////////////////////////////////////
    // POSTS

    .get("/api/posts", ControllerPost.getAll)

    .get("/api/posts/:id([0-9]+)", ControllerPost.getOne)

    ////////////////////////////////////////////////////////////////////////////
    // SUBSCRIPTIONS

    .get("/api/subscriptions", ControllerSubscription.getAll)

    .get("/api/subscriptions/:id([0-9]+)", ControllerSubscription.getOne)

    ////////////////////////////////////////////////////////////////////////////
    // USERS

    .get("/api/users", ControllerUser.getUsers)

    .get("/api/users/:id([0-9]+)", ControllerUser.getUser)

    .post("/api/users", ControllerUser.saveUser)

    .put("/api/users/:id([0-9]+)", ControllerUser.saveUser)

    .delete("/api/users/:id([0-9]+)", ControllerUser.deleteUser)

    ////////////////////////////////////////////////////////////////////////////
    // HIPCHAT

    .post("/api/hipchat", function(req, res){
        console.log(JSON.stringify(req.body));

    })

    .use(express.static(__dirname + "/"))
    .listen(process.env.PORT || 5000);
