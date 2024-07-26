import { Router } from "express"
import { ordersCollection } from "../models/index.js"

export default ({ config, db}) => {
    let router = Router()

    router.get("/", async(req, res) => {
        //...
        //...Get product from DB
        //...
        let exeption = { code: 50, message: "there is no oreders with status ordered." }
        try{
            const list =  ordersCollection.find({status: "ordered"})
            await list.then(response => {
                if (response.length === 0) {
                    throw exeption
                }
                res.send({ payload: response })
            } ) 

        }
        catch(error){
            if (error.code === 50) {
                res.status(400).send({ success: false, message: error.message })
            } else {
                res.status(500).send({ success: false, message: error && error.errorResponse ? error.errorResponse.errmsg: "Error" })
            }
        }
      });

    return router
}