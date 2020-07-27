// services/login.service.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("../models/User");
var HttpStatus = require('http-status-codes');

// Sign-in
function Authenticate (req, res, next){
    //console.debug(req.body);
    const userNickName = req.body.userNickName;
    let getUser;
    userSchema.findOne({userNickName: userNickName}).then(user => {
        if (!user || user == "undefined") {
            //console.error(user);
            console.error("No User Authentication failed");
            return res.status(HttpStatus.UNAUTHORIZED).json({message: "No User Authentication failed"});
        }
        else{
            //console.debug(user);
            getUser = user;
            //console.debug(user.userPassword);
            //console.debug(req.body.userPassword);
            return bcrypt.compare(req.body.userPassword, getUser.userPassword);
        }
    }).then(response => {
        if (!getUser || getUser == "undefined") {
            //console.error("No response Authentication failed");
            //return res.status(HttpStatus.UNAUTHORIZED).json({message: "No response Authentication failed"});
        } else if (!response || response == "undefined") {
            //console.error("response " + JSON.stringify(response));
            console.error("No response Authentication failed");
            return res.status(HttpStatus.UNAUTHORIZED).json({message: "No response Authentication failed"});
        } else {
            //console.debug("getUser " + getUser);
            let jwtToken = jwt.sign({
                userNickName: getUser.userNickName,
                userLevel: getUser.userLevel,
                userID: getUser.userID
            }, "longer-secret-is-better", {
                expiresIn: "1h"
            });
            res.status(HttpStatus.OK).json({
                usertoken: jwtToken,
                expiresIn: 3600,
                userNickName: getUser.userNickName,
                userLevel: getUser.userLevel,
                userPicture: "src/assets/images/users/" + getUser.userPicture
            });
        }
    }).catch(error => {
        console.error("Authentication failed " + error);
        return res.status(HttpStatus.UNAUTHORIZED).json({message: "Authentication failed " + error});
    });
};

module.exports ={
    Authenticate:Authenticate
};