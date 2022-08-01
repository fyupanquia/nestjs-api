import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDTO } from '../dto/customer.dto';
import { Customer } from '../interface/customer.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  public async listCustomer(): Promise<Customer[]> {
    return await this.customerModel.find({});
  }
  public async createCustomer(
    customerDto: CreateCustomerDTO,
  ): Promise<Customer> {
    //return await this.customerModel.save();
    const newCustomer = new this.customerModel(customerDto)
    return newCustomer.save()
    /*
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      '',
      customerDto,
      { new: true },
    );
    return updatedCustomer;
    */
  }
  public async updateCustomer(
    id,
    customerDto: CreateCustomerDTO,
  ): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      id,
      customerDto,
      { new: true },
    );
    return updatedCustomer;
  }
  public async getCustomer(id: string): Promise<Customer[]> {
    return await this.customerModel.findById(id);
  }
  public async removeCustomer(id: string): Promise<Customer[]> {
    return await this.customerModel.findByIdAndRemove(id);
  }
}
