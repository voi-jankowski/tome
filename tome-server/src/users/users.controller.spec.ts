import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findOneByUsername: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'password',
        email: 'testuser@example.com',
      };
      const result: User = {
        id: 1,
        ...createUserDto,
        projects: [],
        categories: [],
        attributes: [],
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createUserDto)).toEqual(result);
    });
  });

  describe('findOneByUsername', () => {
    it('should return a user by username', async () => {
      const result: User = {
        id: 1,
        username: 'testuser',
        password: 'password',
        email: 'testuser@example.com',
        projects: [],
        categories: [],
        attributes: [],
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(service, 'findOneByUsername').mockResolvedValue(result);

      expect(await controller.findOneByUsername('testuser')).toEqual(result);
    });
  });

  describe('getProfile', () => {
    it('should return the profile of the logged-in user', async () => {
      const req = { user: { id: 1 } };
      const result: User = {
        id: 1,
        username: 'testuser',
        password: 'password',
        email: 'testuser@example.com',
        projects: [],
        categories: [],
        attributes: [],
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.getProfile(req)).toEqual(result);
    });
  });

  describe('updateProfile', () => {
    it('should update the profile of the logged-in user', async () => {
      const req = { user: { id: 1 } };
      const updateUserDto: UpdateUserDto = { username: 'updateduser' };
      const result: User = {
        id: 1,
        username: 'updateduser',
        password: 'password',
        email: 'testuser@example.com',
        projects: [],
        categories: [],
        attributes: [],
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.updateProfile(req, updateUserDto)).toEqual(
        result,
      );
    });
  });

  describe('removeProfile', () => {
    it('should remove the profile of the logged-in user', async () => {
      const req = { user: { id: 1 } };
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.removeProfile(req)).toBeUndefined();
    });
  });
});
