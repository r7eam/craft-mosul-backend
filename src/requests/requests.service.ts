import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
  ) {}

  create(dto: CreateRequestDto, clientId: number) {
    const request = this.requestsRepository.create({
      ...dto,
      client_id: clientId, // Enforce client_id from JWT
      status: 'pending', // Force initial status
    });
    return this.requestsRepository.save(request);
  }

  findAll() {
    return this.requestsRepository.find({
      relations: ['client', 'worker'],
    });
  }

  async findOne(id: number) {
    const request = await this.requestsRepository.findOne({
      where: { id },
      relations: ['client', 'worker'],
    });
    if (!request) throw new NotFoundException(`Request ${id} not found`);
    return request;
  }

  findByClientId(clientId: number) {
    return this.requestsRepository.find({
      where: { client_id: clientId },
      relations: ['client', 'worker'],
    });
  }

  findByWorkerId(workerId: number) {
    return this.requestsRepository.find({
      where: { worker_id: workerId },
      relations: ['client', 'worker'],
    });
  }

  async update(id: number, dto: UpdateRequestDto, user: any) {
    const request = await this.findOne(id);
    
    // Ownership check: client can modify their requests, worker can modify requests assigned to them
    if (user.role === 'client' && request.client_id !== user.id) {
      throw new ForbiddenException('You can only modify your own requests');
    }
    if (user.role === 'worker' && request.worker_id !== user.id) {
      throw new ForbiddenException('You can only modify requests assigned to you');
    }
    
    Object.assign(request, dto);
    
    // Set completed_at when status changes to completed
    if (dto.status === 'completed') {
      request.completed_at = new Date();
    }
    
    return this.requestsRepository.save(request);
  }

  async remove(id: number) {
    const request = await this.findOne(id);
    return this.requestsRepository.remove(request);
  }
}