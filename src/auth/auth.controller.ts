import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Patch,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SeedService } from './seed.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorators';
import { Public } from './decorators/public.decorator';

@ApiTags('auth')
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private seedService: SeedService,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @ApiBody({
    description: 'Registration data',
    type: RegisterDto,
    examples: {
      client: {
        summary: 'Client Registration',
        description: 'Register a new client user',
        value: {
          name: 'أحمد علي محمد',
          email: 'ahmed@example.com',
          phone: '07901234567',
          password: 'password123',
          role: 'client',
          neighborhood_id: 1
        }
      },
      worker: {
        summary: 'Worker Registration',
        description: 'Register a new worker user',
        value: {
          name: 'محمد حسن علي',
          email: 'mohammed@example.com',
          phone: '07901234568',
          password: 'password123',
          role: 'worker',
          neighborhood_id: 1,
          profession_id: 1,
          bio: 'كهربائي محترف مع خبرة 5 سنوات في صيانة وتركيب الأجهزة الكهربائية',
          experience_years: 5,
          contact_phone: '07901234568',
          whatsapp_number: '07901234568'
        }
      }
    }
  })
  @ApiBearerAuth('JWT-auth')
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful, returns JWT token' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({
    description: 'Login credentials',
    type: LoginDto,
    examples: {
      phoneLogin: {
        summary: 'Login with Phone',
        description: 'Login using phone number and password',
        value: {
          phone: '07901234567',
          password: 'password123'
        }
      },
      emailLogin: {
        summary: 'Login with Email',
        description: 'Login using email and password',
        value: {
          email: 'mohammed@example.com',
          password: 'password123'
        }
      }
    }
  })
  @ApiBearerAuth('JWT-auth')
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Create admin user (for initial setup)' })
  @ApiResponse({ status: 201, description: 'Admin user created successfully' })
  @ApiBearerAuth('JWT-auth')
  @Public()
  @Post('seed-admin')
  async seedAdmin() {
    return this.seedService.createAdminUser();
  }

  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return this.authService.getProfile(user.id);
  }

  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 401, description: 'Current password is incorrect' })
  @ApiBody({
    description: 'Password change data',
    type: ChangePasswordDto,
    examples: {
      changePassword: {
        summary: 'Change Password',
        description: 'Change user password by providing current and new password',
        value: {
          currentPassword: 'oldpassword123',
          newPassword: 'newpassword456'
        }
      }
    }
  })
  @ApiBearerAuth('JWT-auth')
  @Patch('change-password')
  async changePassword(
    @CurrentUser() user: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(user.id, changePasswordDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    // Since we're using stateless JWT, logout is handled on the client side
    // by removing the token from storage
    return {
      message: 'Logout successful',
    };
  }
}