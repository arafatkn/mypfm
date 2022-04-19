import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly name: string;
}
