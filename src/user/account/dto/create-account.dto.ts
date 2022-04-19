import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  readonly balance: number;
}
