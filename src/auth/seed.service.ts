import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(private usersService: UsersService) {}

  async createAdminUser() {
    // Check if admin already exists
    const existingAdmin = await this.usersService.findByPhone('07700000000');
    if (existingAdmin) {
      console.log('Admin user already exists');
      return existingAdmin;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('rheem123', 10);
    
    const adminData = {
      name: 'Rheem nail',
      email: 'rheem@admin.com',
      phone: '07700000000',
      password: hashedPassword,
      role: 'admin' as const,
      neighborhood_id: undefined,
      profile_image: undefined,
    };

    const admin = await this.usersService.create(adminData);
    console.log('Admin user created successfully:', admin.name);
    return admin;
  }
}