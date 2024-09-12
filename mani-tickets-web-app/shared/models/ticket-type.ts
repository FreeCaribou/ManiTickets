import { IError } from "./error";
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

export function ticketTypeBodyValidator(body: any): IError[] {
    const messages: IError[] = [];

    if (!body.label) {
        messages.push({label:'Tickets type need a label', code: 'ticketTypeNoLabel'});
    }

    if (!body.eventId) {
        messages.push({label:'Tickets type need a event id', code: 'ticketTypeNoEventId'});
    }

    if (!body.price || !parseInt(body.price)) {
        messages.push({label:'Tickets type need a price - price need to be a number', code: 'ticketTypeBadPrice'});
    }

    return messages;
}
