import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { CurrentUser } from '../auth/decorators/current-user.decorators';

@Controller('favorites')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Roles('client')
  @Post()
  create(@Body() dto: CreateFavoriteDto, @CurrentUser() user: any) {
    return this.favoritesService.create(dto, user.id);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Roles('client')
  @Get('client/:clientId')
  findByClientId(@Param('clientId') clientId: string, @CurrentUser() user: any) {
    return this.favoritesService.findByClientId(+clientId, user);
  }

  @Roles('client')
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