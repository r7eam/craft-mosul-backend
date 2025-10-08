import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { NeighborhoodsService } from './neighborhoods.service';
import { CreateNeighborhoodDto } from './dto/create-neighborhoods.dto';
import { UpdateNeighborhoodDto } from './dto/update-neighborhoods.dto';
import { Roles } from '../auth/decorators/roles.decorators';
import { Public } from '../auth/decorators/public.decorator';

@Controller('neighborhoods')
@ApiBearerAuth('JWT-auth')
export class NeighborhoodsController {
  constructor(private readonly neighborhoodsService: NeighborhoodsService) {}

  @ApiBearerAuth('JWT-auth')
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateNeighborhoodDto) {
    return this.neighborhoodsService.create(dto);
  }

  @ApiBearerAuth('JWT-auth')
  @Public()
  @Get()
  findAll() {
    return this.neighborhoodsService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.neighborhoodsService.findOne(+id);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNeighborhoodDto) {
    return this.neighborhoodsService.update(+id, dto);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.neighborhoodsService.remove(+id);
  }
}