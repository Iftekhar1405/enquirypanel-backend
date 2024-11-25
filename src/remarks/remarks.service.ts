import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Remark, RemarkDocument } from './schema/remarks.schema';

@Injectable()
export class RemarksService {
  constructor(
    @InjectModel(Remark.name)
    private readonly remarkModel: Model<RemarkDocument>,
  ) {}

  async create(remarkData: Partial<Remark>): Promise<Remark> {
    const newRemark = new this.remarkModel(remarkData);
    return newRemark.save();
  }
  async findOne(id: string): Promise<Remark> {
    return this.remarkModel.findById(id).exec();
  }

  async findAll(): Promise<Remark[]> {
    return this.remarkModel.find().exec();
  }

  async findByEnquiryId(enquiryId: string): Promise<Remark[]> {
    return this.remarkModel.find({ enquiryId }).exec(); // Fetch remarks by enquiryId
  }

  async update(id: string, newData: Partial<Remark>): Promise<Remark> {
    return this.remarkModel
      .findByIdAndUpdate(id, newData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Remark> {
    return this.remarkModel.findByIdAndDelete(id).exec();
  }
}
