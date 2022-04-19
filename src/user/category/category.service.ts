import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  getAllOfUser(user_id: number) {
    return this.categoryRepository.find({
      where: { user_id },
    });
  }

  getAllOfUserAndType(user_id: number, type: string) {
    return this.categoryRepository.find({
      where: { user_id, type },
    });
  }

  async findOrFail(id: any, user_id = 0) {
    const category = await this.categoryRepository.findOne(id);

    if (category && (user_id === 0 || category.user_id === user_id)) {
      return category;
    }

    throw new NotFoundException('Expense Not Found');
  }
}
