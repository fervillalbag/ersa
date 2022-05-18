import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Param,
  Put,
  Res,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductInterface } from './interfaces/product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
  ): Promise<ProductInterface> {
    const product = await this.productService.createProduct(createProductDTO);

    if (Object.keys(product).length === 0) {
      throw new NotFoundException('Product not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Product created!',
      success: true,
      product,
    });
  }

  @Put('/:id')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Param('id') id: string,
  ): Promise<ProductInterface> {
    const product = await this.productService.updateProduct(
      id,
      createProductDTO,
    );

    if (Object.keys(product).length === 0) {
      throw new NotFoundException('Product not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Product updated!',
      success: true,
      product,
    });
  }

  @Delete('/:id')
  async deleteProduct(
    @Res() res,
    @Param('id') id: string,
  ): Promise<ProductInterface> {
    const product = await this.productService.deleteProduct(id);

    if (Object.keys(product).length === 0) {
      throw new NotFoundException('Product not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Product deleted!',
      success: true,
      product,
    });
  }

  @Get('/')
  async getProducts(@Res() res): Promise<ProductInterface> {
    const products = await this.productService.getProducts();

    if (!products) {
      throw new NotFoundException('Products not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Products fetched!',
      success: true,
      products,
    });
  }

  @Get('/:id')
  async getProduct(
    @Res() res,
    @Param('id') id: string,
  ): Promise<ProductInterface> {
    const product = await this.productService.getProduct(id);

    if (Object.keys(product).length === 0) {
      throw new NotFoundException('Product not found!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Product fetched!',
      success: true,
      product,
    });
  }
}
