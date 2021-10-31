import {
    Model, DataTypes,
} from 'sequelize';
import { dbType } from './index';
import { sequelize } from './sequelize';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"

class User extends Model {
    public readonly id!: number;
    public nickname!: string;
    public userId!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public comparePassword(plainPassowrd: string, userPassword: string) {
        return new Promise(function (resolve, reject) {
            bcrypt.compare(plainPassowrd, userPassword, function(err, isMatch) {
                resolve(isMatch)
            })
        })
    }

    public generateToken(userId: string) {
        return new Promise(function(resolve, reject) {
            jwt.sign(userId, 'secretToken', function(err, token) {
                resolve(token)
            })
        })
    }
}

User.init({
    nickname: {
        type: DataTypes.STRING(20),
    },
    userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

export const associate = (db: dbType) => {
};

export default User;