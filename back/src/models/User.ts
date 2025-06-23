import { Model, DataTypes } from "sequelize";
import { database } from "~/config/database";

export class User extends Model {
    declare id: number;
    declare username: string;
    declare email: string;
    declare password: string;
}

User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    },
    {
        tableName: "users",
        sequelize: database
    }
);
