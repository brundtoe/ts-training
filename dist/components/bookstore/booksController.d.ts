import { Request, Response, NextFunction } from 'express';
declare const _default: {
    index(req: Request, res: Response, next: NextFunction): void;
    sample(req: Request<{
        num: string;
    }>, res: Response, next: NextFunction): void;
    show(req: Request<{
        id: string;
    }>, res: Response, next: NextFunction): void;
    delete(req: Request<{
        id: string;
    }>, res: Response, next: NextFunction): void;
    update(req: Request, res: Response, next: NextFunction): void;
    save(req: Request, res: Response, next: NextFunction): void;
};
export default _default;
