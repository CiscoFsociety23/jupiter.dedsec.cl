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

    public checkHeader(req: Request, res: Response, next: () => void){
        console.log('[info]: Verificando header');
        const { authorization } = req.headers;
        if(authorization?.split(' ')[0] === 'Bearer'){
            console.log('[info]: Token encontrado');
            next();
        } else {
            console.log('[error]: Debe ingresar un token valido');
            res.json({ status: false });
        }
    };

};

export { AuthMiddleware };
