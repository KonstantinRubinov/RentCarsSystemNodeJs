const roleSchema = require("../models/role");

function GetAllRoles(){
    try {
        var roles = roleSchema.find();
        return roles;
    } catch (error) {
        throw Error(error);
    }
}

function GetOneRoleLevel(userLevel){
    try {
        var role = roleSchema.findOne({userLevel: userLevel});
        return role;
    } catch (error) {
        throw Error(error);
    }
}

function GetOneRoleRole(userRole){
    try {
        var role = roleSchema.findOne({userRole: userRole});
        return role;
    } catch (error) {
        throw Error(error);
    }
}

function AddRole(body){
    const newRole = new roleSchema(body);
    return newRole.save().then((response) => {
        return response;
    }).catch(error => {
        throw Error(error);
    });
}

function UpdateRole(userLevel, body){
    try {
        var role = roleSchema.findOneAndUpdate(userLevel, {$set: body});
        return role;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteRoleLevel(userLevel){
    try {
        var role = roleSchema.findOneAndRemove({userLevel: userLevel});
        return role;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteRoleRole(userRole){
    try {
        var role = roleSchema.findOneAndRemove({userRole: userRole});
        return role;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteAllRoles(){
    roleSchema.deleteMany((error, data) => {
        if (error) {
            throw Error(error);
        } else {
            return data;
        }
    })
}

module.exports ={
    GetAllRoles:GetAllRoles,
    GetOneRoleLevel:GetOneRoleLevel,
    GetOneRoleRole:GetOneRoleRole,
    AddRole:AddRole,
    UpdateRole:UpdateRole,
    DeleteRoleLevel:DeleteRoleLevel,
    DeleteRoleRole:DeleteRoleRole,
    DeleteAllRoles:DeleteAllRoles
};