// An error need a no translated label, a code for the frontend that can translate
export interface IError {
    label: string;
    code: string;
    description?: string;
}