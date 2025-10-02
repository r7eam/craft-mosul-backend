import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NeighborhoodsService } from './neighborhoods.service';
import { CreateNeighborhoodDto } from './dto/create-neighborhoods.dto';
import { UpdateNeighborhoodDto } from './dto/update-neighborhoods.dto';

@Controller('neighborhoods')
export class NeighborhoodsController {
  constructor(private readonly neighborhoodsService: NeighborhoodsService) {}

  @Post()
  create(@Body() dto: CreateNeighborhoodDto) {
    return this.neighborhoodsService.create(dto);
  }

  @Get()
  findAll() {
    return this.neighborhoodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.neighborhoodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNeighborhoodDto) {
    return this.neighborhoodsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.neighborhoodsService.remove(+id);
  }
}