import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryDto } from './dto/query.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto: CreateProductDto = {
      id: 1,
      product_name: 'Product 1',
      product_description: 'Description 1',
      category_id: 1,
      price: 100,
      created_at: new Date(),
    };
    expect(await service.create(createProductDto)).toBe(createProductDto);
  });

  // Add more test cases for findAll and findOne
});
