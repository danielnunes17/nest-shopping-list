import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

describe('ItemController', () => {
  let itemController: ItemController;
  let itemService: ItemService;

  const intemsEntityList: Item[] = [
    new Item({ name: 'teste', description: 'descrição qq', quantity: 1 }),
    new Item({ name: 'teste2', description: 'descrição qq2', quantity: 2 }),
  ];

  const newItemEntity = new Item({
    name: 'teste',
    description: 'negócio',
    quantity: 1,
  });

  const itemUpdateEntity = new Item({
    name: 'teste',
    description: 'negócio',
    quantity: 3,
  });

  const itemDeleteEntity = new Item({
    name: 'teste',
    description: 'descrição',
    quantity: 5,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: ItemService,
          useValue: {
            create: jest.fn().mockResolvedValue(newItemEntity),
            findAll: jest.fn().mockResolvedValue(intemsEntityList),
            findOne: jest.fn().mockResolvedValue(intemsEntityList[0]),
            update: jest.fn().mockResolvedValue(itemUpdateEntity),
            remove: jest.fn().mockResolvedValue(itemDeleteEntity),
          },
        },
      ],
    }).compile();

    itemController = module.get<ItemController>(ItemController);
    itemService = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(itemController).toBeDefined();
    expect(itemService).toBeDefined();
  });

  describe('findtAll', () => {
    //Arrange
    it('should return all items entity successfully', async () => {
      const result = await itemController.findAll();
      //Act
      expect(result).toEqual(intemsEntityList);
      expect(typeof result).toEqual('object');
      expect(itemService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  it('should throw an error exception', () => {
    //Arranje
    jest.spyOn(itemService, 'findAll').mockRejectedValueOnce(new Error());
    //Assert
    expect(itemController.findAll()).rejects.toThrowError();
  });

  describe('create', () => {
    //Arrange
    it('should return new item entity successfully', async () => {
      const body: CreateItemDto = {
        name: 'teste',
        description: 'negócio',
        quantity: 1,
      };
      //Act
      const result = await itemController.create(body);
      //Assert
      expect(result).toEqual(newItemEntity);
      expect(itemService.create).toHaveBeenCalledTimes(1);
      expect(itemService.create).toHaveBeenCalledWith(body);
    });
    it('should throw an error exception', () => {
      //Arrange
      const body: CreateItemDto = {
        name: 'teste',
        description: 'negócio',
        quantity: 1,
      };
      jest.spyOn(itemService, 'create').mockRejectedValueOnce(new Error());
      //Assert
      expect(itemController.create(body)).rejects.toThrowError();
    });
  });
  describe('findOne', () => {
    //Act
    it('should return one item entity successfully', async () => {
      const result = await itemController.findOne('1');
      //Assert
      expect(result).toEqual(intemsEntityList[0]);
      expect(typeof result).toEqual('object');
      expect(itemService.findOne).toHaveBeenCalledTimes(1);
      expect(itemService.findOne).toHaveBeenCalledWith('1');
    });
    it('should throw an error exception', () => {
      //Arranje
      jest.spyOn(itemService, 'findOne').mockRejectedValueOnce(new Error());
      //Assert
      expect(itemController.findOne('2')).rejects.toThrowError();
    });
  });
  describe('update', () => {
    //Arranje
    const body: UpdateItemDto = {
      name: 'teste',
      description: 'negócio',
      quantity: 3,
    };
    //Act
    it('should return update item entity successfully', async () => {
      const result = await itemController.update('1', body);
      //Assert
      expect(result).toEqual(itemUpdateEntity);
      expect(typeof result).toEqual('object');
      expect(itemService.update).toHaveBeenCalledTimes(1);
      expect(itemService.update).toHaveBeenCalledWith('1', body);
    });
    it('should throw an error exception', () => {
      //Arranje
      jest.spyOn(itemService, 'update').mockRejectedValueOnce(new Error());
      //Assert
      expect(itemController.update('1', body)).rejects.toThrowError();
    });
  });
  describe('delete', () => {
    //Act
    it('should return delete item entity successfully', async () => {
      const result = await itemController.remove('1');
      //Assert
      expect(result).toEqual(itemDeleteEntity);
      expect(typeof result).toEqual('object');
      expect(itemService.remove).toHaveBeenCalledTimes(1);
      expect(itemService.remove).toHaveBeenCalledWith('1');
    });
    it('should throw an error exception', () => {
      //Arranje
      jest.spyOn(itemService, 'remove').mockRejectedValueOnce(new Error());
      //Assert
      expect(itemController.remove('1')).rejects.toThrowError();
    });
  });
});
