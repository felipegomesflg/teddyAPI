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
import { ClientService } from '../services/client.service';
import { Client } from '../entities/client.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


export class ClientController {
  constructor(private readonly clientService: ClientService) {}


  async create(@Body() createClientDto: Client): Promise<Client> {
    try {
      return await this.clientService.create(createClientDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create client',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

 
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }


  async findOne(@Param('id') id: number): Promise<Client> {
    const client = await this.clientService.findOne(id);
    if (!client) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }
    return client;
  }

 
  async update(
    @Param('id') id: number,
    @Body() updateClientDto: Partial<Client>,
  ): Promise<Client> {
    const client = await this.clientService.update(id, updateClientDto);
    if (!client) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }
    return client;
  }

 
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    const success = await this.clientService.remove(id);
    if (success) {
      return { message: `Client with ID ${id} successfully deleted.` };
    }
  }
}