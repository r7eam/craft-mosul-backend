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
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { CurrentUser } from '../auth/decorators/current-user.decorators';

@Controller('requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Roles('client')
  @Post()
  create(@Body() dto: CreateRequestDto, @CurrentUser() user: any) {
    return this.requestsService.create(dto, user.id);
  }

  @Public()
  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @Public()
  @Get('client/:clientId')
  findByClientId(@Param('clientId') clientId: string) {
    return this.requestsService.findByClientId(+clientId);
  }

  @Public()
  @Get('worker/:workerId')
  findByWorkerId(@Param('workerId') workerId: string) {
    return this.requestsService.findByWorkerId(+workerId);
  }

  @Roles('client', 'worker')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRequestDto, @CurrentUser() user: any) {
    return this.requestsService.update(+id, dto, user);
  }

  @Roles('client', 'worker', 'admin')
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateRequestStatusDto, @CurrentUser() user: any) {
    return this.requestsService.updateStatus(+id, dto, user);
  }

  @Roles('client', 'admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}