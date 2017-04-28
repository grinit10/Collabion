var express = require("express");
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true},
    email: { type: String, required: true, lowercase: true, unique: true }
});

UserSchema.pre("save", function (next) {
    var usr = this;
    bcrypt.hash(usr.password, null, null, function (err,hash) {
        usr.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password,this.password);
}
module.exports = mongoose.model('User',UserSchema)