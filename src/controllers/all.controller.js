const allService = require("../services/all.service");
var HttpStatus = require('http-status-codes');

exports.DeleteAll = async function (req, res) {
    try {
        var deleted = await allService.DeleteAll();
        if (deleted === false)
        {
            console.error("Username or password is incorrect");
            return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Username or password is incorrect" });
        }
        console.log(deleted);
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json(deleted);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}