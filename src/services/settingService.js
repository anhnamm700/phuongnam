import db from "../models/index";
import { Op } from "sequelize";

const getSetting = (pageSize, page) => {
    return new Promise(async(resolve, reject) => {
        try {
            let offsetSetting = (page - 1) * pageSize;

            let setting = db.Settings.findAndCountAll({
                offset: offsetSetting,
                limit: pageSize
            });

            resolve(setting);
        } catch (error) {
            reject(error);
        }
    });
}

const createNewSetting = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Settings.create({
                logo: data.logo,
                name: data.name,
                description: data.description,
                phone: data.phone,
                fax: data.fax,
                address: data.address,
                email: data.email,
                copyright: data.copyright
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

const updateSettingData = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            } 
            
           
            let setting = await db.Settings.findOne({
                where: { id: id },
                raw: false
            });

            if (setting) {
                setting.logo = data.logo,
                setting.name = data.name,
                setting.description = data.description,
                setting.phone = data.phone,
                setting.fax = data.fax,
                setting.address = data.address,
                setting.email = data.email,
                setting.copyright = data.copyright            

                await setting.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Settings not found'
                });
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

const deleteSetting = (id) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let foundSetting = await db.Settings.findOne({
                where: { id: id }
            });
    
            if (!foundSetting) {
                resolve({
                    errCode: 2,
                    errMessage: `Settings isn't exist`
                });
            } 

            resolve({
                errCode: 0,
                errMessage: 'Settings was deleted',
            });
            if (foundSetting) {
                await db.Settings.destroy({
                    where: { id: id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'Settings was deleted'
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getSetting,
    createNewSetting,
    updateSettingData,
    deleteSetting
}