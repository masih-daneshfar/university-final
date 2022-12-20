
import { NextFunction, Request, Response } from 'express';


const ErrorHandlingMiddleware = (err: Error & { statusCode?: number }, req: Request, res: Response, next: NextFunction) => {
    console.log({ err })
    return res.status(err?.statusCode || 500).json({ error: err.name, message: err.message });
}

export default ErrorHandlingMiddleware