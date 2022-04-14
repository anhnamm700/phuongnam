import db from "../models/index";
import { Op } from "sequelize";

const getAllProduct = (pageSize, page) => {
    return new Promise(async(resolve, reject) => {
        try {
            let offsetCategory = (page - 1) * pageSize;

            let products = db.Products.findAndCountAll({
                offset: offsetCategory,
                limit: pageSize
            });

            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
}

const getProductBySlug = (slug) => {
    return new Promise(async(resolve, reject) => {
        try {
            let product = await db.Products.findOne({
                where: { slug: slug }
            });

            if (!product) {
                resolve(false);
            }

            resolve(product);
        } catch (error) {
            reject(error);
        }
    });
}

const getProductSearch = (slug) => {
    return new Promise(async(resolve, reject) => {
        try {
            let searchSlug = `%${slug}%`;
            let product = await db.Products.findAndCountAll({
                where: {
                    slug: {
                        [Op.like]: searchSlug
                    }
                }
            });

            if (!product) { 
                resolve(false);
            }


            resolve(product);
        } catch (error) {
            reject(error);
        }
    });
}

const createNewProduct = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Products.create({
                name: data.name,
                slug: hashSlug(data.name),
                cate_id: data.cate_id,
                price: data.price,
                supplier_id: data.supplier_id,
                sale: data.sale,
                is_hot: data.is_hot,
                view: data.view,
                description: data.description,
                title: data.title,
                image: data.image,
                is_active: data.is_active === '1' ? true : false, 
                type_product: data.type_product,
                total_products: data.total_products,
                author_id: data.author_id
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

const hashSlug = (name) => {

    if (name) {
        name = name.toLowerCase();     
    
        // xóa dấu
        name = name.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        name = name.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        name = name.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        name = name.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        name = name.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        name = name.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        name = name.replace(/(đ)/g, 'd');
    
        // Xóa ký tự đặc biệt
        name = name.replace(/([^0-9a-z-\s])/g, '');
    
        // Xóa khoảng trắng thay bằng ký tự -
        name = name.replace(/(\s+)/g, '-');
    
        // xóa phần dự - ở đầu
        name = name.replace(/^-+/g, '');
    
        // xóa phần dư - ở cuối
        name = name.replace(/-+$/g, '');
    }

    return name;
}

const updateProductData = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            } 
            
           
            let product = await db.Products.findOne({
                where: { id: id },
                raw: false
            });

            if (product) {

                product.name = data.name,
                product.slug = hashSlug(data.name),
                product.cate_id = data.cate_id,
                product.price = data.price,
                product.supplier_id = data.supplier_id,
                product.sale = data.sale,
                product.is_hot = data.is_hot,
                product.view = data.view,
                product.description = data.description,
                product.title = data.title,
                product.image = data.image,
                product.is_active = data.is_active === '1' ? true : false, 
                product.type_product = data.type_product,
                product.total_products = data.total_products,
                product.author_id = data.author_id

                await product.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Product not found'
                });
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let foundProduct = await db.Products.findOne({
                where: { id: id }
            });
    
            if (!foundProduct) {
                resolve({
                    errCode: 2,
                    errMessage: `Product isn't exist`
                });
            } 

            resolve({
                errCode: 0,
                errMessage: 'Product was deleted',
            });
            if (foundProduct) {
                await db.Products.destroy({
                    where: { id: id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'Product was deleted'
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllProduct,
    getProductBySlug,
    getProductSearch,
    createNewProduct,
    updateProductData,
    deleteProduct
}