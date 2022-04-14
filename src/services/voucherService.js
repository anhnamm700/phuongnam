import db from "../models/index";
import { Op } from "sequelize";

const getAllVoucher = (pageSize, page) => {
    return new Promise(async(resolve, reject) => {
        try {
            let offsetVoucher = (page - 1) * pageSize;

            let voucher = db.Vouchers.findAndCountAll({
                offset: offsetVoucher,
                limit: pageSize
            });

            resolve(voucher);
        } catch (error) {
            reject(error);
        }
    });
}

const getVoucherById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let voucher = await db.Vouchers.findOne({
                where: { id: id }
            });

            if (!voucher) {
                resolve(false);
            }

            resolve(voucher);
        } catch (error) {
            reject(error);
        }
    });
}

const getVoucherSearch = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let voucher = await db.Vouchers.findAndCountAll({
                where: { id: id }
            });

            if (!voucher) { 
                resolve(false);
            }


            resolve(voucher);
        } catch (error) {
            reject(error);
        }
    });
}

const createNewVoucher = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Vouchers.create({
                logo: data.logo,
                name: data.name,
                description: data.description,
                quantity: data.quantity,
                is_active: data.is_active,
                discount: data.discount,
                out_of_date: data.out_of_date
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

const updateVoucherData = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            } 
            
           
            let voucher = await db.Vouchers.findOne({
                where: { id: id },
                raw: false
            });

            if (voucher) {
                voucher.logo = data.logo,
                voucher.name = data.name,
                voucher.description = data.description,
                voucher.quantity = data.quantity,
                voucher.is_active = data.is_active === '1' ? true : false,
                voucher.discount = data.discount,
                voucher.out_of_date = data.out_of_date

                await voucher.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Voucher not found'
                });
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

const deleteVoucher = (id) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let foundVoucher = await db.Vouchers.findOne({
                where: { id: id }
            });
    
            if (!foundVoucher) {
                resolve({
                    errCode: 2,
                    errMessage: `Voucher isn't exist`
                });
            } 

            resolve({
                errCode: 0,
                errMessage: 'Voucher was deleted',
            });
            if (foundVoucher) {
                await db.Vouchers.destroy({
                    where: { id: id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'Voucher was deleted'
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllVoucher,
    getVoucherById,
    getVoucherSearch,
    createNewVoucher,
    updateVoucherData,
    deleteVoucher
}