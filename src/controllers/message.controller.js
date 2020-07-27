// controllers/message.controller.js

const express = require("express");
const router = express.Router();
const messageService = require("../services/message.service");

router.route("/messages").get(messageService.GetAllMessages);
router.route("/messages/:userID").get(messageService.GetMessagesByUser);
router.route("/messages/:messageID").get(messageService.GetMessageById);
router.route("/messages").post(messageService.AddMessage);
router.route("/messages/:messageID").put(messageService.UpdateMessage);
router.route("/messages/:messageID").delete(messageService.DeleteMessage);
router.route("/messages/:userID").delete(messageService.DeleteMessagesByUser);

module.exports = router;