import { Request, Response, NextFunction } from 'express';
export type IdRequest = Request<{
    id: string;
}>;
declare const _default: {
    post: (req: Request, res: Response, next: NextFunction) => void;
    put: (req: Request, res: Response, next: NextFunction) => void;
    show: (req: Request, res: Response, next: NextFunction) => void;
    delete: (req: Request, res: Response, next: NextFunction) => void;
};
export default _default;
