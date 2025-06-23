import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '~/utils/jwt';
import { User } from '~/models/User';

const router = Router();

const isUniqueUser = async  (username: string, email: string) => {
    return User.findOne({where: {username, email}})
};

router.post('/register', async (req: Request, res: Response): Promise<any> => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (await isUniqueUser(username, email)) {
        return res
            .status(400)
            .json({ message: 'Username or email already in use' });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    await User.create({username, email, password: hashedPassword});

    res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;
    const user: User | null = await User.findOne({ where: { username } })

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({
        userId: user.id,
        username: user.username,
    });
    res.json({ token });
});

export default router;