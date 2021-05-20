const branchSchema = require("../models/Branch");

function createBranchModel(response)
{
    const branchModel = new branchSchema({
        branchID: response.branchID,
        branchName: response.branchName
    });
	return branchModel;
}

function GetAllBranches(){
    try {
        var branches = branchSchema.find();
        return branches;
    } catch (error) {
        throw Error(error);
    }
}

function GetAllBrancheNamesIds(){
    try {
        var branches = branchSchema.find();
        branches = createBranchModel(branches);
        return branches;
    } catch (error) {
        throw Error(error);
    }
}

function GetOneBranch(branchID){
    try {
        var branch = branchSchema.findOne({branchID: branchID});
        return branch;
    } catch (error) {
        throw Error(error);
    }
}

function GetOneBranchByAddress(branchAddress){
    try {
        var branch = branchSchema.findOne({branchAddress: branchAddress});
        return branch;
    } catch (error) {
        throw Error(error);
    }
}

function AddBranch(body){
    const newBranch = new branchSchema(body);
    return newBranch.save().then((response) => {
        return response;
    }).catch(error => {
        throw Error(error);
    });
};

function UpdateBranch(branchID, body){
    try {
        var branch = branchSchema.findOneAndUpdate(branchID, {$set: body});
        return branch;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteBranch(branchID){
    try {
        var branch = branchSchema.findOneAndRemove({branchID: branchID});
        return branch;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteBranches(){
    branchSchema.deleteMany((error, data) => {
        if (error) {
            throw Error(error);
        } else {
            return data;
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