export interface ITicketsType {
    label: string;
    price: number;
    
    id?: string;
    created_on: Date,
}

// Interface for the basket of selection UI
export interface ITicketsTypeBasket extends ITicketsType {
    // how many of this type is selected
    unit?: number;
}
