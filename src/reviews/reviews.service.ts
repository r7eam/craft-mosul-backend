import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Request } from '../requests/entities/request.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
  ) {}

  async create(dto: CreateReviewDto, clientId: number) {
    // Verify the request exists and is completed
    const request = await this.requestsRepository.findOne({
      where: { id: dto.request_id },
      relations: ['client', 'worker'],
    });
    
    if (!request) {
      throw new NotFoundException('Request not found');
    }
    
    if (request.status !== 'completed') {
      throw new BadRequestException('Can only review completed requests');
    }
    
    if (request.client_id !== clientId) {
      throw new ForbiddenException('You can only review your own requests');
    }
    
    // Check if review already exists for this request
    const existingReview = await this.reviewsRepository.findOne({
      where: { request_id: dto.request_id },
    });
    
    if (existingReview) {
      throw new BadRequestException('Review already exists for this request');
    }
    
    const review = this.reviewsRepository.create({
      ...dto,
      client_id: clientId, // Enforce client_id from JWT
    });
    
    return this.reviewsRepository.save(review);
  }

  findAll() {
    return this.reviewsRepository.find({
      relations: ['request', 'worker', 'client'],
    });
  }

  async findOne(id: number) {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['request', 'worker', 'client'],
    });
    if (!review) throw new NotFoundException(`Review ${id} not found`);
    return review;
  }

  findByWorkerId(workerId: number) {
    return this.reviewsRepository.find({
      where: { worker_id: workerId },
      relations: ['request', 'worker', 'client'],
    });
  }

  async update(id: number, dto: UpdateReviewDto) {
    const review = await this.findOne(id);
    Object.assign(review, dto);
    return this.reviewsRepository.save(review);
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    return this.reviewsRepository.remove(review);
  }
}