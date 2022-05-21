import { 
    getAllRole,
    getRoleById,
    getRolesearch,
    createNewRole,
    updateRoleData,
    deleteRole,
    checkRole,
    checkDeleteRole
} from "../services/roleService";
import { PAGE_SIZE } from "../PageSize";

const handleCheckDeleteRole = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Role not found',
        });
    }

    let roles = await checkDeleteRole(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        roles
    });
}

const handleGetAllRole = async(req, res) => {
    let page = 1;

    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }

    let roles = await getAllRole(PAGE_SIZE, page);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        roles
    });
}

const handleGetRoleById = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Role not found',
        });
    }

    let role = await getRoleById(id);

    if (!role) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Role not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        role
    });
}

const handleGetRoleSearch = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Role not found',
        });
    }

    let role = await getRolesearch(id);

    if (!role) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Role not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        role
    });
}

const handleCreateNewRole = async(req, res) => {
    let newRole = await createNewRole(req.body);

    console.log(newRole);

    return res.status(200).json(newRole);
}

const handleUpdateRole = async(req, res) => {
    let id = req.params.id;
    let data = req.body;
    let message = await updateRoleData(id, data);

    return res.status(200).json(message);
}


const handleCheckRole = async(req, res) => {
    let name = req.params.name;

    // if (!name) {
    //     return res.status(500).json({
    //         errCode: 1,
    //         errMessage: 'Role is not find',
    //     });
    // }

    let role = await checkRole(name);

    if (!role) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Role not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        role
    });
}


const handleDeleteRole = async(req, res) => {
    let id = req.body.id;

    console.log(id);
    // return res.status(200).json(id);

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID Role'
        });
    }

    let message = await deleteRole(id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllRole,
    handleGetRoleById,
    handleGetRoleSearch,
    handleCreateNewRole,
    handleUpdateRole,
    handleDeleteRole,
    handleCheckRole,
    handleCheckDeleteRole
}