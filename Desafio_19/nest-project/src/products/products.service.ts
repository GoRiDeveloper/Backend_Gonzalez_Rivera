import { Injectable } from '@nestjs/common';
import { randomUUID as generateID } from "crypto";
import { PRODS } from "../dao/index";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto) {

    createProductDto._id = generateID();

    const 
    
    QUERY  = { name: createProductDto.name },
    EXISTS = await PRODS.findByProp(QUERY, false);

    if (EXISTS) {

      createProductDto.stock = EXISTS.stock + 1;

      const QUERY_STOCK = { stock: createProductDto.stock };
      return await PRODS.patchOne(EXISTS._id, QUERY_STOCK);

    };

    return await PRODS.save(createProductDto);

  };

  async findAll() {
    return await PRODS.getAll();
  };

  async findOne(id: string) {
    return await PRODS.getOne(id);
  };

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await PRODS.patchOne(id, updateProductDto);
  };

  async remove(id: string) {
    return await PRODS.deleteOne(id);
  };

};