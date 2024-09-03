import { ObjectId } from "mongodb";

export interface IMongoObject {
    _id: ObjectId;
    created_on: Date;
}