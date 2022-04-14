import urlencoded from "body-parser/lib/types/urlencoded";
import req from "express/lib/request";
import res from "express/lib/response";
import userServices from "../services/userServices"

const handleLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing Input Parameter'
        });
    }

    let userData = await userServices.userHandleLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.data ? userData.data : {}    
    });

}

const handleGetAllUser = async(req, res) => {
    const PAGE_SIZE = 2;
    let users = '';
    let page = 1;
    
    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }
    
    users = await userServices.getAllUser(PAGE_SIZE, page);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        user: users ? users : {}    
    });
} 

const handleGetUserbyId = async(req, res) => {
    let id = req.params.id;
    
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing Input Parameter'
        });
    }

    let user = await userServices.getUserById(id);

    if (user) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',  
            user
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'User not found',  
    });
}

const handleCreateNewUser = async(req, res) => {
    let message = await userServices.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}

const handleEditUser = async(req, res) => {
    let data = req.body;
    let message = await userServices.updateUserData(data);

    return res.status(200).json(message);
}

const handleDeleteUser = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID user'
        });
    }

    let message = await userServices.deleteUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}


module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    handleGetUserbyId
};