import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';

@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService) {}

  // Método para obtener los pedidos de un operador por ID
  @Get(':id/pedidos')
  getOrders(@Param('id') id: string) { // Cambia el tipo a string
    return this.operadoresService.getOrderByUser(id);
  }
}
