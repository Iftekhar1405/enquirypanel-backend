import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
                secret: 'helloworld',
                signOptions: { expiresIn: '1d'}}),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    // exports:[AuthModule]
})
export class AuthModule {}
