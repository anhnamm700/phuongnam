import db from "../models/index";
import { Op } from "sequelize";
import { QueryTypes } from "sequelize";

const getAllProduct = (pageSize, page) => {
    return new Promise(async(resolve, reject) => {
        try {
            let offsetCategory = (page - 1) * pageSize;

            let products = db.Products.findAndCountAll({
                // offset: offsetCategory,
                // limit: pageSize
            });

            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
}

const getAllProductPanigation = (pageSize, page) => {

    return new Promise(async(resolve, reject) => { 
        try {
            let offsetCategory = (page - 1) * pageSize;

            let countProduct = await db.sequelize.query(`SELECT COUNT(id) as count from products`, { type: QueryTypes.SELECT })

            let products = await db.sequelize.query(`SELECT products.*, brands.name as brand_name FROM products LEFT JOIN brands ON products.brand_id = brands.id ORDER BY products.id DESC LIMIT ${pageSize} OFFSET ${offsetCategory}`, { type: QueryTypes.SELECT })

            resolve({products, countProduct});
        } catch (error) {
            reject(error);
        }
    });
}

const checkOrder = (id) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let count = await db.sequelize.query(`SELECT COUNT(*) as count, products.id FROM orderdetails LEFT JOIN products ON orderdetails.product_id = products.id WHERE products.id=${id} AND orderdetails.order_status IN (1, 3) ORDER BY orderdetails.id`, { type: QueryTypes.SELECT })

            resolve(count);
        } catch (error) {
            reject(error);
        }
    });
}

const getCountProduct = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let product = await db.sequelize.query("SELECT products.id, products.total_products, brands.name  FROM brands , products where products.brand_id = brands.id group by products.id Order by products.total_products;", { type: QueryTypes.SELECT });

            if (!product) {
                resolve(false);
            } 

            resolve(product); 
        } catch (error) {
            reject(error);
        }
    });
}


const getProductEdit = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let product = await db.sequelize.query("SELECT products.id, products.total_products, brands.name  FROM brands , products where products.brand_id = brands.id group by products.id Order by products.total_products;", { type: QueryTypes.SELECT });

            if (!product) {
                resolve(false);
            } 

            resolve(product);
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


const getProductById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            // let product = await db.Products.findOne({
            //     where: { id: id }
            // });

            let product = await db.sequelize.query(`SELECT products.*, brands.name as brand_name FROM products LEFT JOIN brands ON products.brand_id = brands.id WHERE products.id=${id} ORDER BY products.id`, { type: QueryTypes.SELECT })

            if (!product) {
                resolve(false);
            } 

            resolve(product);
        } catch (error) {
            reject(error);
        }
    });
}

const getProductByBrandId = (brandId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let product = await db.Products.findAll({
                where: { brand_id: brandId }
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

const getProductByCateId = (cateId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let product = await db.Products.findAll({
                where: { cate_id: cateId }
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

const getHotProduct = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let product = await db.Products.findAll({
                where: { is_hot: 1 }
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

const filterProduct = (data) => {
    // const [id, price] = data;


    console.log(data);

    if (data.id.length === 0 || data.id.includes('0')) {
        if (data.price !== 0) {
            return new Promise(async(resolve, reject) => {
                try {
                    let product;
                    if (data.price === 5000000) {
                        product = await db.Products.findAndCountAll({
                            where: { 
                                price: {
                                    [Op.lt]: 5000000
                                },
                                cate_id: {
                                    [Op.eq]: data.cate 
                                }
                             }
                        });
                    }

                    if (data.price === 20000000) {
                        product = await db.Products.findAndCountAll({
                            where: { 
                                price: {
                                    [Op.between]: [5000000, 20000000], 
                                },
                                cate_id: {
                                    [Op.eq]: data.cate 
                                }
                             }
                        });
                    } 

                    if (data.price === 20111111) {
                        product = await db.Products.findAndCountAll({
                            where: { 
                                price: {
                                    [Op.gte]: 20111111, 
                                },
                                cate_id: {
                                    [Op.eq]: data.cate 
                                }
                             }
                        });
                    } 
                    
        
                    if (!product) {
                        resolve(false);
                    } 
        
                    resolve(product);
                } catch (error) {
                    reject(error);
                }
            });
        } 
        
        if (data.price === 0) {
            return new Promise(async(resolve, reject) => {
                try {
                    let product = await db.Products.findAndCountAll({
                        where: {
                            cate_id: {
                                [Op.eq]: data.cate 
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
    } 

    if (data.id.length !== 0 || !data.id.includes('0')) {
        if (data.price !== 0) {
            return new Promise(async(resolve, reject) => {
                try {
                    let product;
                    if (data.price === 5000000) {
                        product = await db.Products.findAndCountAll({
                            where: { 
                                brand_id: {
                                    [Op.in]: data.id
                                },
                                price: {
                                    [Op.lt]: 5000000
                                },
                                cate_id: {
                                    [Op.eq]: data.cate 
                                }
                             }
                        });
                    }

                    if (data.price === 20000000) {
                        product = await db.Products.findAndCountAll({
                            where: { 
                                brand_id: {
                                    [Op.in]: data.id
                                },
                                price: {
                                    [Op.between]: [5000000, 20000000], 
                                },
                                cate_id: {
                                    [Op.eq]: data.cate 
                                }
                             }
                        });
                    } 

                    if (data.price === 20111111) {
                        product = await db.Products.findAndCountAll({
                            where: { 
                                brand_id: {
                                    [Op.in]: data.id
                                },
                                price: {
                                    [Op.gte]: 20111111, 
                                },
                                cate_id: {
                                    [Op.eq]: data.cate 
                                }
                             }
                        });
                    } 
                    
        
                    if (!product) {
                        resolve(false);
                    } 
        
                    resolve(product);
                } catch (error) {
                    reject(error);
                }
            });
        } 
        
        if (data.price === 0) {
            return new Promise(async(resolve, reject) => {
                try {
                    let product = await db.Products.findAndCountAll({
                        where: { 
                            brand_id: {
                                [Op.in]: data.id
                            },
                            cate_id: {
                                [Op.eq]: data.cate 
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
    }
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
                is_active: data.is_active, 
                type_product: data.type_product,
                total_products: data.total_products,
                brand_id: data.brand_id
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
                product.is_active = data.is_active, 
                product.type_product = data.type_product,
                product.total_products = data.total_products,
                product.brand_id = data.brand_id

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
    deleteProduct,
    getProductByBrandId,
    getProductByCateId,
    getHotProduct,
    filterProduct,
    getAllProductPanigation,
    getCountProduct,
    getProductById,
    checkOrder
}