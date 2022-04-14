import db from '../models/index';
import CRUDServices from '../services/CRUDServices';



const getHomPage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homePage.ejs", { 
            data: JSON.stringify(data)
         });
    } catch (error) {
        console.log(error);
    }
    
}

const getCURD = (req, res) => {
    return res.render("crud.ejs");
}

const postCRUD = async(req, res) => {
    let message = await CRUDServices.createNewUser(req.body);
    console.log(message);
    return res.send("CRUD Server");
}

const displayCRUD = async(req, res) => {
    let data = await CRUDServices.getAllUsers();
    return res.render("display-crud.ejs", {
        data
    });
}

const editCRUD = async(req, res) => {
    let userId = req.query.id
    console.log(userId);
    if (userId) {
        let userData = await CRUDServices.getUserInfoById(userId);
        
        return res.render('editCRUD.ejs', {
            userData
        });
    } else {
        return res.send("User not found");
    }
}

const putCRUD = async(req, res) => {
    let data = req.body;
    let allUsers = await CRUDServices.updateUserData(data);

    return res.render('display-crud.ejs', {
        data: allUsers
    });
}

const deleteCRUD = async(req, res) => {
    let id = req.query.id;

    if (id) {
        await CRUDServices.deleteUserById(id);
        return res.send("Delete user successfully!");
    } else {
        return res.send("User not found!");
    }

    
}

module.exports = {
    getHomPage,
    getCURD,
    postCRUD,
    displayCRUD,
    editCRUD,
    putCRUD,
    deleteCRUD
}