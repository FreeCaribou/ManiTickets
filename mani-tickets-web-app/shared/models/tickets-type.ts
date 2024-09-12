import { IEvent } from "./event";
import { IMongoObject } from "./mongo-object";

export const dbNameTicketType = 'ticket-type';

export interface ITicketTypeDB extends IMongoObject {
    label: string;
    price: number;
    description: string;
    image: string;
    currency: string;

    eventId: number;
}

export interface ITicketType extends ITicketTypeDB {
    event: IEvent;
}

// Interface for the basket of selection UI
export interface ITicketTypeBasket extends ITicketType {
    // how many of this type is selected
    unit?: number;
}
