import categoryServices from '../services/categoryServices';


const handleGetAllCategory = async(req, res) => {
    let id = req.body.id; //all || id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID parameter',
            user: []    
        });
    }

    let cates = await categoryServices.getAllCategory(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        cates: cates ? cates : {}    
    });
}

const handleGetCategoryBySlug = async(req, res) => {
    let slug = req.params.slug;
    
    if (slug) {
        let category = await categoryServices.getCategoryBySlug(slug);

        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            category
        });
    }

    return res.status(500).json({
        errCode: 1,
        errMessage: 'Category not found'
    });
}


const handleCreateNewCategory = async(req, res) => {
    let message = await categoryServices.createNewCategory(req.body);
    console.log(message);
    return res.status(200).json(message);
}

const handleEditCategory = async(req, res) => {
    let id = req.params.id;
    let data = req.body;
    let message = await categoryServices.updateCategoryData(id, data);

    return res.status(200).json(message);
}

const handleDeleteCategory = async(req, res) => {
    let id = req.body.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID category'
        });
    }

    let message = await categoryServices.deleteCategory(id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllCategory,
    handleGetCategoryBySlug,
    handleCreateNewCategory,
    handleEditCategory,
    handleDeleteCategory
}