import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
    jest.spyOn(service, 'create').mockImplementation(async () => createProductDto);
    expect(await controller.create(createProductDto)).toBe(createProductDto);
  });

  // Add more test cases for findAll and findOne
});
