import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {RemarksService} from "./remarks.service";
import {Remark} from "./schema/remarks.schema";

@Controller('remarks')
export class RemarksController {
    constructor(private readonly remarksService: RemarksService) {
    }
@Get()
    async getAll(): Promise<Remark[]> {
        return this.remarksService.findAll()
}
@Get(':id')
    async getOne(@Param('id') id: string): Promise<Remark> {
        return this.remarksService.findOne(id)
}
    @Get()
    async getRemarksByEnquiryId(@Query('enquiryId') enquiryId: string): Promise<Remark[]> {
        return this.remarksService.findByEnquiryId(enquiryId);
    }
@Post()
    async create(@Body() data: Partial<Remark>): Promise<Remark> {
        return this.remarksService.create(data)
}
@Put(':id')
    async update(@Param('id') id: string, @Body() data: Remark): Promise<Remark> {
        return this.remarksService.update(id, data)
}
@Delete(':id')
    async delete(@Param('id') id: string): Promise<Remark> {
        return this.remarksService.delete(id)
}
}
