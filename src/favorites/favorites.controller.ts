import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() dto: CreateFavoriteDto) {
    return this.favoritesService.create(dto);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Get('client/:clientId')
  findByClientId(@Param('clientId') clientId: string) {
    return this.favoritesService.findByClientId(+clientId);
  }

  @Get('client/:clientId/worker/:workerId')
  findByClientAndWorker(
    @Param('clientId') clientId: string,
    @Param('workerId') workerId: string,
  ) {
    return this.favoritesService.findByClientAndWorker(+clientId, +workerId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFavoriteDto) {
    return this.favoritesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }

  @Delete('client/:clientId/worker/:workerId')
  removeByClientAndWorker(
    @Param('clientId') clientId: string,
    @Param('workerId') workerId: string,
  ) {
    return this.favoritesService.removeByClientAndWorker(+clientId, +workerId);
  }
}