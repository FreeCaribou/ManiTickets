import { IEvent } from "./event";
import { IMongoObject } from "./mongo-object";
import { ITicketType } from "./ticket-type";

export interface IShopDB extends IMongoObject {
    label: string;
    description: string;
    image: string;
    active: boolean;
    backgroundColor: string;

    ticketTypesIds: number[];
    eventId: number;
}

export interface IShop extends IShopDB {
    ticketTypes: ITicketType[];
    event: IEvent;
}
