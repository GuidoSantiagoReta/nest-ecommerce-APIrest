import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';

@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService) {}

  // Método para obtener los pedidos de un operador por ID
  @Get(':id/pedidos')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.getOrderByUser(id);
  }

}
