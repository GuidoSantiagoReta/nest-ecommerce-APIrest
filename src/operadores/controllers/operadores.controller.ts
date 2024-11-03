import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Operadores') //tags para swagger
@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los operadores' })
  findAll() {
    return this.operadoresService.findAll();
  }
  @Post()
  @ApiOperation({ summary: 'Crear un operador' })
  async createOne(@Body() createOperadorDto: CreateOperadorDTO) {
    return this.operadoresService.create(createOperadorDto);
  }

  @Get(':id/pedidos')
  @ApiOperation({ summary: 'Obtener los pedidos de un operador por ID' })
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.getOrderByUser(id);
  }

  @Get('tareas')
  @ApiOperation({ summary: 'Obtener todas las tareas de los operadores' })
  getTasks() {
    return this.operadoresService.getTasks();
  }
}
