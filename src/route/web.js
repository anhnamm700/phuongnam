import express from "express";
import homeController from "../controllers/homController";
import userController from "../controllers/userController";
import categoryController from "../controllers/categoryController";
import productController from "../controllers/productController";
import orderController from "../controllers/orderController";
import orderDetailController from "../controllers/orderDetailController";
import bannerController from "../controllers/bannerController";
import vourcherController from "../controllers/voucherController";
import notificationController from "../controllers/notificationController";
import settingController from "../controllers/settingController";
import roleController from "../controllers/roleController";
import brandController from "../controllers/brandController";

let router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.getHomPage);

    // router.get("/danh-muc", (req, res) => {
    //     return res.send("Danh mục sản phẩm");
    // });


    router.get("/crud", homeController.getCURD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayCRUD); 
    router.get("/edit-crud", homeController.editCRUD); 
    router.post("/put-crud", homeController.putCRUD); 
    router.get("/delete-crud", homeController.deleteCRUD); 
    
    router.post("/api/login", userController.handleLogin); 
    router.get("/api/get-all-user", userController.handleGetAllUser); 
    router.get("/api/get-user/:id", userController.handleGetUserbyId); 
    router.post("/api/create-new-user", userController.handleCreateNewUser); 
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUser); 

    router.get("/api/get-all-category", categoryController.handleGetAllCategory); 
    router.get("/api/get-category/:slug", categoryController.handleGetCategoryBySlug);
    router.post("/api/create-new-category", categoryController.handleCreateNewCategory); 
    router.put("/api/edit-category/:id", categoryController.handleEditCategory);
    router.delete("/api/delete-category", categoryController.handleDeleteCategory); 

    router.get("/api/get-all-product", productController.handleGetAllProduct); 
    router.get("/api/get-product/:slug", productController.handleGetProductBySlug);
    router.get("/api/search-product/:slug", productController.handleGetProductSearch);
    router.post("/api/create-new-product", productController.handleCreateNewProduct);
    router.put("/api/edit-product/:id", productController.handleUpdateProduct);
    router.delete("/api/delete-product", productController.handleDeleteProduct); 

    router.get("/api/get-all-order", orderController.handleGetAllOrder); 
    router.get("/api/get-order/:id", orderController.handleGetOrderById);
    router.get("/api/search-order/:id", orderController.handleGetOrderSearch);
    router.post("/api/create-new-order", orderController.handleCreateNewOrder);
    router.put("/api/edit-order/:id", orderController.handleUpdateOrder);
    router.delete("/api/delete-order", orderController.handleDeleteOrder); 

    router.get("/api/get-all-orderDetail", orderDetailController.handleGetAllOrderDetail); 
    router.get("/api/get-orderDetail/:id", orderDetailController.handleGetOrderDetailById);
    router.get("/api/search-orderDetail/:id", orderDetailController.handleGetOrderDetailSearch);
    router.post("/api/create-new-orderDetail", orderDetailController.handleCreateNewOrderDetail);
    router.put("/api/edit-orderDetail/:id", orderDetailController.handleUpdateOrderDetail);
    router.delete("/api/delete-orderDetail", orderDetailController.handleDeleteOrderDetail); 

    router.get("/api/get-all-banner", bannerController.handleGetAllBanner); 
    router.get("/api/get-banner/:id", bannerController.handleGetBannerById);
    router.get("/api/search-banner/:id", bannerController.handleGetBannerSearch);
    router.post("/api/create-new-banner", bannerController.handleCreateNewBanner);
    router.put("/api/edit-banner/:id", bannerController.handleUpdateBanner);
    router.delete("/api/delete-banner", bannerController.handleDeleteBanner); 

    router.get("/api/get-all-voucher", vourcherController.handleGetAllVoucher); 
    router.get("/api/get-voucher/:id", vourcherController.handleGetVoucherById);
    router.get("/api/search-voucher/:id", vourcherController.handleGetVoucherSearch);
    router.post("/api/create-new-voucher", vourcherController.handleCreateNewVoucher);
    router.put("/api/edit-voucher/:id", vourcherController.handleUpdateVoucher);
    router.delete("/api/delete-voucher", vourcherController.handleDeleteVoucher); 

    router.get("/api/get-all-notifi", notificationController.handleGetAllNoti); 
    router.get("/api/get-notifi/:id", notificationController.handleGetNotiById);
    router.get("/api/search-notifi/:id", notificationController.handleGetNotiSearch);
    router.post("/api/create-new-notifi", notificationController.handleCreateNewNoti);
    router.put("/api/edit-notifi/:id", notificationController.handleUpdateNoti);
    router.delete("/api/delete-notifi", notificationController.handleDeleteNoti); 

    router.get("/api/get-setting", settingController.handleGetSetting); 
    router.post("/api/create-new-setting", settingController.handleCreateNewSetting);
    router.put("/api/edit-setting/:id", settingController.handleUpdateSetting);
    router.delete("/api/delete-setting", settingController.handleDeleteSetting); 

    router.get("/api/get-all-role", roleController.handleGetAllRole); 
    router.get("/api/get-role/:id", roleController.handleGetRoleById);
    router.get("/api/search-role/:id", roleController.handleGetRoleSearch);
    router.post("/api/create-new-role", roleController.handleCreateNewRole);
    router.put("/api/edit-role/:id", roleController.handleUpdateRole);
    router.delete("/api/delete-role", roleController.handleDeleteRole); 

    router.get("/api/get-all-brand", brandController.handleGetAllBrand); 
    router.get("/api/get-brand/:id", brandController.handleGetBrandById);
    router.get("/api/search-brand/:id", brandController.handleGetBrandSearch);
    router.post("/api/create-new-brand", brandController.handleCreateNewBrand);
    router.put("/api/edit-brand/:id", brandController.handleUpdateBrand);
    router.delete("/api/delete-brand", brandController.handleDeleteBrand); 
 
    return app.use("/", router);
}

module.exports = initWebRoutes;