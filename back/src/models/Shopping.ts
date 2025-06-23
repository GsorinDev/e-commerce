import { Model, DataTypes } from "sequelize";
import { database } from "~/config/database";
import { User } from "./User";
import { Product } from "./Product";

export class Shopping extends Model {
    declare userId: number;
    declare productId: number;
    declare quantity: number;
    declare delivered: boolean;
}

Shopping.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: User,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Product,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        delivered: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        tableName: "shoppings",
        sequelize: database,
        timestamps: false
    }
);

