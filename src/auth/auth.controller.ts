import {Body, Controller,  Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }
    @Post()
    login(@Body() body){
        const {email,password} = body;
        return this.authService.login(email,password);
    }

}
