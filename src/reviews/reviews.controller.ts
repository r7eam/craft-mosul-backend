import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorators';
import { CurrentUser } from '../auth/decorators/current-user.decorators';

@ApiTags('reviews')
@Controller('reviews')
@ApiBearerAuth('JWT-auth')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBearerAuth('JWT-auth')
  @Roles('client')
  @Post()
  create(@Body() dto: CreateReviewDto, @CurrentUser() user: any) {
    return this.reviewsService.create(dto, user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @Public()
  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @ApiBearerAuth('JWT-auth')
  @Public()
  @Get('worker/:workerId')
  findByWorkerId(@Param('workerId') workerId: string) {
    return this.reviewsService.findByWorkerId(+workerId);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('client', 'admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReviewDto, @CurrentUser() user: any) {
    return this.reviewsService.update(+id, dto, user);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('client', 'admin')
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.reviewsService.remove(+id, user);
  }
}