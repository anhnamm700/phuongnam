import { 
    getAllBanner,
    getBannerById,
    getBannersearch,
    createNewBanner,
    updateBannerData,
    deleteBanner
} from "../services/bannerService";
import { PAGE_SIZE } from "../PageSize";


const handleGetAllBanner = async(req, res) => {
    let page = 1;

    if (req.query.page) {
        page = req.query.page;
        page = parseInt(page);
    }

    let Banners = await getAllBanner(PAGE_SIZE, page);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        Banners
    });
}

const handleGetBannerById = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Banner not found',
        });
    }

    let Banner = await getBannerById(id);

    if (!Banner) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Banner not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        Banner
    });
}

const handleGetBannerSearch = async(req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Banner not found',
        });
    }

    let Banner = await getBannersearch(id);

    if (!Banner) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Banner not found',
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        Banner
    });
}

const handleCreateNewBanner = async(req, res) => {
    let newBanner = await createNewBanner(req.body);

    return res.status(200).json(newBanner);
}

const handleUpdateBanner = async(req, res) => {
    let id = req.params.id;
    let data = req.body;
    let message = await updateBannerData(id, data);

    return res.status(200).json(message);
}


const handleDeleteBanner = async(req, res) => {
    let id = req.body.id;

    console.log(id);
    // return res.status(200).json(id);

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID Banner'
        });
    }

    let message = await deleteBanner(id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllBanner,
    handleGetBannerById,
    handleGetBannerSearch,
    handleCreateNewBanner,
    handleUpdateBanner,
    handleDeleteBanner
}