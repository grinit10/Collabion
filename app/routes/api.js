var User = require('../models/User');
var path = require("path");

module.exports = function (router) {

    //localhost:8080/api/addUser
    router.post("/addUser", function (req, resp) {
        if ((req.body.username == null) || (req.body.password == null) || (req.body.email == null))
            resp.json({success:false,message:"Please give all of username,password and email!!"});
        else {
            var usr = new User();
            usr.username = req.body.username;
            usr.password = req.body.password;
            usr.email = req.body.email;
            usr.save(function (err) {
                if (err) resp.json({success:false,message:"Duplicate data!!"});
                else resp.json({success:true,message:"User Created"});
            });
        }
    });

    return router;
}