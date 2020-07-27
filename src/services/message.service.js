// services/message.service.js

const express = require("express");
const router = express.Router();
const messageSchema = require("../models/Message");
const decoded = require("../middlewares/decoded");
var HttpStatus = require('http-status-codes');

// Get Messages
function GetAllMessages(req, res){
    messageSchema.find({},(error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.debug(response + " Messages");
            res.status(HttpStatus.OK).json(response);
        }
    })
}

// Get Message by userID
function GetMessagesByUser(req, res, next){
    const userID = req.params.userID;
    messageSchema.find({userID: userID}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            res.status(HttpStatus.OK).json({result: data})
        }
    })
}

// Get Message by messageID
function GetMessageById(req, res, next){
    const messageID = req.params.messageID;
    messageSchema.findOne({messageID: messageID}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            res.status(HttpStatus.OK).json({result: data})
        }
    })
}

// Add Message
function AddMessage(req, res, next){
    const userID = decoded(req).userID;
    const newMessage = new messageSchema(req.body);
    newMessage.userID = userID;
    // console.debug(newMessage);
    newMessage.save().then((response) => {
        res.status(HttpStatus.CREATED).json({
            message: "Message successfully added!",
            result: response
        });
    }).catch(error => {
        console.error(error);
        return next(error);
    });
};

// Update Message
function UpdateMessage(req, res, next){
    const messageID = req.params.messageID;
    const userID = decoded(req).userID;
    messageSchema.findOneAndUpdate({messageID: messageID, userID: userID}, {$set: req.body},
        (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Message ' + messageID + ' successfully updated!');
            res.status(HttpStatus.OK).json(data);
        }
    })
}


// Delete Message messageID
function DeleteMessage(req, res, next){
    const messageID = req.params.messageID;
    messageSchema.findOneAndRemove({messageID: messageID}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Message ' + messageID + ' successfully deleted!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

// Delete Messages By User
function DeleteMessagesByUser(req, res, next){
    const userID = req.params.userID;
    messageSchema.remove({userID: userID}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Messagees ' + userID + ' successfully deleted!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}


module.exports ={
    GetAllMessages:GetAllMessages,
    GetMessagesByUser:GetMessagesByUser,
    GetMessageById:GetMessageById,
    AddMessage:AddMessage,
    UpdateMessage:UpdateMessage,
    DeleteMessage:DeleteMessage,
    DeleteMessagesByUser:DeleteMessagesByUser
};