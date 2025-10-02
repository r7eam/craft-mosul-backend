import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Neighborhood } from './entities/neighborhoods.entity';
import { CreateNeighborhoodDto } from './dto/create-neighborhoods.dto';
import { UpdateNeighborhoodDto } from './dto/update-neighborhoods.dto';

@Injectable()
export class NeighborhoodsService {
  constructor(
    @InjectRepository(Neighborhood)
    private neighborhoodsRepository: Repository<Neighborhood>,
  ) {}

  create(dto: CreateNeighborhoodDto) {
    const neighborhood = this.neighborhoodsRepository.create(dto);
    return this.neighborhoodsRepository.save(neighborhood);
  }

  findAll() {
    return this.neighborhoodsRepository.find();
  }

  async findOne(id: number) {
    const neighborhood = await this.neighborhoodsRepository.findOneBy({ id });
    if (!neighborhood) throw new NotFoundException(`Neighborhood ${id} not found`);
    return neighborhood;
  }

  async update(id: number, dto: UpdateNeighborhoodDto) {
    const neighborhood = await this.findOne(id);
    Object.assign(neighborhood, dto);
    return this.neighborhoodsRepository.save(neighborhood);
  }

  async remove(id: number) {
    const neighborhood = await this.findOne(id);
    return this.neighborhoodsRepository.remove(neighborhood);
  }
}