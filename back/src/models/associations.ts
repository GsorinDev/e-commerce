import { User } from "./User";
import { Shopping } from "./Shopping";
import { Product } from "./Product";
import {database} from "~/config/database";

export function setupAssociations() {
    User.hasMany(Shopping, { foreignKey: "userId" });
    Shopping.belongsTo(User, { foreignKey: "userId" });

    Product.hasMany(Shopping, { foreignKey: "productId" });
    Shopping.belongsTo(Product, { foreignKey: "productId" });

    database.sync({force: false});
}
