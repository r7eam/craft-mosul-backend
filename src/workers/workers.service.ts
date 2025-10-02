import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkersService {
  constructor(
    @InjectRepository(Worker)
    private workersRepository: Repository<Worker>,
  ) {}

  create(dto: CreateWorkerDto) {
    const worker = this.workersRepository.create(dto);
    return this.workersRepository.save(worker);
  }

  findAll() {
    return this.workersRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const worker = await this.workersRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!worker) throw new NotFoundException(`Worker ${id} not found`);
    return worker;
  }

  async findByUserId(userId: number) {
    const worker = await this.workersRepository.findOne({
      where: { user_id: userId },
      relations: ['user'],
    });
    if (!worker) throw new NotFoundException(`Worker with user_id ${userId} not found`);
    return worker;
  }

  async update(id: number, dto: UpdateWorkerDto) {
    const worker = await this.findOne(id);
    Object.assign(worker, dto);
    return this.workersRepository.save(worker);
  }

  async remove(id: number) {
    const worker = await this.findOne(id);
    return this.workersRepository.remove(worker);
  }
}