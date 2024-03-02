export class ApiError extends Error {
    public status: number;
    public errors: Error[];
    constructor(status: number, message: string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, "User isn't authorized")
    }
    static BadRequest(message: string, errors = []) {
        return new ApiError(400, message, errors)
    }

}