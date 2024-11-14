import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CompradoresService } from '../services/compradores.service';
import { CreateCompradorDto } from '../dtos/comprador.dto';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  constructor(private readonly compradorService: CompradoresService) {}
  

  @Get()
  @ApiOperation({ summary: 'Obtener todos los compradores' })
  async findAll() {
    return this.compradorService.findAll();
  }

  
  // Decorador y método para obtener un comprador por ID
  @Get(':idComprador')
  @ApiOperation({ summary: 'Obtener un comprador por su ID' })
  getComprador(@Param('idComprador') idComprador: string): string {
    return `El identificador del comprador es: ${idComprador}`;
  }

  // Decorador y método para crear un comprador
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo comprador' })
  async create(@Body() createCompradorDto: CreateCompradorDto) {
    return this.compradorService.create(createCompradorDto);
  }
  

  // Decorador y método para modificar un comprador
  @Put(':idComprador')
  @ApiOperation({ summary: 'Modificar un comprador existente' })
  updateComprador(
    @Param('idComprador') idComprador: string,
    @Body() body: any,
  ) {
    return {
      idComprador: idComprador,
      nombre: body.nombre,
      email: body.email,
    };
  }

  // Decorador y método para eliminar un comprador por ID
  @Delete(':idComprador')
  @ApiOperation({ summary: 'Eliminar un comprador por su ID' })
  deleteComprador(@Param('idComprador') idComprador: string): any {
    return {
      idComprador: idComprador,
      delete: true,
      count: 1,
    };
  }
}