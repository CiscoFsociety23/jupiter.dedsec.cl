import { PrismaClient } from '@prisma/client';

class AuthService {

    private prisma: PrismaClient = new PrismaClient();

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

};

export { AuthService };
