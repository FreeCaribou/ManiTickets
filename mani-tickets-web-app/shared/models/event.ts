import { IError } from "./error";
import { IMongoObject } from "./mongo-object";

export const dbNameEvent = 'event';

export interface IEventDB extends IMongoObject {
    label: string;
    beginDate: Date;
    endDate: Date;
    description?: string;
    localisation?: string;
    image?: string;
}

export interface IEvent extends IEventDB {}

export function eventBodyValidator(body: any): IError[] {
    const messages: IError[] = [];

    if (!body.label) {
        messages.push({label:'Event need a label', code: 'eventNoLabel'});
    }

    if (!body.beginDate || isNaN(Date.parse(body.beginDate))) {
        messages.push({label:'Event need a correct begin date', code: 'eventNoBeginDate'});
    }

    if (!body.endDate || isNaN(Date.parse(body.endDate))) {
        messages.push({label:'Event need a correct end date', code: 'eventNoEndDate'});
    }

    return messages;
}
