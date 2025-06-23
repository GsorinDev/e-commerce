import cors from 'cors'
import express from 'express'
import { config } from '~/config/config'
import { ExceptionsHandler } from '~/middlewares/exceptions.handler'
import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler'
import authRouter from '~/controllers/auth.controller';
import productRouter from '~/controllers/product.controller';
import shoppingRouter from '~/controllers/shopping.controller';
import dotenv from 'dotenv'
import { setupAssociations } from "./models/associations";
import {Product} from "~/models/Product";
dotenv.config()

const app = express()


app.use(express.json())

app.use(cors())

app.get('/', (req: any, res: any) => res.send('🏠'))

app.use('/auth', authRouter);
app.use('/products', productRouter)
app.use('/shopping', shoppingRouter)
app.all('/{*any}', UnknownRoutesHandler)

setupAssociations();

app.use(ExceptionsHandler)

app.listen(config.API_PORT, () => console.log(`http://localhost:${config.API_PORT}`))



// Product.bulkCreate([
//     {
//         name: "Casque Bluetooth",
//         description: "Casque sans fil avec réduction de bruit",
//         image: "https://via.placeholder.com/150",
//         price: 99.99,
//         quantity: 10
//     },
//     {
//         name: "Souris Gaming",
//         description: "Souris optique RGB ultra précise",
//         image: "https://via.placeholder.com/150",
//         price: 49.99,
//         quantity: 25
//     }
// ]);