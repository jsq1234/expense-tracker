import { HttpStatus } from "./http-status";

export class ApiError extends Error {
  public httpStatus: HttpStatus;

  constructor(httpStatus: HttpStatus, message?: string) {
    // Provide default error messages based on HTTP status codes
    const defaultMessage = ApiError.getDefaultMessage(httpStatus);
    // Use provided message or fallback to default message
    super(message || defaultMessage);

    this.httpStatus = httpStatus;
    this.name = "ApiError";
  }

  // A helper method to provide default error messages
  private static getDefaultMessage(httpStatus: number): string {
    switch (httpStatus) {
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 409:
        return "Conflict";
      case 500:
        return "Internal Server Error";
      default:
        return "An unexpected error occurred";
    }
  }
}


export async function genericCatchHandler(e:any, conditions: (() => void) | (() => Promise<void>) | undefined = undefined): Promise<never> {
  if(e instanceof ApiError){
      throw e;
  }
  if(conditions){
    const result = conditions();
    if(result instanceof Promise){
      await result;
    }
  }
  throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR);
}
