import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  const mockClientService = {
    create: jest.fn((dto) => {
      return { id: Date.now(), ...dto };
    }),
    findAll: jest.fn(() => {
      return [
        { id: 1, name: 'Test Client 1', salary: 5000, company: 'Tech Solutions' },
        { id: 2, name: 'Test Client 2', salary: 6000, company: 'InnovaTech' },
      ];
    }),
    findOne: jest.fn((id) => {
      if (id === 1) {
        return { id: 1, name: 'Test Client 1', salary: 5000, company: 'Tech Solutions' };
      }
      throw new Error(`Client with ID ${id} not found`);
    }),
    update: jest.fn((id, dto) => {
      return { id, ...dto };
    }),
    remove: jest.fn((id) => {
      return { message: `Client with ID ${id} successfully deleted.` };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: mockClientService, 
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const dto: CreateClientDto = { name: 'New Client', salary: 8000, company: 'New Corp' };
      const result = await controller.create(dto);

      expect(result).toEqual({
        id: expect.any(Number),
        ...dto,
      });
      expect(mockClientService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([
        { id: 1, name: 'Test Client 1', salary: 5000, company: 'Tech Solutions' },
        { id: 2, name: 'Test Client 2', salary: 6000, company: 'InnovaTech' },
      ]);
      expect(mockClientService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single client by ID', async () => {
      const result = await controller.findOne(1);

      expect(result).toEqual({
        id: 1,
        name: 'Test Client 1',
        salary: 5000,
        company: 'Tech Solutions',
      });
      expect(mockClientService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an error if client is not found', async () => {
      await expect(controller.findOne(999)).rejects.toThrow('Client with ID 999 not found');
      expect(mockClientService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const dto: Partial<CreateClientDto> = { name: 'Updated Client' };
      const result = await controller.update(1, dto);

      expect(result).toEqual({
        id: 1,
        ...dto,
      });
      expect(mockClientService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should delete a client', async () => {
      const result = await controller.remove(1);

      expect(result).toEqual({ message: 'Client with ID 1 successfully deleted.' });
      expect(mockClientService.remove).toHaveBeenCalledWith(1);
    });
  });
});
