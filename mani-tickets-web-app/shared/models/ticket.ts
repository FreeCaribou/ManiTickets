import { IEvent } from "./event";
import { IMongoObject } from "./mongo-object";
import { IOrder } from "./order";
import { ITicketType } from "./ticket-type";

export interface ITicketDB extends IMongoObject {
    uuid: string;
    clientName: string;
    scanned: boolean;

    ticketTypeId: number;
    orderId: number;
    eventId: number;
}

export interface ITicket extends ITicketDB {
    ticketType: ITicketType;
    order: IOrder;
    event: IEvent;
}
