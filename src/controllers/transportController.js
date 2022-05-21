import { 
    getAllTransport,
    getTransportrById,
    getTransportsearch,
    createNewTransport,
    updateTransportData,
    deleteTransport,
    checkOrder
} from "../services/transportService";
import { PAGE_SIZE } from "../PageSize";


const handleGetAllTransport = async(req, res) => {
    let page = 1;

    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }

    let Transports = await getAllTransport(PAGE_SIZE, page);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        Transports
    });
}

const handleCheckOrder = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Transport not found',
        });
    }

    let transport = await checkOrder(id);

    if (!transport) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Transport not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        transport
    });
}


const handleGetTransportById = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Transport not found',
        });
    }

    let transport = await getTransportrById(id);

    if (!transport) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Transport not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        transport
    });
}

const handleGetTransportSearch = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Transport not found',
        });
    }

    let transport = await getTransportsearch(id);

    if (!transport) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Transport not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        transport
    });
}

const handleCreateNewTransport = async(req, res) => {
    let newTransport = await createNewTransport(req.body);

    return res.status(200).json(newTransport);
}

const handleUpdateTransport = async(req, res) => {
    let id = req.params.id;
    let data = req.body;
    let message = await updateTransportData(id, data);

    return res.status(200).json(message);
}


const handleDeleteTransport = async(req, res) => {
    let id = req.body.id;

    console.log(id);
    // return res.status(200).json(id);

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID Transport'
        });
    }

    let message = await deleteTransport(id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllTransport,
    handleGetTransportById,
    handleGetTransportSearch,
    handleCreateNewTransport,
    handleUpdateTransport,
    handleDeleteTransport,
    handleCheckOrder
}