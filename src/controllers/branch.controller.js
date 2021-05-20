const branchService = require("../services/branch.service");
const { validationResult } = require('express-validator');
var HttpStatus = require('http-status-codes');

exports.GetAllBranches = async function (req, res) {
    try {
        var branches = await branchService.GetAllBranches();
        console.log('All Branches found!');
        return res.status(HttpStatus.StatusCodes.OK).json(branches);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetAllBrancheNamesIds = async function (req, res) {
    try {
        var branches = await branchService.GetAllBrancheNamesIds();
        console.log('All All Branche Names Ids found!');
        return res.status(HttpStatus.StatusCodes.OK).json(branches);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetOneBranch = async function (req, res) {
    try {
        const branchID = req.params.branchID;
        var branch = await branchService.GetOneBranch(branchID);
        console.log('Branch ' + branchID + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(branch);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.GetOneBranchByAddress = async function (req, res) {
    try {
        const branchAddress = req.params.branchAddress;
        var branch = await branchService.GetOneBranchByAddress(branchAddress);
        console.log('Branch ' + branchAddress + ' found!');
        return res.status(HttpStatus.StatusCodes.OK).json(branch);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.AddBranch = async function (req, res) {
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
        
        var branch = await branchService.AddBranch(req.body);
        console.log("Branch " + req.body.branchName + " successfully added!");
        return res.status(HttpStatus.StatusCodes.CREATED).json(branch);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.UpdateBranch = async function (req, res) {
    try {
        if (req.body === null || req.body === undefined)
        {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: "Data is null." });
        }
        const branchName = req.params.branchName;
        var branch = await branchService.UpdateBranch(req.body, userID);
        console.log("Branch " + branchName + " successfully updated!");
        return res.status(HttpStatus.StatusCodes.OK).json(branch);
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteBranch = async function (req, res) {
    try {
        const branchID = req.params.branchID;
        var branch = await branchService.DeleteBranch(branchID);
        console.log('Branch ' + branch + ' successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: branch});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

exports.DeleteBranches = async function (req, res) {
    try {
        var branch = await branchService.DeleteBranches();
        console.log('All branches successfully deleted!');
        return res.status(HttpStatus.StatusCodes.NO_CONTENT).json({result: branch});
    } catch (error) {
        console.error(error.message);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}