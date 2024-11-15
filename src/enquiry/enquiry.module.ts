import { Module } from '@nestjs/common';
import { EnquiryController } from './enquiry.controller';
import { EnquiryService } from './enquiry.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Enquiry, EnquirySchema } from './schemas/enquiry.schema';


@Module({
imports:[MongooseModule.forFeature([{name:Enquiry.name,schema:EnquirySchema}])],
  controllers: [EnquiryController],
  providers: [EnquiryService]
})
export class EnquiryModule {}
