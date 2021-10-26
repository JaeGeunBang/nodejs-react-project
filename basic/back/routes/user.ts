import express, { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../models/user'

export const userRouter = express.Router() ;

userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users: User[] = await User.findAll();
        res.status(200).send(users);
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try {
        const user = await User.findOne({
            where : {
                id: id,
            }
        })
        if (user) {
            return res.status(200).send(user)
        }
        res.status(404).send("user not found")
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
})

userRouter.post("/", async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create ( {
            nickname: user.nickname,
            userId: user.userId,
            password: hashedPassword,
        })
        console.log(newUser)
        return res.status(200).json(newUser)
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
})

userRouter.patch("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        const user = req.body;
        await User.update({
            nickname: user.nickname,
        }, {
            where: {id: id}
        })
        res.status(200).send(user.nickname)
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
})

userRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10)
        await User.destroy({
            where : {
                id: id,
            }
        })
        res.status(200).send("delete 완료")
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
})