import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profession } from './entities/professions.entity';
import { CreateProfessionDto } from './dto/create-professions.dto';
import { UpdateProfessionDto } from './dto/update-professions.dto';

@Injectable()
export class ProfessionsService {
  constructor(
    @InjectRepository(Profession)
    private professionsRepository: Repository<Profession>,
  ) {}

  create(dto: CreateProfessionDto) {
    const profession = this.professionsRepository.create(dto);
    return this.professionsRepository.save(profession);
  }

  findAll() {
    return this.professionsRepository.find();
  }

  async findOne(id: number) {
    const profession = await this.professionsRepository.findOneBy({ id });
    if (!profession) throw new NotFoundException(`Profession ${id} not found`);
    return profession;
  }

  async update(id: number, dto: UpdateProfessionDto) {
    const profession = await this.findOne(id);
    Object.assign(profession, dto);
    return this.professionsRepository.save(profession);
  }

  async remove(id: number) {
    const profession = await this.findOne(id);
    return this.professionsRepository.remove(profession);
  }
}