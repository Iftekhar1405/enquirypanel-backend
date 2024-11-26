import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enquiry, EnquiryDocument } from './schemas/enquiry.schema';

@Injectable()
export class EnquiryService {
  constructor(
    @InjectModel(Enquiry.name)
    private readonly enquiryModel: Model<EnquiryDocument>,
  ) {}

  async create(enquiryData: Partial<Enquiry>): Promise<Enquiry> {
    const newEnquiry = new this.enquiryModel(enquiryData);
    return newEnquiry.save();
  }

  async findAll(): Promise<Enquiry[]> {
    return this.enquiryModel.find().exec();
  }

  async findOne(id: String): Promise<Enquiry> {
    return this.enquiryModel.findById(id).exec();
  }

  async update(id: String, newData: Partial<Enquiry>): Promise<String> {
    const updatedData = this.enquiryModel
      .findByIdAndUpdate(id, newData, { new: true })
      .exec();
    if (updatedData)
      return `data update successfully {Data_id:${id}} new data:${updatedData}`;
    return `Could not update the data of id :${id} `;
  }

  async delete(id: String): Promise<String> {
    const deletedData = this.enquiryModel.findByIdAndDelete(id).exec();
    if (deletedData)
      return `data with id:${id} and data:${deletedData} deleted`;
    return 'Could not delete';
  }

  async search(
    searchTerm: string,
    filters: string,
    page: number = 1,
    limit: number = 20,
    sort: string,
  ) {
    const filterQuery =
      filters && filters !== 'undefined' ? JSON.parse(filters) : {};

    const sortQuery = sort && sort !== 'undefined' ? JSON.parse(sort) : {};
    Object.keys(sortQuery).forEach((key) => {
      sortQuery[key] = sortQuery[key] === 'asc' ? 1 : -1;
    });

    const searchQuery = searchTerm
      ? {
          $or: [
            { description: { $regex: searchTerm, $options: 'i' } },
            { studentFirstName: { $regex: searchTerm, $options: 'i' } },
            { studentLastName: { $regex: searchTerm, $options: 'i' } },
            { grade: { $regex: searchTerm, $options: 'i' } },
            { guardianName: { $regex: searchTerm, $options: 'i' } },
            { email: { $regex: searchTerm, $options: 'i' } },
            { phone: { $regex: searchTerm, $options: 'i' } },
            { mobile: { $regex: searchTerm, $options: 'i' } },
            { city: { $regex: searchTerm, $options: 'i' } },
            { state: { $regex: searchTerm, $options: 'i' } },
            { zip: { $regex: searchTerm, $options: 'i' } },
            { country: { $regex: searchTerm, $options: 'i' } },
            // { hostel: { $regex: searchTerm, $options: 'i' } },
            { gender: { $regex: searchTerm, $options: 'i' } },
            { enquirySource: { $regex: searchTerm, $options: 'i' } },
            { street: { $regex: searchTerm, $options: 'i' } },
            { currentSchool: { $regex: searchTerm, $options: 'i' } },
            // { dob: searchTerm },
            { twitter: { $regex: searchTerm, $options: 'i' } },
          ],
        }
      : {};
    console.log(filterQuery);
    Object.keys(filterQuery).forEach((item: any) => {
      let value = filterQuery[item];
      console.log(item);
      if (item != 'hostel' && item != 'gender') {
        filterQuery[item] = { $regex: value, $options: 'i' };
      }
    });
    console.log(filterQuery);
    const finalQuery = {
      ...searchQuery,
      ...filterQuery,
    };
    console.log(sortQuery, sort);
    const skip = (page - 1) * limit;
    const data = await this.enquiryModel
      .find(finalQuery)
      .sort(sortQuery)
      .collation({ locale: 'en', strength: 5 })
      .skip(skip)
      .limit(limit)
      .exec();
    const count = await this.enquiryModel.countDocuments().exec();
    const pageCount = Math.ceil(count / limit);

    return { data, count, pageCount };
  }
}
