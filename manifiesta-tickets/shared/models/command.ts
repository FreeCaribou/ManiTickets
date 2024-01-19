import { ITicketsType } from "./tickets-type";

export interface ICommand {
    uuid: string;
    code: string;
    email: string;
    tickets: {
        quantity: number;
        ticketsType: ITicketsType;
    }[];

    created_on: Date;
}