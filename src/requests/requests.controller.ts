import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorators';
import { CurrentUser } from '../auth/decorators/current-user.decorators';

@Controller('requests')
@ApiBearerAuth('JWT-auth')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() dto: CreateRequestDto, @CurrentUser() user: any) {
    return this.requestsService.create(dto, user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @Public()
  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @ApiBearerAuth('JWT-auth')
  @Public()
  @Get('client/:clientId')
  findByClientId(@Param('clientId') clientId: string) {
    return this.requestsService.findByClientId(+clientId);
  }

  @ApiBearerAuth('JWT-auth')
  @Public()
  @Get('worker/:workerId')
  findByWorkerId(@Param('workerId') workerId: string) {
    return this.requestsService.findByWorkerId(+workerId);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('client', 'worker')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRequestDto, @CurrentUser() user: any) {
    return this.requestsService.update(+id, dto, user);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('client', 'worker', 'admin')
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateRequestStatusDto, @CurrentUser() user: any) {
    return this.requestsService.updateStatus(+id, dto, user);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('client', 'admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}