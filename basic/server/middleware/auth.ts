import {NextFunction, Request, Response} from "express";
import User from '../models/user'
import * as jwt from "jsonwebtoken"

export const authHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        let token = req.cookies.x_auth
        jwt.verify(token, 'secretToken', async function(err, decoded) {
            if(!decoded)
                return res.json({isAuth: false, error: true, message: '로그인을 먼저 해주세요'})
            const user = await User.findOne({
                where: {
                    userId: (<any>decoded).userId,
                    token: token,
                }
            })
            if (!user)
                return res.json({isAuth: false, error: true,  message: '존재하지 않는 유저입니다.'})

            req.headers.token = token
            req.headers.userId = user.userId
            req.headers.nickname = user.nickname
            next()
        })
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
};