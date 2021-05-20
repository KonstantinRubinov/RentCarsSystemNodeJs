const messageService = require("../services/message.service");
var HttpStatus = require('http-status-codes');
const { validationResult } = require('express-validator');

exports.GetAllMessages = async function (req, res) {
    try {
        var messages = await messageService.GetAllMessages();
        console.log('All messages found!');
        return res.status(HttpStatus.StatusCodes.OK).json(messages);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetMessagesByUser = async function (req, res) {
    try {
        const userID = decoded(req).userID;
        var messages = await messageService.GetMessagesByUser(userID);
        console.log('All messages found!');
        return res.status(HttpStatus.StatusCodes.OK).json(messages);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetMessageById = async function (req, res) {
    try {
        const messageID = req.params.messageID;
        var message = await messageService.GetMessageById(messageID);
        console.log('Message ' + messageID + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(message);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.AddMessage = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).jsonp(errors.array());
        }
        const userID = decoded(req).userID;
        var message = await messageService.AddMessage(userID, req.body);
        console.log("Message " + messageID + " successfully added!");
        return res.status(HttpStatus.StatusCodes.CREATED).json(message);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.UpdateMessage = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const userID = decoded(req).userID;
        const messageID = req.params.messageID;
        var message = await messageService.UpdateMessage(messageID, userID, req.body);
        console.log("Message " + messageID + " successfully updated!");
        return res.status(HttpStatus.StatusCodes.OK).json(message);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteMessage = async function (req, res) {
    try {
        const messageID = req.params.messageID;
        var message = await messageService.DeleteMessage(messageID);
        console.log('Message ' + messageID + ' successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: message});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteMessagesByUser = async function (req, res) {
    try {
        const userID = req.params.userID;
        var messages = await messageService.DeleteMessagesByUser(userID);
        console.log('Messages successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: messages});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}