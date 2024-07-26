import {Router} from "express"
import product from "./product.js";
import { config } from "dotenv";
import orders from "./orders.js";

export default ({config, db}) => {
    let api = Router();
    api.use('/products',product({config, db}))
    api.use('/orders', orders({config, db}) )
    return api
}