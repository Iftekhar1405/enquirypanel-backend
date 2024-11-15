import { Module } from '@nestjs/common';
import { RemarksService } from './remarks.service';
import { RemarksController } from './remarks.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Remark, RemarkSchema} from "./schema/remarks.schema";

@Module({
  imports:[MongooseModule.forFeature([{name:Remark.name,schema:RemarkSchema}])],
  providers: [RemarksService],
  controllers: [RemarksController]
})
export class RemarksModule {}
