import db from '../models/index';
import bcrypt from 'bcryptjs/dist/bcrypt';


let salt = bcrypt.genSaltSync(10);

const createNewUser = async(data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPasswordFromBcript = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.fname,
                lastName: data.lname,
                address: data.address,
                email: data.email,
                gender: data.gender === '1' ? true : false,
                userName: data.uname,
                password: hashPasswordFromBcript,
                phoneNumber: data.pnumber,
                roleId: data.roleId,
                image: data.img
            });

            resolve("Create a new user successfully!");
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
            reject(e);
        }
    });
}

const getAllUsers = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

const getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({ 
                where: {id: userId},
                raw: true
            });
            // console.log(user);

            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    });
}

const updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            });

            if (user) {
                user.firstName = data.fname;
                user.lastName = data.lname;
                user.address =  data.address;

                
                await user.save();

                let allUsers = db.User.findAll();

                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (error) {
            console.log(error);
        }
    });
}

const deleteUserById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where:  { id: userId }
            });

            if (user) {
                console.log(user);
                await user.destroy();
            }

            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewUser,
    getAllUsers,
    getUserInfoById,
    updateUserData,
    deleteUserById
};