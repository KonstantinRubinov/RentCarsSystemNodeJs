const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");

router.route("/messages").get(messageController.GetAllMessages);
router.route("/messages/:userID").get(messageController.GetMessagesByUser);
router.route("/messages/:messageID").get(messageController.GetMessageById);
router.route("/messages").post(messageController.AddMessage);
router.route("/messages/:messageID").put(messageController.UpdateMessage);
router.route("/messages/:messageID").delete(messageController.DeleteMessage);
router.route("/messages/:userID").delete(messageController.DeleteMessagesByUser);

module.exports = router;