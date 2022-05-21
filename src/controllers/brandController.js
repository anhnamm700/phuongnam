import { 
    getAllBrand,
    getBrandsById,
    getBrandsearch,
    createNewBrand,
    updateBrandData,
    deleteBrand,
    getBrandByCateId,
    checkCountPtoduct,
    getAllBrandWithout
} from "../services/brandService";
import { PAGE_SIZE } from "../PageSize";

const handleGetAllBrandWithout = async(req, res) => {
    let brands = await getAllBrandWithout();

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        brands
    });
}


const handleGetAllBrand = async(req, res) => {
    let page = 1;

    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }

    let brands = await getAllBrand(PAGE_SIZE, page);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        brands,
        total_page: Math.ceil(brands.countBrand[0].count / PAGE_SIZE)
    });
}

const handleCheckProduct = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Brands not found',
        });
    }

    let brands = await checkCountPtoduct(id);

    if (!brands) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Brands not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        brands
    });
}


const handleGetBrandsByCateId = async(req, res) => {
    let id = req.params.id;

    console.log(id);

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Brands not found',
        });
    }

    let brands = await getBrandByCateId(id);

    if (!brands) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Brands not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        brands
    });
}

const handleGetBrandById = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Brand not found',
        });
    }

    let brand = await getBrandsById(id);

    if (!brand) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Brand not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        brand
    });
}

const handleGetBrandSearch = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Brand not found',
        });
    }

    let brand = await getBrandsearch(id);

    if (!brand) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Brand not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        brand
    });
}

const handleCreateNewBrand = async(req, res) => {
    let newBrand = await createNewBrand(req.body);

    return res.status(200).json(newBrand);
}

const handleUpdateBrand = async(req, res) => {
    let id = req.params.id;
    let data = req.body;
    let message = await updateBrandData(id, data);

    return res.status(200).json(message);
}


const handleDeleteBrand = async(req, res) => {
    let id = req.body.id;

    console.log(id);
    // return res.status(200).json(id);

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID Brand'
        });
    }

    let message = await deleteBrand(id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllBrand,
    handleGetBrandById,
    handleGetBrandSearch,
    handleCreateNewBrand,
    handleUpdateBrand,
    handleDeleteBrand,
    handleGetBrandsByCateId,
    handleCheckProduct,
    handleGetAllBrandWithout
}