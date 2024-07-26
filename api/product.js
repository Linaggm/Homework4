import { Router } from "express"
import { productsCollection } from "../models/index.js"

export default ({ config, db}) => {
    let router = Router()
    router.get("/", (req, res) => {
        //...
        //...Get product from DB
        //...
        res.status(200).send({
          product_count: 1,
          size: "L",
        });
      });
      
      router.get("/:id", (req, res) => {
        const { id } = req.params;
          const typeOfID = Number(id)
        if (!isNaN(id)) {
          //logic of retrieving a product
          const product = { name: "chemises Authentic", size: "XL" };
          // const product = null
          //true => !true = false => !!true = true
          //'rewared' => !'reward' = false => !!'reward' = true
          //{} => !{} =
      
          if (!product) {
            res.status(418).send({ message: "No product" });
          }
          res.status(200).send({ success: true, payload: product });
        }
        else{
          res.status(400).send({ success: false, message: 'Bad request, id should be number'})
        }
      });
      
      router.post("/:id", (req, res) => {
        const { id } = req.params;
        const { image } = req.body; //body not paresed yet
      
        //...
        //Do somthing in DB
        //...
      
        if (!image) {
          res.status(418).send({ message: "No image sent" });
        }
      
        res.send({
          product: `product with ${id} created`,
        });
      });

      router.post('/', async (req, res) => {
        let exeption = { message: "all info are required" }
        try {
            const newProduct = req.body;
            if (newProduct.name && newProduct.price && newProduct.stock && newProduct.category) {
              await productsCollection.create(newProduct).then(response => {
                  res.send({ payload: response })
              });
            }
            else{
              throw exeption
            }

        } catch (error) {
            if (error == exeption) {
              res.send({ error })
            }
            else if (error.code === 11000) {
                res.status(400).send({ success: false, message: "Product with this name already exists" })
            } else {
                res.status(500).send({ success: false, message: error && error.errorResponse ? error.errorResponse.errmsg: "Error" })
            }
        }
    });

  return router

}