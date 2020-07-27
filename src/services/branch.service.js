// services/branch.service.js

const express = require("express");
const branchSchema = require("../models/Branch");
var HttpStatus = require('http-status-codes');

function createBranchModel(response)
{
    const branchModel = new branchSchema({
        branchID: response.branchID,
        branchName: response.branchName
    });
	return branchModel;
}

// Get Branches
function GetAllBranches(req, res){
    branchSchema.find({},(error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            //console.debug(response + " Branches");
            res.status(HttpStatus.OK).json(response);
        }
    })
}

// Get Branches names and ids
function GetAllBrancheNamesIds(req, res){
    branchSchema.find({},(error, response) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            response = createBranchModel(response);
            //console.debug(response + " Branches");
            res.status(HttpStatus.OK).json(response);
        }
    })
}

// Get Branch by id
function GetOneBranch(req, res, next){
    const branchID = req.params.branchID;
    branchSchema.findOne({branchID: branchID}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            res.status(HttpStatus.OK).json({result: data});
        }
    })
}

// Get Branch by address
function GetOneBranchByAddress(req, res, next){
    const branchAddress = req.params.branchAddress;
    branchSchema.findOne({branchAddress: branchAddress}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            res.status(HttpStatus.OK).json({result: data})
        }
    })
}

// Add Branch
function AddBranch(req, res, next){
    const newBranch = new branchSchema(req.body);
    // console.debug(newBranch);
    newBranch.save().then((response) => {
        res.status(HttpStatus.CREATED).json({
            message: "Branch successfully added!",
            result: response
        });
    }).catch(error => {
        console.error(error);
        return next(error);
    });
};

// Update Movie
function UpdateBranch(req, res, next){
    const branchID = req.params.branchID;
    branchSchema.findOneAndUpdate({branchID: branchID}, {$set: req.body}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Branch ' + branchID + ' successfully updated!');
            res.status(HttpStatus.OK).json(data);
        }
    })
}


// Delete Branch
function DeleteBranch(req, res, next){
    const branchID = req.params.branchID;
    branchSchema.findOneAndRemove({branchID: branchID}, (error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('Branch ' + branchID + ' successfully deleted!');
            res.status(HttpStatus.NO_CONTENT).json({result: data})
        }
    })
}

// Delete Branches
function DeleteBranches(req, res, next){
    branchSchema.deleteMany((error, data) => {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            console.log('All branches has been removed!');
            res.status(HttpStatus.NO_CONTENT).json({result: data});
        }
    })
}

module.exports ={
    GetAllBranches:GetAllBranches,
    GetAllBrancheNamesIds:GetAllBrancheNamesIds,
    GetOneBranch:GetOneBranch,
    GetOneBranchByAddress:GetOneBranchByAddress,
    AddBranch:AddBranch,
    UpdateBranch:UpdateBranch,
    DeleteBranch:DeleteBranch,
    DeleteBranches:DeleteBranches
};