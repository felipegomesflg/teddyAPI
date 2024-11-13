import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

const mockClientRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('ClientService', () => {
  let service: ClientService;
  let repository: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client), 
          useValue: mockClientRepository, 
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve all clients', async () => {
    const mockClients = [{ id: 1, name: 'Test', salary: 5000, company: 'Tech Solutions' }];
    jest.spyOn(repository, 'find').mockResolvedValue(mockClients);

    const clients = await service.findAll();
    expect(clients).toEqual(mockClients);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should throw an error when client is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrowError('Client with ID 1 not found');
  });
});
