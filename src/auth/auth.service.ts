import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./schema/user.schema";
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly  userModel: Model<User>,
                private jwtService: JwtService)
{
    }
async login(email:string, password:string): Promise<{token:string}> {
        const user = await this.userModel.findOne({email})
        if (!user) {
            throw new UnauthorizedException(`User not found with email: ${email}`);
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword) throw new UnauthorizedException('Wrong password')

        const token =  this.jwtService.sign({id: user._id})
        return {token}
}
}
