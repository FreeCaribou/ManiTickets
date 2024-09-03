import { IMongoObject } from "./mongo-object";

export interface IEventDB extends IMongoObject {
    label: string;
    beginDate: Date;
    endDate: Date;
    description: string;
    localisation: string;
    image: string;
}

export interface IEvent extends IEventDB {}
