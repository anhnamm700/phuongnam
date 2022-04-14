import { 
    getAllNotification,
    getNotificationsById,
    getNotificationsearch,
    createNewNotification,
    updateNotificationData,
    deleteNotification
} from "../services/notificationService";
import { PAGE_SIZE } from "../PageSize";


const handleGetAllNoti = async(req, res) => {
    let page = 1;

    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }

    let noties = await getAllNotification(PAGE_SIZE, page);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        noties
    });
}

const handleGetNotiById = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'notifi not found',
        });
    }

    let notifi = await getNotificationsById(id);

    if (!notifi) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Notifi not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        notifi
    });
}

const handleGetNotiSearch = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'notifi not found',
        });
    }

    let notifi = await getNotificationsearch(id);

    if (!notifi) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'notifi not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        notifi
    });
}

const handleCreateNewNoti = async(req, res) => {
    let newnotifi = await createNewNotification(req.body);

    return res.status(200).json(newnotifi);
}

const handleUpdateNoti = async(req, res) => {
    let id = req.params.id;
    let data = req.body;
    let message = await updateNotificationData(id, data);

    return res.status(200).json(message);
}


const handleDeleteNoti = async(req, res) => {
    let id = req.body.id;

    console.log(id);
    // return res.status(200).json(id);

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID notifi'
        });
    }

    let message = await deleteNotification(id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllNoti,
    handleGetNotiById,
    handleGetNotiSearch,
    handleCreateNewNoti,
    handleUpdateNoti,
    handleDeleteNoti
}