import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) { }
  create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  findOne(id: string): Promise<Item> {
    return this.itemRepository.findOne(id);
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.itemRepository.preload({
      id: id,
      ...updateItemDto,
    });
    if (!item) {
      throw new NotFoundException(`Item ${item}not found`);
    }
    return this.itemRepository.save(item);
  }
  async remove(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne(id);
    return this.itemRepository.remove(item);
  }
}
