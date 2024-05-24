import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User } from './user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('UserController', () => {
  let userController: UserController;
  let usersService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(new User()),
            create: jest.fn().mockResolvedValue(new User()),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            remove: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    usersService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [new User()];
      jest.spyOn(usersService, 'findAll').mockResolvedValue(result);

      expect(await userController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = new User();
      jest.spyOn(usersService, 'findOne').mockResolvedValue(result);

      expect(await userController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const result = new User();
      jest.spyOn(usersService, 'create').mockResolvedValue(result);

      expect(await userController.create(new User())).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const result: UpdateResult = {
        affected: 1, raw: {},
        generatedMaps: []
      };
      jest.spyOn(usersService, 'update').mockResolvedValue(result);

      expect(await userController.update(1, new User())).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result: DeleteResult = { affected: 1, raw: {} };
      jest.spyOn(usersService, 'remove').mockResolvedValue(result);

      expect(await userController.remove(1)).toBe(result);
    });
  });
});
