var User = require('../models/User');
//var path = require("path");
var jwt = require('jsonwebtoken');
var secret = "Harry Potter";

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


    router.post("/authenticate", function (req, resp) {
        if ((req.body.username == null) || (req.body.password == null))
            resp.json({success:false,message:"Please give both of username and password"});
        else
        {
            User.findOne({ username: req.body.username}).select('email username password').exec(function (err,user) {
                if(err) throw  err;
                else if(!user)
                    resp.json({success:false,message:"Could not find the user!!"});
                else if(user){
                    var isValidCredential = user.comparePassword(req.body.password);
                    if(!isValidCredential)
                        resp.json({success:false,message:"Invalid credentials!!"});
                    else
                    {
                        var token = jwt.sign({
                            data: {username:user.username,email:user.email}
                        }, secret, { expiresIn: '1h' });
                        resp.json({success:true,message:"User authenticated!!",token:token});
                    }
                }
            })
        }
    });


    router.use(function (req,resp,next) {
        var token = req.body.token || req.body.query || req.headers["x-access-token"];
        //console.log(token);
        if(token)
            jwt.verify(token,secret,function (err,decoded) {
                if(err){
                    //console.log(err);
                    resp.json({success:false,message:"Inavlid token!!"});
                }
                else{
                    req.decoded = decoded;
                    next();
                }
            });
        else
            resp.json({success:false,message:"Token not found!!"});
    })

    router.get("/me",function (req,resp) {
        resp.send(req.decoded);
    })
    return router;
}