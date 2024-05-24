import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryDto } from './dto/query.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(query: QueryDto): Promise<Product[]> {
    const { search, sort, order, page, limit, filter } = query;

    const qb = this.productsRepository.createQueryBuilder('product');

    // Searching
    if (search) {
      qb.where('product.product_name LIKE :search OR product.product_description LIKE :search', { search: `%${search}%` });
    }

    // Filtering
    if (filter) {
      Object.keys(filter).forEach(key => {
        qb.andWhere(`product.${key} = :${key}`, { [key]: filter[key] });
      });
    }

    // Sorting
    if (sort && order) {
      qb.orderBy(`product.${sort}`, order.toUpperCase() as 'ASC' | 'DESC');
    }

    // Pagination
    const pageSize = limit ?? 10;
    const currentPage = page ?? 1;
    const offset = (currentPage - 1) * pageSize;

    qb.skip(offset).take(pageSize);

    return qb.getMany();
  }

  async findOne(id: string): Promise<Product> {
    return this.productsRepository.findOneBy({ id: parseInt(id) });
  }
}
