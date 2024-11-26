import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { Enquiry } from './schemas/enquiry.schema';

@Controller('enquiry')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}
  @Get()
  async findAll(): Promise<Enquiry[]> {
    return this.enquiryService.findAll();
  }

  @Get('search')
  async search(
    @Query('searchTerm') searchTerm: string,
    @Query('filters') filters: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
  ) {
    return this.enquiryService.search(searchTerm, filters, page, limit, sort);
  }

  @Get(':id')
  async findOne(@Param('id') id: String): Promise<Enquiry> {
    return this.enquiryService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: String, @Body() body: Partial<Enquiry>) {
    return this.enquiryService.update(id, body);
  }

  @Post()
  async createEnquiry(@Body() enquiryData: Enquiry): Promise<Enquiry> {
    return this.enquiryService.create(enquiryData);
  }

  @Delete(':id')
  async delete(@Param('id') id: String): Promise<String> {
    return this.enquiryService.delete(id);
  }
}
