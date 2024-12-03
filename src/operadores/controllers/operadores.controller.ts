import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { CreateOperadorDTO } from '../dtos/operador.dto';
import { Response } from 'express';

@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const operadores = await this.operadoresService.findAll();
    res.json(operadores);
  }

  @Post()
  async create(@Body() data: CreateOperadorDTO, @Res() res: Response) {
    const operador = await this.operadoresService.create(data);
    res.status(201).json(operador);
  }

  @Get(':id/pedidos')
  async getOrders(@Param('id') id: string, @Res() res: Response) {
    const pedido = await this.operadoresService.getOrderByUser(id);
    res.json(pedido);
  }
}


