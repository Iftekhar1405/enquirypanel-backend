import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type RemarkDocument = Remark & Document

@Schema({timestamps:true})
export class Remark{
    @Prop({ required: true })
    enquiryId: string;
    @Prop({ required: true })
    remark: string;

}

export const RemarkSchema = SchemaFactory.createForClass(Remark);