import {Request, Response, Router} from "express";
import {Product} from "~/models/Product";

const router = Router();

router.get('/:id', async (req: Request, res: Response): Promise<any> => {
    const product = await Product.findOne({ where: { id: req.params.id } });
    return res.json(product);
});

router.get('/', async (req: Request, res: Response): Promise<any> => {
    const products = await Product.findAll();
    return res.json(products);
});

export default router;