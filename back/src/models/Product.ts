import { Model, DataTypes } from "sequelize";
import { database } from "~/config/database";

export class Product extends Model {
    declare id: number;
    declare name: string;
    declare description: string;
    declare image: string;
    declare price: number;
    declare quantity: number;
}

Product.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
        tableName: "products",
        sequelize: database
    }
);
