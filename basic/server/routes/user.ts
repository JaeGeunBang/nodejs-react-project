import express, { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../models/user'
import { authHandler } from "../middleware/auth";


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

// auth라는 middleware 추가, callback function 하기전 미리 하기위함
userRouter.get('/auth', authHandler, (req, res) => {
    try {
        res.status(200).json({
            isAuth: true,
            error: false,
            userId: req.headers.userId,
            nickname: req.headers.nickname,
        })
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }

})

userRouter.get('/logout', authHandler, async (req:Request, res:Response) => {
    try {
        const user = await User.findOne({
            where : {
                userId: req.headers.userId,
            }
        })
        if (user) {
            await User.update({
                token: "",
            }, {
                where: {id: user.id}
            })
            res.status(200).send('로그아웃 성공')
        } else {
            res.status(404).send("user not found")
        }
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
})

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

userRouter.post("/register", async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create ( {
            nickname: user.nickname,
            userId: user.userId,
            password: hashedPassword,
            token: "",
        })
        res.status(200).json({success: true, userId: user.userId})
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
})


userRouter.post('/login', async (req:Request, res:Response) => {
    try {
        const user = await User.findOne({
            where : {
                userId: req.body.userId,
            }
        })
        if (user) {
            const isMatch = await user.comparePassword(req.body.password, user.password) as boolean
            if(!isMatch)
                return res.status(404).json({loginSuccess: false, message: "패스워드 틀림"})
            const token = await user.generateToken(user.userId) // 토큰 저장은 쿠키 or 로컬저장소에 저장

            await User.update({
                token: token,
            }, {
                where: {id: user.id}
            })
            res.cookie('x_auth', token, {
                maxAge: 24*60*60,
                httpOnly: true
            }).status(200).json({loginSuccess: true, message: "로그인 성공", userId: user.userId})
        } else {
            res.status(404).json({loginSuccess: false, message: "사용자 에러"})
        }
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
            token: user.token,
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