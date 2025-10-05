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
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { FindWorkersQueryDto } from './dto/find-workers-query.dto';
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

// Configure multer for worker profile images
const workerProfileImageStorage = {
  storage: diskStorage({
    destination: './uploads/worker-profiles',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `worker-profile-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
};

@Controller('workers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Roles('worker', 'admin')
  @Post()
  create(@Body() dto: CreateWorkerDto) {
    return this.workersService.create(dto);
  }

  @Public()
  @Get()
  findAll(@Query() query: FindWorkersQueryDto) {
    return this.workersService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workersService.findOne(+id);
  }

  @Public()
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.workersService.findByUserId(+userId);
  }

  @Roles('worker', 'admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkerDto) {
    return this.workersService.update(+id, dto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workersService.remove(+id);
  }

  @Roles('worker', 'admin')
  @Post(':id/upload-profile-image')
  @UseInterceptors(FileInterceptor('image', workerProfileImageStorage))
  async uploadProfileImage(
    @Param('id') id: string,
    @UploadedFile() file: MulterFile,
    @CurrentUser() user: any,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // For workers, ensure they can only upload to their own profile
    if (user.role === 'worker') {
      const worker = await this.workersService.findByUserId(user.id);
      if (worker.id !== +id) {
        throw new BadRequestException('You can only upload your own profile image');
      }
    }

    const imageUrl = `/uploads/worker-profiles/${file.filename}`;
    
    // Update worker's profile_image in database
    await this.workersService.update(+id, { profile_image: imageUrl });

    return {
      message: 'Worker profile image uploaded successfully',
      profile_image: imageUrl,
    };
  }
}