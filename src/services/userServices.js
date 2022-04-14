import db from "../models/index";
import bcrypt from 'bcryptjs/dist/bcrypt';

let salt = bcrypt.genSaltSync(10);


const userHandleLogin = (email, password) => {
    return new  Promise(async(resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);

            if (isExist) {
                
                let user = await db.User.findOne({
                    where: {email: email},
                    // attributes: {
                    //     exclude: ['password']
                    // },
                    raw: false
                });
                
                if (user) {
                    let isPassword = await bcrypt.compareSync(password, user.password);

                    if (isPassword) {
                        userData.errCode = 0;
                        userData.errMessage = 'Password is Valid';
                        delete user.password;
                        userData.data = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong Password`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email doesn't exist`;
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
}

const checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });


            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (error) {
            reject(error);
        }
    })
}

const getAllUser = (pageSize, page) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userOffset = (page - 1) * pageSize;

            let users = await db.User.findAndCountAll({
                attributes: {
                    exclude: ['password']
                },
                offset: userOffset,
                limit: pageSize
            });

            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

const getUserById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['password']
                }
            });

            if (user) {
                resolve(user);
            } 

            resolve(false);
        } catch (error) {
            reject(error);
        }
    });
}


const createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // Check email exist
            let checkEmail = await checkUserEmail(data.email);

            if (checkEmail) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email is already in used, try another email'
                });
            } else {
                let hashPasswordFromBcript = await hashUserPassword(data.password);
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    email: data.email,
                    gender: data.gender === '1' ? true : false,
                    userName: data.userName,
                    password: hashPasswordFromBcript,
                    phoneNumber: data.phoneNumber,
                    roleId: data.roleId,
                    image: data.image
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

const hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
}

const deleteUser = (userId) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let foundUser = await db.User.findOne({
                where: { id: userId.id }
            });
    
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    errMessage: `User isn't exist`
                });
            } 
            if (foundUser) {
                await db.User.destroy({
                    where: { id: userId.id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'User was deleted'
                });
            }
        
            
        } catch (error) {
            reject(error); 
        }
    });
}

const updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            } 
            
           
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });

            if (user) {
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address =  data.address,
                user.gender =  data.gender === 'Nam' ? 1 : 0,
                user.userName = data.userName,
                user.password = data.password,
                user.phoneNumber =  data.phoneNumber,
                user.roleId =  data.roleId,
                user.image =  data.image,

                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found'
                });
            }
            
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    userHandleLogin,
    checkUserEmail,
    getAllUser,
    createNewUser,
    hashUserPassword,
    deleteUser,
    updateUserData,
    getUserById,
}