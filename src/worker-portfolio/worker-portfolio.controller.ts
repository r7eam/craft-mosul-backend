import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { WorkerPortfolioService } from './worker-portfolio.service';
import { CreateWorkerPortfolioDto } from './dto/create-worker-portfolio.dto';
import { UpdateWorkerPortfolioDto } from './dto/update-worker-portfolio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { CurrentUser } from '../auth/decorators/current-user.decorators';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

// Configure multer for portfolio images
const portfolioImageStorage = {
  storage: diskStorage({
    destination: './uploads/portfolio',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `portfolio-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for portfolio images
  },
};

@ApiTags('worker-portfolio')
@Controller('worker-portfolio')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorkerPortfolioController {
  constructor(private readonly workerPortfolioService: WorkerPortfolioService) {}

  @ApiBearerAuth('JWT-auth')
  @Roles('worker', 'admin')
  @Post()
  create(@Body() dto: CreateWorkerPortfolioDto, @CurrentUser() user: any) {
    return this.workerPortfolioService.create(dto, user);
  }

  @ApiBearerAuth('JWT-auth')
  @Public()
  @Get()
  findAll() {
    return this.workerPortfolioService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerPortfolioService.findOne(+id);
  }

  @ApiBearerAuth('JWT-auth')
  @Public()
  @Get('worker/:workerId')
  findByWorkerId(@Param('workerId') workerId: string) {
    return this.workerPortfolioService.findByWorkerId(+workerId);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('worker', 'admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkerPortfolioDto, @CurrentUser() user: any) {
    return this.workerPortfolioService.update(+id, dto, user);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('worker', 'admin')
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.workerPortfolioService.remove(+id, user);
  }

  @ApiBearerAuth('JWT-auth')
  @Roles('worker', 'admin')
  @Post('upload-with-image')
  @UseInterceptors(FileInterceptor('image', portfolioImageStorage))
  async createWithImage(
    @Body() dto: Omit<CreateWorkerPortfolioDto, 'image_url'>,
    @UploadedFile() file: MulterFile,
    @CurrentUser() user: any,
  ) {
    if (!file) {
      throw new BadRequestException('No image file uploaded');
    }

    const imageUrl = `/uploads/portfolio/${file.filename}`;
    
    const portfolioDto: CreateWorkerPortfolioDto = {
      ...dto,
      worker_id: Number(dto.worker_id),
      image_url: imageUrl,
    };

    const portfolio = await this.workerPortfolioService.create(portfolioDto, user);

    return {
      ...portfolio,
      message: 'Portfolio item created with image successfully',
    };
  }
}