import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Salário do cliente',
    example: 5000.50,
  })
  salary: number;

  @ApiProperty({
    description: 'Empresa do cliente',
    example: 'Tech Solutions Ltda',
  })
  company: string;
}
