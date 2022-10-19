import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // CREATE single User
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email_address: createUserDto.email_address },
    });

    if (existingUser) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: `Email address "${createUserDto.email_address}" already registered.`,
        element: 'email',
      });
    }

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  // READ all Users
  findAll() {
    return this.userRepository.find();
  }

  // READ single User by ID
  async findOneById(id: string) {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  // UPDATE single User by ID
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  // DELETE single User by ID
  async remove(id: string) {
    const user = await this.findOneById(id);
    return this.userRepository.remove(user);
  }
  
}
