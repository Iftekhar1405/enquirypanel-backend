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
import { RemarksService } from './remarks.service';
import { Remark } from './schema/remarks.schema';

@Controller('remarks')
export class RemarksController {
  constructor(private readonly remarksService: RemarksService) {}

  // Get all remarks
  @Get()
  async getAll(@Query('enquiryId') enquiryId: string): Promise<Remark[]> {
    // If enquiryId is provided, fetch remarks by enquiryId
    if (enquiryId) {
      return this.remarksService.findByEnquiryId(enquiryId);
    }
    // Otherwise, fetch all remarks
    return this.remarksService.findAll();
  }

  // Get a specific remark by ID
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Remark> {
    return this.remarksService.findOne(id);
  }

  // Create a new remark
  @Post()
  async create(@Body() data: Partial<Remark>): Promise<Remark> {
    return this.remarksService.create(data);
  }

  // Update an existing remark
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Remark): Promise<Remark> {
    return this.remarksService.update(id, data);
  }

  // Delete a remark
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Remark> {
    return this.remarksService.delete(id);
  }
}
