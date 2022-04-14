import db from "../models/index";
import { Op } from "sequelize";

const getAllRole = (pageSize, page) => {
    return new Promise(async(resolve, reject) => {
        try {
            let offsetRole = (page - 1) * pageSize;

            let roles = db.Roles.findAndCountAll({
                offset: offsetRole,
                limit: pageSize
            });

            resolve(roles);
        } catch (error) {
            reject(error);
        }
    });
}

const getRoleById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let role = await db.Roles.findOne({
                where: { id: id }
            });

            if (!role) {
                resolve(false);
            }

            resolve(role);
        } catch (error) {
            reject(error);
        }
    });
}

const getRolesearch = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let role = await db.Roles.findAndCountAll({
                where: { id: id }
            });

            if (!role) { 
                resolve(false);
            }


            resolve(role);
        } catch (error) {
            reject(error);
        }
    });
}

const createNewRole = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Roles.create({
                name: data.name,
                description: data.description,
            });

            resolve({
                errCode: 0,
                errMessage: 'OK'
            });
        } catch (error) {
            reject(error);
        }
    });
}

const updateRoleData = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            } 
            
           
            let role = await db.Roles.findOne({
                where: { id: id },
                raw: false
            });

            if (role) {
                role.name = data.name,
                role.description = data.description,

                await role.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Roles not found'
                });
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

const deleteRole = (id) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let foundRole = await db.Roles.findOne({
                where: { id: id }
            });
    
            if (!foundRole) {
                resolve({
                    errCode: 2,
                    errMessage: `Roles isn't exist`
                });
            } 

            resolve({
                errCode: 0,
                errMessage: 'Roles was deleted',
            });
            if (foundRole) {
                await db.Roles.destroy({
                    where: { id: id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'Roles was deleted'
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllRole,
    getRoleById,
    getRolesearch,
    createNewRole,
    updateRoleData,
    deleteRole
}