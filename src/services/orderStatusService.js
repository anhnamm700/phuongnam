import db from "../models/index";
import { QueryTypes } from "sequelize";

const getAllStatus = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let products = await db.sequelize.query("select * from orderstatus", { type: QueryTypes.SELECT });

            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {getAllStatus};
