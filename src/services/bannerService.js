import db from "../models/index";
import { Op } from "sequelize";

const getAllBanner = (pageSize, page) => {
    return new Promise(async(resolve, reject) => {
        try {
            let offsetOrder = (page - 1) * pageSize;

            let banners = db.Banners.findAndCountAll({
                offset: offsetOrder,
                limit: pageSize
            });

            resolve(banners);
        } catch (error) {
            reject(error);
        }
    });
}

const getBannerById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let banner = await db.Banners.findOne({
                where: { id: id }
            });

            if (!banner) {
                resolve(false);
            }

            resolve(banner);
        } catch (error) {
            reject(error);
        }
    });
}

const getBannersearch = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let banner = await db.Banners.findAndCountAll({
                where: { id: id }
            });

            if (!banner) { 
                resolve(false);
            }


            resolve(banner);
        } catch (error) {
            reject(error);
        }
    });
}

const createNewBanner = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Banners.create({
                title: data.title,
                description: data.description,
                // slug: data.slug,
                image: data.image,
                is_active: data.is_active,
                url: data.url,
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

const updateBannerData = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            } 
            
           
            let banner = await db.Banners.findOne({
                where: { id: id },
                raw: false
            });

            if (banner) {
                banner.title = data.title,
                banner.description = data.description,
                // banner.slug = data.slug,
                banner.image = data.image,
                banner.is_active = data.is_active,
                banner.url = data.url,

                await banner.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Banners not found'
                });
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

const deleteBanner = (id) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let foundBanner = await db.Banners.findOne({
                where: { id: id }
            });
    
            if (!foundBanner) {
                resolve({
                    errCode: 2,
                    errMessage: `Banners isn't exist`
                });
            } 

            resolve({
                errCode: 0,
                errMessage: 'Banners was deleted',
            });
            if (foundBanner) {
                await db.Banners.destroy({
                    where: { id: id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'Banners was deleted'
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllBanner,
    getBannerById,
    getBannersearch,
    createNewBanner,
    updateBannerData,
    deleteBanner
}