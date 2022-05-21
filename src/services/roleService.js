import db from "../models/index";
import { Op, QueryTypes } from "sequelize";

const getAllRole = (pageSize, page) => {
    return new Promise(async(resolve, reject) => {
        try {
            // let offsetRole = (page - 1) * pageSize;

            let roles = db.Roles.findAndCountAll({
                // offset: offsetRole,
                // limit: pageSize
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

const checkRole = (name) => {
    return new Promise(async(resolve, reject) => {
        try {
            let role = await db.sequelize.query(`select COUNT(*) as count from roles where name LIKE '${name}'`, { type: QueryTypes.SELECT });
            // console.log(role[0].count);
            if (role[0].count === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        } catch (error) {
            reject(error);
        }
    });
} 

const createNewRole = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // let checkName = await checkRole(data.name);
            // // console.log(checkName);
            // if (checkName === true) {
            //     resolve({
            //         errCode: 1,
            //         errMessage: 'Role is already in used, try another role'
            //     });
            // } else if (checkName === false) {
                await db.Roles.create({
                    name: data.name,
                    description: data.description,
                });

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                });
            // }
           
           
        } catch (error) {
            reject(error);
        }
    });
}

const checkDeleteRole = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let role = await db.sequelize.query(`select COUNT(*) as count, roles.id from users LEFT JOIN roles ON users.roleId = roles.id where users.roleId =${id} GROUP BY roles.id`, { type: QueryTypes.SELECT });
            resolve(role);
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
    deleteRole,
    checkRole,
    checkDeleteRole
}