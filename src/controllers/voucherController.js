import { 
    getAllVoucher,
    getVoucherById,
    getVoucherSearch,
    createNewVoucher,
    updateVoucherData,
    deleteVoucher
} from "../services/voucherService";
import { PAGE_SIZE } from "../PageSize";


const handleGetAllVoucher = async(req, res) => {
    let page = 1;

    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }

    let vouchers = await getAllVoucher(PAGE_SIZE, page);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        vouchers
    });
}

const handleGetVoucherById = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Voucher not found',
        });
    }

    let voucher = await getVoucherById(id);

    if (!voucher) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Voucher not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        voucher
    });
}

const handleGetVoucherSearch = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Voucher not found',
        });
    }

    let voucher = await getVoucherSearch(id);

    if (!voucher) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Voucher not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        voucher
    });
}

const handleCreateNewVoucher = async(req, res) => {
    let newVoucher = await createNewVoucher(req.body);

    return res.status(200).json(newVoucher);
}

const handleUpdateVoucher = async(req, res) => {
    let id = req.params.id;
    let data = req.body;
    let message = await updateVoucherData(id, data);

    return res.status(200).json(message);
}


const handleDeleteVoucher = async(req, res) => {
    let id = req.body.id;

    console.log(id);
    // return res.status(200).json(id);

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID Voucher'
        });
    }

    let message = await deleteVoucher(id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllVoucher,
    handleGetVoucherById,
    handleGetVoucherSearch,
    handleCreateNewVoucher,
    handleUpdateVoucher,
    handleDeleteVoucher
}