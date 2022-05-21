import { 
    getAllOrder,
    getOrderById,
    getOrderSearch,
    createNewOrder,
    updateOrderData,
    deleteOrder,
    getOrderByUser,
    getMonthOrder,
    getOrderUserId
} from "../services/orderService";
import { PAGE_SIZE } from "../PageSize";


const handleGetAllOrder = async(req, res) => {
    let page = 1;
    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }

    let orders = await getAllOrder(PAGE_SIZE, page);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        orders
    });
}

const handleGetOrderUser = async(req, res) => {
    let page = 1;
    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }

    let orders = await getOrderUserId(PAGE_SIZE, page);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        orders,
        total_page: Math.ceil(orders.countOrder[0].count / PAGE_SIZE)
    });
}

const handleGetOrderById = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Order not found',
        });
    }

    let order = await getOrderById(id);

    if (!order) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Order not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        order
    });
}

const handleGetOrderByUserId = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Order not found',
        });
    }

    let order = await getOrderByUser(id);

    if (!order) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Order not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        order
    });
}


const handleGetMonthOrder = async(req, res) => {
    // let month  = req.params.month;

    // if (!month) {
    //     return res.status(500).json({
    //         errCode: 1,
    //         errMessage: 'Order not found',
    //     });
    // }

    let order = await getMonthOrder();

    if (!order) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Order not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        order
    });
}

const handleGetOrderSearch = async(req, res) => {
    let id = req.params.id;

    console.log(id);

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Order not found',
        });
    }

    let order = await getOrderSearch(id);

    if (!order) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Order not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        order
    });
}

const handleCreateNewOrder = async(req, res) => {
    let newOrder = await createNewOrder(req.body);

    return res.status(200).json(newOrder);
}

const handleUpdateOrder = async(req, res) => {
    let id = req.params.id;
    let data = req.body;
    let message = await updateOrderData(id, data);

    return res.status(200).json(message);
}


const handleDeleteOrder = async(req, res) => {
    let id = req.body.id;

    console.log(id);
    // return res.status(200).json(id);

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID Order'
        });
    }

    let message = await deleteOrder(id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllOrder,
    handleGetOrderById,
    handleGetOrderSearch,
    handleCreateNewOrder,
    handleUpdateOrder,
    handleDeleteOrder,
    handleGetOrderByUserId,
    handleGetMonthOrder,
    handleGetOrderUser
}