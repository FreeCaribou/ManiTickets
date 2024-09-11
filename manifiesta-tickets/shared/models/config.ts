import { IMongoObject } from "./mongo-object";
import { IShop } from "./shop";

// It can be only one object in the DB like that, need to be carefull
export interface IConfigDB extends IMongoObject {
    mainShopId: number;
}

export interface IConfig extends IConfigDB {
    mainShop: IShop;
}
