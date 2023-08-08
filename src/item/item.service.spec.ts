import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from '../item/item.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

const intemsEntityList: Item[] = [
  new Item({ name: 'teste', description: 'descrição qq', quantity: 1 }),
  new Item({ name: 'teste2', description: 'descrição qq2', quantity: 2 }),
  new Item({ name: 'teste3', description: 'descrição qq3', quantity: 2 }),
];
describe('ItemService', () => {
  let itemService: ItemService;
  let itemRepository: Repository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: getRepositoryToken(Item),
          useValue: {
            findAll: jest.fn().mockResolvedValue(intemsEntityList),
            findOne: jest.fn().mockResolvedValue(intemsEntityList[0]),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    itemService = module.get<ItemService>(ItemService);
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });
  it('should be defined', () => {
    expect(itemService).toBeDefined();
    expect(itemRepository).toBeDefined();
  });
});
