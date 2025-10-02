import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkerPortfolio } from './entities/worker-portfolio.entity';
import { CreateWorkerPortfolioDto } from './dto/create-worker-portfolio.dto';
import { UpdateWorkerPortfolioDto } from './dto/update-worker-portfolio.dto';

@Injectable()
export class WorkerPortfolioService {
  constructor(
    @InjectRepository(WorkerPortfolio)
    private workerPortfolioRepository: Repository<WorkerPortfolio>,
  ) {}

  create(dto: CreateWorkerPortfolioDto) {
    const portfolio = this.workerPortfolioRepository.create(dto);
    return this.workerPortfolioRepository.save(portfolio);
  }

  findAll() {
    return this.workerPortfolioRepository.find({
      relations: ['worker'],
    });
  }

  async findOne(id: number) {
    const portfolio = await this.workerPortfolioRepository.findOne({
      where: { id },
      relations: ['worker'],
    });
    if (!portfolio) throw new NotFoundException(`Portfolio ${id} not found`);
    return portfolio;
  }

  findByWorkerId(workerId: number) {
    return this.workerPortfolioRepository.find({
      where: { worker_id: workerId },
      relations: ['worker'],
    });
  }

  async update(id: number, dto: UpdateWorkerPortfolioDto) {
    const portfolio = await this.findOne(id);
    Object.assign(portfolio, dto);
    return this.workerPortfolioRepository.save(portfolio);
  }

  async remove(id: number) {
    const portfolio = await this.findOne(id);
    return this.workerPortfolioRepository.remove(portfolio);
  }
}