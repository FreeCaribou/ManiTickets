import { IEvent } from "./event";
import { IMongoObject } from "./mongo-object";
import { IShop } from "./shop";
import { ITicket } from "./ticket";

export interface IOrderDB extends IMongoObject {
    uuid: string;
    email: string;
    clientName: string;
    vivaWalletId: string;
    merchantReference: string;
    orderDate: Date;
    orderDelivery: Date;
    code: string;

    ticketsIds: number[];
    eventId: number;
    shopId: number;
}

export interface IOrder extends IOrderDB {
    tickets: ITicket[];
    event: IEvent;
    shop: IShop;
}
