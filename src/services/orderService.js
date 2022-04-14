import db from "../models/index";
import { Op } from "sequelize";

const getAllOrder = (pageSize, page) => {
    return new Promise(async(resolve, reject) => {
        try {
            let offsetOrder = (page - 1) * pageSize;

            let orders = db.Orders.findAndCountAll({
                offset: offsetOrder,
                limit: pageSize
            });

            resolve(orders);
        } catch (error) {
            reject(error);
        }
    });
}

const getOrderById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let order = await db.Orders.findOne({
                where: { id: id }
            });

            if (!order) {
                resolve(false);
            }

            resolve(order);
        } catch (error) {
            reject(error);
        }
    });
}

const getOrderSearch = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let order = await db.Orders.findAll({
                where: { id: id }
            });

            if (!order) { 
                resolve(false);
            }


            resolve(order);
        } catch (error) {
            reject(error);
        }
    });
}

const createNewOrder = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const date = Date.now();
            await db.Orders.create({
                id: `DH${date}${data.user_id}`,
                user_id: data.user_id,
                total_price: data.total_price,
                description: data.description,
                title: data.title,
                total_Orders: data.total_Orders,
                note: data.note,
                voucher_id: data.voucher_id,
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

const updateOrderData = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            } 
            
           
            let order = await db.Orders.findOne({
                where: { id: id },
                raw: false
            });

            if (order) {
                order.user_id = data.user_id,
                order.total_price = data.total_price,
                order.description = data.description,
                order.title = data.title,
                order.total_Orders = data.total_Orders,
                order.note = data.note,
                order.voucher_id = data.voucher_id,

                await order.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Order not found'
                });
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

const deleteOrder = (id) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let foundOrder = await db.Orders.findOne({
                where: { id: id }
            });
    
            if (!foundOrder) {
                resolve({
                    errCode: 2,
                    errMessage: `Order isn't exist`
                });
            } 

            resolve({
                errCode: 0,
                errMessage: 'Order was deleted',
            });
            if (foundOrder) {
                await db.Orders.destroy({
                    where: { id: id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'Order was deleted'
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllOrder,
    getOrderById,
    getOrderSearch,
    createNewOrder,
    updateOrderData,
    deleteOrder
}