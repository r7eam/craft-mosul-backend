import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfessionsService } from './professions.service';
import { CreateProfessionDto } from './dto/create-professions.dto';
import { UpdateProfessionDto } from './dto/update-professions.dto';

@Controller('professions')
export class ProfessionsController {
  constructor(private readonly professionsService: ProfessionsService) {}

  @Post()
  create(@Body() dto: CreateProfessionDto) {
    return this.professionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.professionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProfessionDto) {
    return this.professionsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionsService.remove(+id);
  }
}