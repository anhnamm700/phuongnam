import db from "../models/index";
import { Op } from "sequelize";

const getAllNotification = (pageSize, page) => {
    return new Promise(async(resolve, reject) => {
        try {
            let offsetNotification = (page - 1) * pageSize;

            let notification = db.Notifications.findAndCountAll({
                offset: offsetNotification,
                limit: pageSize
            });

            resolve(notification);
        } catch (error) {
            reject(error);
        }
    });
}

const getNotificationsById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let notification = await db.Notifications.findOne({
                where: { id: id }
            });

            if (!notification) {
                resolve(false);
            }

            resolve(notification);
        } catch (error) {
            reject(error);
        }
    });
}

const getNotificationsearch = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let notification = await db.Notifications.findAndCountAll({
                where: { id: id }
            });

            if (!notification) { 
                resolve(false);
            }


            resolve(notification);
        } catch (error) {
            reject(error);
        }
    });
}

const createNewNotification = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Notifications.create({
                description: data.description,
                title: data.title,
                image: data.image
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

const updateNotificationData = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            } 
            
           
            let notification = await db.Notifications.findOne({
                where: { id: id },
                raw: false
            });

            if (notification) {
                notification.description = data.description,
                notification.title = data.title,
                notification.image = data.image                

                await notification.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Notifications not found'
                });
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

const deleteNotification = (id) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let foundNotification = await db.Notifications.findOne({
                where: { id: id }
            });
    
            if (!foundNotification) {
                resolve({
                    errCode: 2,
                    errMessage: `Notifications isn't exist`
                });
            } 

            resolve({
                errCode: 0,
                errMessage: 'Notifications was deleted',
            });
            if (foundNotification) {
                await db.Notifications.destroy({
                    where: { id: id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'Notifications was deleted'
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllNotification,
    getNotificationsById,
    getNotificationsearch,
    createNewNotification,
    updateNotificationData,
    deleteNotification
}