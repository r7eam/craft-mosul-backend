import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  create(dto: CreateReviewDto) {
    const review = this.reviewsRepository.create(dto);
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