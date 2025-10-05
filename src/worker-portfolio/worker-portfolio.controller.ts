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
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { CurrentUser } from '../auth/decorators/current-user.decorators';

@Controller('worker-portfolio')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorkerPortfolioController {
  constructor(private readonly workerPortfolioService: WorkerPortfolioService) {}

  @Roles('worker', 'admin')
  @Post()
  create(@Body() dto: CreateWorkerPortfolioDto, @CurrentUser() user: any) {
    return this.workerPortfolioService.create(dto, user);
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

  @Roles('worker', 'admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkerPortfolioDto, @CurrentUser() user: any) {
    return this.workerPortfolioService.update(+id, dto, user);
  }

  @Roles('worker', 'admin')
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.workerPortfolioService.remove(+id, user);
  }
}