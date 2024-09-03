import { IMongoObject } from "./mongo-object";
import { IOrder } from "./order";
import { ITicketType } from "./tickets-type";

export interface ITicketDB extends IMongoObject {
    uuid: string;
    clientName: string;
    scanned: boolean;

    ticketTypeId: number;
    orderId: number;
}

export interface ITicket extends ITicketDB {
    ticketType: ITicketType;
    order: IOrder;
}
