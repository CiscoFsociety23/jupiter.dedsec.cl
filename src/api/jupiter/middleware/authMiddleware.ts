import { Request, Response } from 'express';

class AuthMiddleware {

    public checkParams(req: Request, res: Response, next: () => void){
        console.log('[info]: Verificando Parametros');
        const { user, passwd, client } = req.query;
        if(user && passwd && client){
            console.log('[info]: Parametros ok');
            next();
        } else {
            console.log('[error]: Sin parametros validos');
            res.json({ status: false });
        };
    };

};

export { AuthMiddleware };
