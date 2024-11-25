import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EnquiryDocument = Enquiry & Document;

@Schema()
export class Enquiry {
  @Prop({ required: true })
  guardianName: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  mobile?: string;

  @Prop()
  email: string;

  @Prop()
  twitter?: string;

  @Prop({ required: true })
  studentFirstName: string;

  @Prop({ required: true })
  studentLastName: string;

  @Prop({required: true})
  grade: string;

  @Prop({ type: Date })
  dob: Date;

  @Prop()
  currentSchool?: string;

  @Prop()
  street?: string;

  @Prop()
  city?: string;

  @Prop()
  state?: string;

  @Prop()
  zip?: string;

  @Prop()
  country?: string;

  @Prop()
  enquirySource?: string;

  @Prop()
  description?: string;
  
  @Prop({required:true})
  gender?: string;

  @Prop()
  hostel?: boolean;
}

export const EnquirySchema = SchemaFactory.createForClass(Enquiry);
