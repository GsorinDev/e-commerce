import {Request, Response, Router} from "express";
import {Shopping} from "~/models/Shopping";
import {Product} from "~/models/Product";
import { authenticateJWT } from "~/middlewares/auth.handler";

const router = Router();

router.use(authenticateJWT);

router.get('/', async (req: any, res: Response): Promise<any> => {
    try {
        const items = await Shopping.findOne({
            where: { userId: req.user!.userId },
            include: [Product]
        });
        return res.json(items);
    } catch (err) {
        return res.status(404).json({ error: 'Not Found' });
    }
});

router.post('/add/:id', async (req: any, res: Response): Promise<any> => {
    try {
        console.log({userId: req.user!.userId, productId: req.params.id, quantity: req.body.quantity})
        const item = await Shopping.create({userId: req.user!.userId, productId: req.params.id, quantity: req.body.quantity});
        return res.status(201).json(item);
    } catch (err) {
        return res.status(500).json({ error: 'Erreur lors de la création' });
    }
});

router.put('update', async (req: any, res: Response): Promise<any> => {
    try {
        const result = await Shopping.update({quantity: req.body.quantity}, { where: { userId: req.user!.userId, productId: req.body.productId } });
        return res.json({ message: 'Mise à jour effectuée', result });
    } catch (err) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }
});

router.delete('delete/:idProduct', async (req: any , res: Response): Promise<any> => {
    try {
        const result = await Shopping.destroy({ where: { userId: req.user!.userId, productId: req.params.idProduct } });
        return res.json({ message: 'Élément supprimé', result });
    } catch (err) {
        return res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
});


export default router;