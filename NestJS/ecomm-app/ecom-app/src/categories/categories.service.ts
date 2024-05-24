
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  findAll(query: any) {
    const take = query.limit || 10;
    const skip = query.offset || 0;
    const keyword = query.keyword || '';
    const order = query.sortOrder || 'ASC';
    const sort = query.sortBy || 'category_id';

    return this.categoriesRepository.findAndCount({
      where: { category_name: ILike(`%${keyword}%`) },
      order: { [sort]: order },
      take,
      skip,
    });
  }

  findOne(id: number) {
    return this.categoriesRepository.findOne({ where: { category_id: id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  remove(id: number) {
    return this.categoriesRepository.delete(id);
  }
}
