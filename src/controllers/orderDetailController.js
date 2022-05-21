import { 
    getAllOrderDetail,
    getOrderDetailById,
    getOrderDetailSearch,
    createNewOrderDetail,
    updateOrderDetailData,
    deleteOrderDetail,
    getMostBoutProducts,
    getMoneyByMonth
} from "../services/orderDetailService";
import { PAGE_SIZE } from "../PageSize";

const handleGetMoneyByMonth = async(req, res) => {
    let orderDetail = await getMoneyByMonth();

    if (!orderDetail) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'OrderDetail not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        orderDetail
    });
}


const handleGetAllOrderDetail = async(req, res) => {
    let orderId = req.body.id;
    let page = 1;

    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }

    let orderDetails = await getAllOrderDetail(PAGE_SIZE, page, orderId);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        orderDetails
    });
}

const handleGetOrderDetailById = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'OrderDetail not found',
        });
    }

    let orderDetail = await getOrderDetailById(id);

    if (!orderDetail) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'OrderDetail not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        orderDetail
    });
}

const handleGetOrderDetailSearch = async(req, res) => {
    let id = req.params.id;


    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'OrderDetail not found',
        });
    }

    let orderDetail = await getOrderDetailSearch(id);

    if (!orderDetail) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'OrderDetail not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        orderDetail
    });
}

const handleGetMostProduct = async(req, res) => {
    let month = req.params.month;
    let orderDetail = await getMostBoutProducts(month);

    if (!orderDetail) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'OrderDetail not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        orderDetail
    });
}

const handleCreateNewOrderDetail = async(req, res) => {
    let newOrderDetail = await createNewOrderDetail(req.body);

    return res.status(200).json(newOrderDetail);
}

const handleUpdateOrderDetail = async(req, res) => {
    let id = req.params.id;
    let data = req.body;
    let message = await updateOrderDetailData(id, data);

    return res.status(200).json(message);
}


const handleDeleteOrderDetail = async(req, res) => {
    let id = req.body.id;

    console.log(id);
    // return res.status(200).json(id);

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID OrderDetail'
        });
    }

    let message = await deleteOrderDetail(id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllOrderDetail,
    handleGetOrderDetailById,
    handleGetOrderDetailSearch,
    handleCreateNewOrderDetail,
    handleUpdateOrderDetail,
    handleDeleteOrderDetail,
    handleGetMostProduct,
    handleGetMoneyByMonth
}