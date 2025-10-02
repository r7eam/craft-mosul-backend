import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  create(dto: CreateFavoriteDto) {
    const favorite = this.favoritesRepository.create(dto);
    return this.favoritesRepository.save(favorite);
  }

  findAll() {
    return this.favoritesRepository.find({
      relations: ['client', 'worker'],
    });
  }

  async findOne(id: number) {
    const favorite = await this.favoritesRepository.findOne({
      where: { id },
      relations: ['client', 'worker'],
    });
    if (!favorite) throw new NotFoundException(`Favorite ${id} not found`);
    return favorite;
  }

  findByClientId(clientId: number) {
    return this.favoritesRepository.find({
      where: { client_id: clientId },
      relations: ['client', 'worker'],
    });
  }

  async findByClientAndWorker(clientId: number, workerId: number) {
    return this.favoritesRepository.findOne({
      where: { client_id: clientId, worker_id: workerId },
      relations: ['client', 'worker'],
    });
  }

  async update(id: number, dto: UpdateFavoriteDto) {
    const favorite = await this.findOne(id);
    Object.assign(favorite, dto);
    return this.favoritesRepository.save(favorite);
  }

  async remove(id: number) {
    const favorite = await this.findOne(id);
    return this.favoritesRepository.remove(favorite);
  }

  async removeByClientAndWorker(clientId: number, workerId: number) {
    const favorite = await this.findByClientAndWorker(clientId, workerId);
    if (!favorite) throw new NotFoundException(`Favorite not found`);
    return this.favoritesRepository.remove(favorite);
  }
}