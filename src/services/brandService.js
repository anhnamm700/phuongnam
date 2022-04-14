import db from "../models/index";
import { Op } from "sequelize";

const getAllBrand = (pageSize, page) => {
    return new Promise(async(resolve, reject) => {
        try {
            let offsetBrand = (page - 1) * pageSize;

            let brand = db.Brands.findAndCountAll({
                offset: offsetBrand,
                limit: pageSize
            });

            resolve(brand);
        } catch (error) {
            reject(error);
        }
    });
}

const getBrandsById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let brand = await db.Brands.findOne({
                where: { id: id }
            });

            if (!brand) {
                resolve(false);
            }

            resolve(brand);
        } catch (error) {
            reject(error);
        }
    });
}

const getBrandsearch = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let brand = await db.Brands.findAndCountAll({
                where: { id: id }
            });

            if (!brand) { 
                resolve(false);
            }


            resolve(brand);
        } catch (error) {
            reject(error);
        }
    });
}

const createNewBrand = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Brands.create({
                name: data.name,
                description: data.description,
                is_active: data.is_active,
                total_products: data.total_products,
                category_id: data.category_id
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

const updateBrandData = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            } 
            
           
            let brand = await db.Brands.findOne({
                where: { id: id },
                raw: false
            });

            if (brand) {
                brand.name = data.name,
                brand.description = data.description,
                brand.is_active = data.is_active === '1' ? true : false,
                brand.total_products = data.total_products,
                brand.category_id = data.category_id            

                await brand.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Brands not found'
                });
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

const deleteBrand = (id) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let foundBrand = await db.Brands.findOne({
                where: { id: id }
            });
    
            if (!foundBrand) {
                resolve({
                    errCode: 2,
                    errMessage: `Brands isn't exist`
                });
            } 

            resolve({
                errCode: 0,
                errMessage: 'Brands was deleted',
            });
            if (foundBrand) {
                await db.Brands.destroy({
                    where: { id: id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'Brands was deleted'
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllBrand,
    getBrandsById,
    getBrandsearch,
    createNewBrand,
    updateBrandData,
    deleteBrand
}