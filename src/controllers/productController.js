import { 
    getAllProduct, 
    getProductBySlug,
    getProductSearch,
    createNewProduct,
    updateProductData,
    deleteProduct,
    getProductByBrandId,
    getProductByCateId,
    filterProduct,
    getHotProduct,
    getAllProductPanigation,
    getCountProduct,
    getProductById,
    checkOrder
} from "../services/productService";
import { PAGE_SIZE } from "../PageSize";


const handleGetAllProduct = async(req, res) => {
    let page = 1;
    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }

    let products = await getAllProduct(PAGE_SIZE, page);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        products
    });
}

const handleGetCountProduct = async(req, res) => {
    let products = await getCountProduct();

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        products
    });
}


const handleCheckOrder = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Product not found',
        });
    }

    let product = await checkOrder(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        product
    });
}

const handleGetAllProductPanigation = async(req, res) => {
    let page = 1;
    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }

    let products = await getAllProductPanigation(PAGE_SIZE, page);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        products,
        total_page: Math.ceil(products.countProduct[0].count / PAGE_SIZE)
    });
}

const handleGetHotProduct = async(req, res) => {
    let product = await getHotProduct(req.body);

    if (!product) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Product not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        product
    });
}


const handleGetProductById = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Product not found',
        });
    }

    let product = await getProductById(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        product
    });
}

const handleGetProductByBrandId = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Product not found',
        });
    }

    let product = await getProductByBrandId(id);

    if (!product) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Product not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        product
    });
}


const handleFilterProduct = async(req, res) => {
    let data = req.body;

    const { filter } = data;

    console.log(filter);

    let product = await filterProduct(filter);

    if (!product) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Product not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        product
    });
}

const handleGetProductByCateId = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Product not found',
        });
    }

    let product = await getProductByCateId(id);

    if (!product) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Product not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        product
    });
}

const handleGetProductBySlug = async(req, res) => {
    let slug = req.params.slug;

    if (!slug) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Product not found',
        });
    }

    let product = await getProductSearch(slug);

    if (!product) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Product not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        product
    });
}

const handleGetProductSearch = async(req, res) => {
    let slug = req.params.slug;

    if (!slug) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Product not found',
        });
    }

    let product = await getProductSearch(slug);

    if (!product) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Product not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        product
    });
}

const handleCreateNewProduct = async(req, res) => {
    let newProduct = await createNewProduct(req.body);

    return res.status(200).json(newProduct);
}

const handleUpdateProduct = async(req, res) => {
    let id = req.params.id;
    let data = req.body;
    let message = await updateProductData(id, data);

    return res.status(200).json(message);
}


const handleDeleteProduct = async(req, res) => {
    let id = req.body.id;

    console.log(id);
    // return res.status(200).json(id);

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID product'
        });
    }

    let message = await deleteProduct(id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllProduct,
    handleGetProductBySlug,
    handleGetProductSearch,
    handleCreateNewProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetProductByBrandId,
    handleGetProductByCateId,
    handleFilterProduct,
    handleGetHotProduct,
    handleGetAllProductPanigation,
    handleGetCountProduct,
    handleGetProductById,
    handleCheckOrder
} 