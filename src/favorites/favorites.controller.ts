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
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Roles } from '../auth/decorators/roles.decorators';
import { CurrentUser } from '../auth/decorators/current-user.decorators';

@Controller('favorites')
@ApiBearerAuth('JWT-auth')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiBearerAuth('JWT-auth')
  @Roles('client')
  @Post()
  create(@Body() dto: CreateFavoriteDto, @CurrentUser() user: any) {
    return this.favoritesService.create(dto, user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('client')
  @Get('client/:clientId')
  findByClientId(@Param('clientId') clientId: string, @CurrentUser() user: any) {
    return this.favoritesService.findByClientId(+clientId, user);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('client')
  @Get('client/:clientId/worker/:workerId')
  findByClientAndWorker(
    @Param('clientId') clientId: string,
    @Param('workerId') workerId: string,
  ) {
    return this.favoritesService.findByClientAndWorker(+clientId, +workerId);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFavoriteDto) {
    return this.favoritesService.update(+id, dto);
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('client')
  @Delete('client/:clientId/worker/:workerId')
  removeByClientAndWorker(
    @Param('clientId') clientId: string,
    @Param('workerId') workerId: string,
    @CurrentUser() user: any,
  ) {
    return this.favoritesService.removeByClientAndWorker(+clientId, +workerId, user);
  }
}