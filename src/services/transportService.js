import db from "../models/index";
import { Op, QueryTypes } from "sequelize";

const getAllTransport = (pageSize, page) => {
    return new Promise(async(resolve, reject) => {
        try {
            // let offsetOrder = (page - 1) * pageSize;

            let transports = db.Transports.findAndCountAll();

            resolve(transports);
        } catch (error) {
            reject(error);
        }
    });
}

const getTransportrById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let transport = await db.Transports.findOne({
                where: { id: id }
            });

            if (!transport) {
                resolve(false);
            }

            resolve(transport);
        } catch (error) {
            reject(error);
        }
    });
}

const checkOrder = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (id) {
                let transport = await db.sequelize.query(`SELECT orders.*, transports.name FROM orders LEFT JOIN transports ON orders.transport_id = transports.id WHERE transports.id = ${id} GROUP BY orders.id`, { type: QueryTypes.SELECT });

                if (!transport) {
                    resolve(false);
                }

                resolve(transport);
            }
        } catch (error) {
            reject(error);
        }
    });
}

const getTransportsearch = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let transport = await db.Transports.findAndCountAll({
                where: { id: id }
            });

            if (!transport) { 
                resolve(false);
            }


            resolve(transport);
        } catch (error) {
            reject(error);
        }
    });
}

const createNewTransport = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Transports.create({
                name: data.name,
                description: data.description,
                price: data.price
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

const updateTransportData = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            } 
            
           
            let transport = await db.Transports.findOne({
                where: { id: id },
                raw: false
            });

            if (transport) {
                transport.name = data.name,
                transport.description = data.description,
                transport.price = data.price

                await transport.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Transport not found'
                });
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

const deleteTransport = (id) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let foundTransport = await db.Transports.findOne({
                where: { id: id }
            });
    
            if (!foundTransport) {
                resolve({
                    errCode: 2,
                    errMessage: `Transports isn't exist`
                });
            } 

            resolve({
                errCode: 0,
                errMessage: 'Transports was deleted',
            });
            if (foundTransport) {
                await db.Transports.destroy({
                    where: { id: id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'Transport was deleted'
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllTransport,
    getTransportrById,
    getTransportsearch,
    createNewTransport,
    updateTransportData,
    deleteTransport,
    checkOrder
}