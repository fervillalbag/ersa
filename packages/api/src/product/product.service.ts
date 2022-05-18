import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDTO } from './dto/product.dto';
import { ProductInterface } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductInterface>,
  ) {}

  async createProduct(
    createProductDTO: CreateProductDTO,
  ): Promise<ProductInterface> {
    const product = new this.productModel(createProductDTO);
    return await product.save();
  }

  async updateProduct(
    id: string,
    createProductDTO: CreateProductDTO,
  ): Promise<ProductInterface> {
    const product = await this.productModel.findOneAndUpdate(
      { id },
      createProductDTO,
      { new: true },
    );
    return product;
  }

  async deleteProduct(id: string): Promise<ProductInterface> {
    const product = await this.productModel.findOneAndDelete({ id });
    return product;
  }

  async getProducts(): Promise<ProductInterface[]> {
    const products = await this.productModel.find({});
    return products;
  }

  async getProduct(id: string): Promise<ProductInterface> {
    const product = await this.productModel.findOne({ id });
    return product;
  }
}
