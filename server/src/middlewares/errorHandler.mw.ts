
import { NextFunction, Request, Response } from 'express';


const ErrorHandlingMiddleware = (err: Error & { statusCode?: number }, req: Request, res: Response, next: NextFunction) => {
    const errorJson = JSON.parse(
      JSON.stringify(err, Object.getOwnPropertyNames(err)));
    console.log({ errorJson });
    return res
      .status(errorJson?.statusCode || 500)
      .json({ error: errorJson.name, message: errorJson.message });
}

export default ErrorHandlingMiddleware