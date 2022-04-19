import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUser } from '../user.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('user/categories')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  @Get()
  getAll(@AuthUser('id') user_id: number) {
    return this.categoryService.getAllOfUser(user_id);
  }

  @Get(':type')
  getAllByType(@Param('type') type: string, @AuthUser('id') user_id: number) {
    if (!['expense', 'income'].includes(type)) {
      throw new NotFoundException();
    }

    return this.categoryService.getAllOfUserAndType(user_id, type);
  }

  @Post()
  create(@Body() data: CreateCategoryDto, @AuthUser('id') user_id: number) {
    const category = this.categoryRepository.create({ ...data, user_id });
    return this.categoryRepository.save(category);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateCategoryDto,
    @AuthUser('id') user_id: number,
  ) {
    const category = await this.categoryService.findOrFail(id, user_id);
    category.name = data.name;
    return this.categoryRepository.save(category);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @AuthUser('id') user_id: number) {
    const category = await this.categoryService.findOrFail(id, user_id);
    return this.categoryRepository.delete(category.id);
  }
}
