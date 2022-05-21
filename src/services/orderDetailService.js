import db from "../models/index";
import { Op } from "sequelize";
import { QueryTypes } from "sequelize";

import emailService from "./emailService";

const getAllOrderDetail = (pageSize, page, orderId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let offsetOrder = (page - 1) * pageSize;
 
            let orderDetail = db.OrderDetails.findAndCountAll({
                where: { order_id: orderId },
                offset: offsetOrder,
                limit: pageSize
            });

            resolve(orderDetail);
        } catch (error) {
            reject(error);
        }
    });
}

const getOrderDetailById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let orderDetail = await db.OrderDetails.findOne({
                where: { id: id }
            });

            if (!orderDetail) {
                resolve(false);
            }

            resolve(orderDetail);
        } catch (error) {
            reject(error);
        }
    });
}

const getOrderDetailSearch = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let orderDetail = await db.sequelize.query(`select orderdetails.*, orderstatus.name as status, products.name as product from orderdetails LEFT join orderstatus on orderdetails.order_status = orderstatus.id LEFT join products on orderdetails.product_id = products.id where orderdetails.order_id = '${id}'`, { type: QueryTypes.SELECT });

            if (!orderDetail) { 
                resolve(false);
            }


            resolve(orderDetail);
        } catch (error) {
            reject(error);
        }
    });
}
 
const getMostBoutProducts = (month) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let orderDetail = await db.sequelize.query(`SELECT month(orderdetails.createdAt) as month,sum(total_price) as total, product_id, SUM(quantity) as quantity, name FROM orderdetails, products where orderdetails.product_id = products.id AND month(orderdetails.createdAt) = ${month} group by product_id Order by sum(quantity) desc`, { type: QueryTypes.SELECT });

            if (!orderDetail) { 
                resolve(false);
            }


            resolve(orderDetail);
        } catch (error) {
            reject(error);
        }
    });
}

const getMoneyByMonth = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let orderDetail = await db.sequelize.query("select year(createdAt) as year,month(createdAt) as month,sum(total_price) as total from orderdetails group by year(createdAt),month(createdAt) order by year(createdAt),month(createdAt);", { type: QueryTypes.SELECT });

            if (!orderDetail) { 
                resolve(false);
            }


            resolve(orderDetail);
        } catch (error) {
            reject(error);
        }
    });
}

const createNewOrderDetail = (data) => {
    console.log(data);
    return new Promise(async(resolve, reject) => {
        try {
            await db.OrderDetails.create({
                id: data.id,
                product_id: data.product_id,
                unit_price: data.unit_price,
                quantity: data.quantity,
                total_price: data.total_price,
                order_id: data.order_id,
                order_status: data.order_status
            });

            await emailService.sendSimpleEmail(data.email, data.name, data.order_id);

            resolve({
                errCode: 0,
                errMessage: 'OK'
            });
        } catch (error) {
            reject(error);
        }
    });
}

const updateOrderDetailData = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            } 
            
           
            let orderDetail = await db.OrderDetails.findOne({
                where: { id: id },
                raw: false
            });

            if (orderDetail) {
                orderDetail.product_id = data.product_id,
                orderDetail.unit_price = data.unit_price,
                orderDetail.quantity = data.quantity,
                orderDetail.total_price = data.total_price,
                orderDetail.order_id = data.order_id,
                orderDetail.order_status = data.order_status

                await orderDetail.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'OrderDetail not found'
                });
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

const deleteOrderDetail = (id) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let foundOrderDetail = await db.OrderDetails.findOne({
                where: { id: id }
            });
    
            if (!foundOrderDetail) {
                resolve({
                    errCode: 2,
                    errMessage: `OrderDetail isn't exist`
                });
            } 

            resolve({
                errCode: 0,
                errMessage: 'OrderDetail was deleted',
            });
            if (foundOrderDetail) {
                await db.OrderDetails.destroy({
                    where: { id: id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'OrderDetail was deleted'
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllOrderDetail,
    getOrderDetailById,
    getOrderDetailSearch,
    createNewOrderDetail,
    updateOrderDetailData,
    deleteOrderDetail,
    getMostBoutProducts,
    getMoneyByMonth
}