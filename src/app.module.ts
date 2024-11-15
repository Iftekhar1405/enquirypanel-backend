import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnquiryModule } from './enquiry/enquiry.module';
import { MongooseModule } from "@nestjs/mongoose";
import { RemarksModule } from './remarks/remarks.module';
@Module({
  imports: [EnquiryModule,
  MongooseModule.forRoot('mongodb+srv://iftekharahmedxyz:QZazr7KKTdociuOf@enquiry.1qkzf.mongodb.net/?retryWrites=true&w=majority&appName=enquiry'),
  RemarksModule
    
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
