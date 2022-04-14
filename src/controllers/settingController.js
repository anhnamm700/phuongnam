import { 
    getSetting,
    createNewSetting,
    updateSettingData,
    deleteSetting
} from "../services/settingService";
import { PAGE_SIZE } from "../PageSize";


const handleGetSetting = async(req, res) => {
    let page = 1;

    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }

    let noties = await getSetting(PAGE_SIZE, page);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        noties
    });
}


const handleCreateNewSetting = async(req, res) => {
    let newSetting = await createNewSetting(req.body);

    return res.status(200).json(newSetting);
}

const handleUpdateSetting = async(req, res) => {
    let id = req.params.id;
    let data = req.body;
    let message = await updateSettingData(id, data);

    return res.status(200).json(message);
}


const handleDeleteSetting = async(req, res) => {
    let id = req.body.id;

    console.log(id);
    // return res.status(200).json(id);

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID notifi'
        });
    }

    let message = await deleteSetting(id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleGetSetting,
    handleCreateNewSetting,
    handleUpdateSetting,
    handleDeleteSetting
}