import { PrismaClient, property } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Properties } from '../../configs/properties';

class AuthService {

    private prisma: PrismaClient = new PrismaClient();
    private property: Properties = new Properties();

    public async checkCredentials(userService: string, password: string): Promise<boolean>{
        console.log('[info]: Verificando usuario');
        const [ user ] = await this.prisma.users.findMany({ select: { user: true, passwd: true }, where: { user: userService } });
        if(user){
            console.log('[info]: Usuario encontrado');
            if (password === user.passwd){
                console.log('[info]: Credenciales ok');
                return true;
            } else {
                console.log('[error]: Contraseña incorrecta');
                return false;
            };
        } else {
            console.log('[error]: Usuario no encontrado');
            return false;
        };
    };

    public async getToken(client: string, profile: string): Promise<string> {
        console.log(`[info]: Generando token para cliente: ${client}`);
        const [ expTime ] = await this.property.getProperty('Session Time');
        const emissionDate = new Date();
        emissionDate.toLocaleString('en-US', { timeZone: 'America/Santiago' });
        const expirationDate = new Date(emissionDate);
        expirationDate.setMinutes(expirationDate.getMinutes() + Number(expTime.value));
        expirationDate.toLocaleString('en-US', { timeZone: 'America/Santiago' });
        const payload = { client, profile, exp: Math.floor(expirationDate.getTime() / 1000) };
        const [ property ] = await this.property.getProperty('Token Maker');
        const token = jwt.sign(payload, property.value);
        console.log('[info]: Token generado ok')
        return token;
    };

    public async verifyToken(token: string): Promise<boolean | unknown> {
        try {
            console.log('[info]: Verificando validez del token')
            const [ property ] = await this.property.getProperty('Token Maker');
            const verify = jwt.verify(token, property.value)
            console.log('[info]: Token ok', jwt.verify(token, property.value))
            return true;
        } catch (error) {
            console.log(`[error]: ${error}`);
            return error;
        }
    };

};

export { AuthService };
