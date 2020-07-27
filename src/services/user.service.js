// services/user.service.js

const express = require("express");
const bcrypt = require("bcrypt");
const userSchema = require("../models/User");
const { validationResult } = require('express-validator');
var fs = require('fs');
var HttpStatus = require('http-status-codes');

function isValidIsraeliID(id) {
    id = String(id).trim();
    if (id.length > 9 || id.length < 5 || isNaN(id)) return false;

    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

    return Array
        .from(id, Number)
        .reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
}

function createGuid(){  
    function S4() {  
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
    }  
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();  
 }

// Get Users
function GetAllUsers(req, res){
    userSchema.find((error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            res.status(HttpStatus.OK).json(response);
        }
    })
}

// Get Single User
function GetOneUser(req, res, next){
    const userID = req.params.userID;
    userSchema.findOne({userID:userID}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            res.status(HttpStatus.OK).json({result: data});
        }
    })
}

// Get Single User By Name and Password
function ReturnUserByNamePassword(req, res, next){
    const userNickName = req.params.userNickName;
    const userPassword = req.params.userPassword;
    userSchema.findOne({userNickName: userNickName, userPassword: userPassword}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            res.status(HttpStatus.OK).json({result: data});
        }
    })
}

// Sign-up
function AddUser(req, res, next){
    if(!isValidIsraeliID(req.body.userID)){
        let error="User ID is problematic!";
        return next(error);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).jsonp(errors.array());
    } else {
        bcrypt.hash(req.body.userPassword, 10).then((hash) => {
            let extension = req.body.userPicture.split(".");
            extension = extension[extension.length-1];
            let pictureName = createGuid()+"."+extension;
            let filePath = "./src/assets/images/users/"+pictureName;
            req.body.userImage = req.body.userImage.replace(/^data:image\/\w+;base64,/, "");
            req.body.userImage = req.body.userImage.replace(/ /g, '+');
            if (req.body.userLevel < 1)
		    {
		    	req.body.userLevel = 1;
            }
            const user = new userSchema({
                userID: req.body.userID,
                userFirstName: req.body.userFirstName,
                userLastName: req.body.userLastName,
                userNickName:req.body.userNickName,
                userPassword: hash,
                userEmail: req.body.userEmail,
                userGender: req.body.userGender,
                userBirthDate: req.body.userBirthDate,
                userPicture: pictureName,
                userLevel: req.body.userLevel
            });
            let buff = new Buffer.from(req.body.userImage, 'base64');
            let fd =  fs.openSync(filePath, 'w');
            fs.write(fd, buff, 0, buff.length, 0, function(error,written){
                if (error!=null){
                    fs.closeSync( fd );
                    console.error("User not created! " + error);
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error});
                }
                fs.closeSync( fd );
            });
            req.body.userImage = "";
            //console.debug(user);
            user.save(
                // function (error) {
                //     console.error("User not created! " + error);
                //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error});
                // }
            ).then((response) => {
                response.userPassword = req.body.userPassword;
                //console.debug("User successfully created! " + response);
                console.log("User successfully created!");
                res.status(HttpStatus.CREATED).json({
                    message: "User successfully created!",
                    result: response
                });
            }).catch(error => {
                console.error("User not created! " + error);
                return next(error);
            });
        });
    }
};

// Update User
function UpdateUser(req, res, next){
    const userID = req.params.userID;
    userSchema.findOneAndUpdate(userID, {$set: req.body},
        (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('User ' + userID + ' successfully updated!')
            res.status(HttpStatus.OK).json(data);
        }
    })
}


// Delete User
function DeleteUser(req, res, next){
    const userID = req.params.userID;
    userSchema.findOneAndRemove(userID, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Users ' + userID + ' has been removed!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

// Delete Users
function DeleteUsers(req, res, next){
    userSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('All users has been removed!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

module.exports ={
    GetAllUsers:GetAllUsers,
    GetOneUser:GetOneUser,
    ReturnUserByNamePassword:ReturnUserByNamePassword,
    AddUser:AddUser,
    UpdateUser:UpdateUser,
    DeleteUser:DeleteUser,
    DeleteUsers:DeleteUsers
};