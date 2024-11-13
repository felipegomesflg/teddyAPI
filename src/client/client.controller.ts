import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LogService } from '../log.service';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly logService: LogService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'Client successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    this.logService.log(`POST /clients - Request Body: ${JSON.stringify(createClientDto)}`);
    try {
      const client = await this.clientService.create(createClientDto);
      this.logService.log(`POST /clients - Response: ${JSON.stringify(client)}`);
      return client;
    } catch (error) {
      this.logService.log(`POST /clients - Error: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all clients' })
  @ApiResponse({ status: 200, description: 'List of all clients.' })
  async findAll(): Promise<Client[]> {
    this.logService.log('GET /clients');
    try {
      const clients = await this.clientService.findAll();
      this.logService.log(`GET /clients - Response: ${JSON.stringify(clients)}`);
      return clients;
    } catch (error) {
      this.logService.log(`GET /clients - Error: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a client by ID' })
  @ApiParam({ name: 'id', description: 'ID of the client', example: 1 })
  @ApiResponse({ status: 200, description: 'Client found.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  async findOne(@Param('id') id: number): Promise<Client> {
    this.logService.log(`GET /clients/${id}`);
    try {
      const client = await this.clientService.findOne(id);
      this.logService.log(`GET /clients/${id} - Response: ${JSON.stringify(client)}`);
      return client;
    } catch (error) {
      this.logService.log(`GET /clients/${id} - Error: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a client by ID' })
  @ApiParam({ name: 'id', description: 'ID of the client to update', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Client successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateClientDto: Partial<CreateClientDto>,
  ): Promise<Client> {
    this.logService.log(`PATCH /clients/${id} - Request Body: ${JSON.stringify(updateClientDto)}`);
    try {
      const client = await this.clientService.update(id, updateClientDto);
      this.logService.log(`PATCH /clients/${id} - Response: ${JSON.stringify(client)}`);
      return client;
    } catch (error) {
      this.logService.log(`PATCH /clients/${id} - Error: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a client by ID' })
  @ApiParam({ name: 'id', description: 'ID of the client to delete', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Client successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    this.logService.log(`DELETE /clients/${id}`);
    try {
      const success = await this.clientService.remove(id);
      this.logService.log(`DELETE /clients/${id} - Response: { success: ${success} }`);
      return { message: `Client with ID ${id} successfully deleted.` };
    } catch (error) {
      this.logService.log(`DELETE /clients/${id} - Error: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
