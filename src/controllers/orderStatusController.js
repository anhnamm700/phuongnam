import { getAllStatus } from "../services/orderStatusService";

const handleGetStatus = async(req, res) => {
    let status = await getAllStatus();

    if (!status) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Status not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        status
    });
}

module.exports = {handleGetStatus};