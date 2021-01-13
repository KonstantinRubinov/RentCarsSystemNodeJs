const messageSchema = require("../models/Message");

function GetAllMessages(){
    try {
        var messages = messageSchema.find();
        return messages;
    } catch (error) {
        throw Error(error);
    }
}

function GetMessagesByUser(userID){
    try {
        var messages = messageSchema.find({userID: userID});
        return messages;
    } catch (error) {
        throw Error(error);
    }
}

function GetMessageById(messageID){
    try {
        var message = messageSchema.findOne({messageID: messageID});
        return message;
    } catch (error) {
        throw Error(error);
    }
}

function AddMessage(userID, body){
    const newMessage = new branchSchema(body);
    newMessage.userID = userID;
    return newMessage.save().then((response) => {
        return response;
    }).catch(error => {
        throw Error(error);
    });
};

function UpdateMessage(messageID, userID, body){
    try {
        var message = messageSchema.findOneAndUpdate({messageID: messageID, userID: userID}, {$set: body});
        return message;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteMessage(messageID){
    try {
        var message = messageSchema.findOneAndRemove({messageID: messageID});
        return message;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteMessagesByUser(userID){
    messageSchema.remove({userID: userID}, (error, data) => {
        if (error) {
            throw Error(error);
        } else {
            return data;
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