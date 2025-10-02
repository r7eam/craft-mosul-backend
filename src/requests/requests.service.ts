import { Injectable, NotFoundException } from '@nestjs/common';
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

  create(dto: CreateRequestDto) {
    const request = this.requestsRepository.create(dto);
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

  async update(id: number, dto: UpdateRequestDto) {
    const request = await this.findOne(id);
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