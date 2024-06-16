// Thrown when a given search (mongoDB database) by Id is an invalid ID
// Ensures that a 400 error code can be thrown rather than 500
export class InvalidIdFormatException extends Error{
    constructor(message: string){
        super(message)
        this.name = "InvalidIdFormatException"

        // Ensures type is set to InvalidIdFormatException , else 'typeof' instance returns object
        Object.setPrototypeOf(this, InvalidIdFormatException.prototype)
    }
}