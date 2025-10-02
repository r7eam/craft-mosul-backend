import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkerPortfolioService } from './worker-portfolio.service';
import { CreateWorkerPortfolioDto } from './dto/create-worker-portfolio.dto';
import { UpdateWorkerPortfolioDto } from './dto/update-worker-portfolio.dto';

@Controller('worker-portfolio')
export class WorkerPortfolioController {
  constructor(private readonly workerPortfolioService: WorkerPortfolioService) {}

  @Post()
  create(@Body() dto: CreateWorkerPortfolioDto) {
    return this.workerPortfolioService.create(dto);
  }

  @Get()
  findAll() {
    return this.workerPortfolioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerPortfolioService.findOne(+id);
  }

  @Get('worker/:workerId')
  findByWorkerId(@Param('workerId') workerId: string) {
    return this.workerPortfolioService.findByWorkerId(+workerId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkerPortfolioDto) {
    return this.workerPortfolioService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workerPortfolioService.remove(+id);
  }
}