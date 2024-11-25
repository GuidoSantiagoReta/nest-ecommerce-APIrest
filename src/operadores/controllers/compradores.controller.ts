import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CompradoresService } from '../services/compradores.service';
import { CreateCompradorDto, UpdateCompradorDto } from '../dtos/comprador.dto';

@Controller('compradores')
export class CompradoresController {
  constructor(private readonly compradorService: CompradoresService) {}

  @Get()
  findAll() {
    return this.compradorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compradorService.findOne(id);
  }

  @Post()
  create(@Body() createCompradorDto: CreateCompradorDto) {
    return this.compradorService.create(createCompradorDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompradorDto: UpdateCompradorDto) {
    return this.compradorService.update(id, updateCompradorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compradorService.remove(id);
  }
}
