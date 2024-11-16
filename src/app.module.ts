import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnquiryModule } from './enquiry/enquiry.module';
import { MongooseModule } from "@nestjs/mongoose";
import { RemarksModule } from './remarks/remarks.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [EnquiryModule,
  MongooseModule.forRoot('mongodb+srv://iftekharahmedxyz:QZazr7KKTdociuOf@enquiry.1qkzf.mongodb.net/?retryWrites=true&w=majority&appName=enquiry'),
  RemarksModule,
  AuthModule
    
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
