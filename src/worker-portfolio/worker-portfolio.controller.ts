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
import { WorkerPortfolioService } from './worker-portfolio.service';
import { CreateWorkerPortfolioDto } from './dto/create-worker-portfolio.dto';
import { UpdateWorkerPortfolioDto } from './dto/update-worker-portfolio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('worker-portfolio')
@UseGuards(JwtAuthGuard)
export class WorkerPortfolioController {
  constructor(private readonly workerPortfolioService: WorkerPortfolioService) {}

  @Post()
  create(@Body() dto: CreateWorkerPortfolioDto) {
    return this.workerPortfolioService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.workerPortfolioService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerPortfolioService.findOne(+id);
  }

  @Public()
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