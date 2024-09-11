import { ObjectId } from "mongodb";

export interface IMongoObject {
    _id: ObjectId;
    created_on?: Date;
}

export function convertId(data: any): any {
    const id = data._id?.toString();
    return {
        ...data,
        _id: id,
    }
}

