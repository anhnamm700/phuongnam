import urlencoded from "body-parser/lib/types/urlencoded";
import req from "express/lib/request";
import res from "express/lib/response";
import jwt from 'jsonwebtoken';
import { JsonWebTokenError } from "jsonwebtoken";
import userServices from "../services/userServices";
import { PAGE_SIZE } from "../PageSize";

const handleLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    console.log(email + '-' + password);

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing Input Parameter'
        });
    }

    let userData = await userServices.userHandleLogin(email, password);

    // res.cookie("refreshToken", userData.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    //     path: "/",
    //     sameSite: "strict"
    // });

    // window.localStorage.setItem("refreshToken", userData.refreshToken);

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.data ? userData.data : {},
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken
    });

}

const handleRefresh = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json("You're not authenticated");

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
            console.log(err);
        }

        const newAccessToken = jwt.sign({
            id: user.id,
            admin: user.roleId === "1" ? true : false
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "365d" });

        const newRefreshToken = jwt.sign({
            id: user.id,
            admin: user.roleId === "1" ? true : false
        },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "365d" });

        // res.cookie("refreshToken", newRefreshToken, {
        //     httpOnly: true,
        //     secure: false,
        //     path: "/",
        //     sameSite: "strict"
        // });

        localStorage.setItem("refreshToken", JSON.stringify(newRefreshToken));

        res.status(200).json({ accessToken: newAccessToken });
    });
}


const handleLogout = async(req, res) => {
    res.clearCookie("refreshToken");

    return res.status(200).json("Logout Successfully!");
}

const handleGetAllUser = async(req, res) => {
    const idRole = req.params.id;

    let page = 1;
    
    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }
    
    const users = await userServices.getAllUser(PAGE_SIZE, page, idRole);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        user: users ? users : {},
        total_page: Math.ceil(users.countUser[0].count / PAGE_SIZE)    
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

    // console.log(data);
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
    handleGetUserbyId,
    handleRefresh,
    handleLogout
};