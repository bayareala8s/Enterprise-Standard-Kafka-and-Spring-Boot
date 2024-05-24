import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryDto {
  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional()
  sort?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  order?: 'asc' | 'desc';

  @ApiPropertyOptional()
  page?: number;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  filter?: string;
}
