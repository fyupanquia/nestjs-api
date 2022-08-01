import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCustomerDTO, CustomerParamDTO } from '../dto/customer.dto';
import { CustomerService } from '../services/customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  async getAllCustomers(@Res() res: Response) {
    const data = await this.customerService.listCustomer();
    res.status(HttpStatus.OK).send(data);
  }
  @Post()
  async createCustomer(
    @Res() res: Response,
    @Body() customer: CreateCustomerDTO,
  ) {
    const data = await this.customerService.createCustomer(customer);
    res.status(HttpStatus.OK).send(data);
  }
  @Get('/:customerid')
  async getAllCustomerById(@Param() param : CustomerParamDTO) {
    return await this.customerService.getCustomer(param.customerId);
  }
  @Delete('/')
  async deleteCustomer(@Res() res: Response, @Query('customerid') id: string) {
    const data = await this.customerService.getCustomer(id);
    res.status(HttpStatus.OK).json(data);
  }
  @Put('/:customerid')
  async updateCustomerById(
    @Res() res: Response,
    @Query('customerid') id: string,
    @Body() customer: CreateCustomerDTO,
  ) {
    const data = await this.customerService.updateCustomer(id, customer);
    res.status(HttpStatus.OK).json(data);
  }
}
