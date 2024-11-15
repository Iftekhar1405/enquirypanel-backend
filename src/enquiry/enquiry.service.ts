import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enquiry, EnquiryDocument } from './schemas/enquiry.schema';
import {query} from "express";

@Injectable()
export class EnquiryService {
    constructor(@InjectModel(Enquiry.name) private readonly enquiryModel: Model<EnquiryDocument>) {
    }

    async create(enquiryData: Partial<Enquiry>): Promise<Enquiry> {
        const newEnquiry = new this.enquiryModel(enquiryData)
        return newEnquiry.save()
    }

    async findAll(): Promise<Enquiry[]> {
        return this.enquiryModel.find().exec()
    }

    async findOne(id: String): Promise<Enquiry> {

        return this.enquiryModel.findById(id).exec()
    }

    async update(id: String, newData: Partial<Enquiry>): Promise<String> {
        const updatedData = this.enquiryModel.findByIdAndUpdate(id, newData, {new: true}).exec()
        if (updatedData) return `data update successfully {Data_id:${id}} new data:${updatedData}`
        return `Could not update the data of id :${id} `
    }

    async delete(id: String): Promise<String> {
        const deletedData = this.enquiryModel.findByIdAndDelete(id).exec()
        if (deletedData) return `data with id:${id} and data:${deletedData} deleted`
        return 'Could not delete'
    }

    async search(searchTerm: string, filters: string,page:number=1,limit:number=20) {
        // Convert the filters string into an array of objects
        const filterArray = filters && filters !== 'undefined' ? JSON.parse(filters) : [];

        // Prepare the search query, if there's a searchTerm, search across multiple fields
        const searchQuery = searchTerm
            ? {
                $or: [
                    { studentFirstName: { $regex: searchTerm, $options: 'i' } },
                    { grade: { $regex: searchTerm, $options: 'i' } },
                    { guardianName: { $regex: searchTerm, $options: 'i' } },
                    { email: { $regex: searchTerm, $options: 'i' } },
                    { phone: { $regex: searchTerm, $options: 'i' } },
                    { mobile: { $regex: searchTerm, $options: 'i' } },
                    { city: { $regex: searchTerm, $options: 'i' } },
                    { state: { $regex: searchTerm, $options: 'i' } },
                    { country: { $regex: searchTerm, $options: 'i' } },
                ],
            }
            : {};

        // Construct the filter query from filterArray (array of objects like { key: "city", value: "New York" })
        const filterQuery = filterArray.reduce((query, filter) => {
            if (filter.key && filter.value) {
                query[filter.key] = { $regex: filter.value, $options: 'i' }; // Regex match for the filter
            }
            return query;
        }, {});

        // Combine the search query and filter query
        const finalQuery = {
            ...searchQuery,
            ...filterQuery, // Apply any filters from the filterArray
        };

        const skip = (page - 1)*limit
        // Perform the search and return the results
        return this.enquiryModel.find(finalQuery).skip(skip).limit(limit).exec();
    }

}