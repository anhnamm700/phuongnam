import db from "../models/index";


const getAllCategory = (cateId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let cates = '';

            if (cateId === 'ALL') {
                cates = await db.Categories.findAll();
            } 

            if (cateId && cateId !== 'ALL') {
                cates = await db.Categories.findOne({
                    where: {id: cateId}
                });
            }

            resolve(cates);
        } catch (error) {
            reject(error);
        }
    });
}

const getCategoryBySlug = (slug) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (slug) {
                let category = db.Categories.findOne({
                    where: { slug: slug }
                });
    
                resolve(category);
            }
    
            resolve(false);
        } catch (error) {
            reject(error);
        }
    });
}


const createNewCategory = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // Check email exist
            let checkName = await checkCategory(data.name);

            if (checkName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Category is already in used, try another category'
                });
            } else {
                await db.Categories.create({
                    name: data.name,
                    slug: hashSlug(data.name),
                    icon: data.icon,
                    avatar: data.avatar,
                    is_active: data.is_active === '1' ? true : false,
                    total_products: data.total_products,
                    phoneNumber: data.phoneNumber,
                    author_id: data.author_id
                });
            }
            
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

    return name;
}


const deleteCategory = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let foundCategory = await db.Categories.findOne({
                where: { id: id }
            });
    
            if (!foundCategory) {
                resolve({
                    errCode: 2,
                    errMessage: `Category isn't exist`
                });
            } 
            
            if (foundCategory) {
                await db.Categories.destroy({
                    where: { id:id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'Category was deleted'
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

const updateCategoryData = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            } 
            
           
            let category = await db.Categories.findOne({
                where: { id: id },
                raw: false
            });

            resolve(category);

            if (category) {
                category.name = data.name,
                category.slug = hashSlug(data.name),
                category.icon = data.icon,
                category.avatar = data.avatar,
                category.is_active = data.is_active === '1' ? true : false,
                category.total_products = data.total_products,
                category.phoneNumber = data.phoneNumber,
                category.author_id = data.author_id

                await category.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Category not found'
                });
            }
            
        } catch (error) {
            reject(error);
        }
    })
}


const checkCategory = (name) => {
    return new Promise(async(resolve, reject) => {
        try {
            let category = await db.Categories.findOne({
                where: { name: name }
            });


            if (category) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (error) {
            reject(error);
        }
    })
}



module.exports = {
    getAllCategory,
    getCategoryBySlug,
    createNewCategory,
    deleteCategory,
    updateCategoryData
}