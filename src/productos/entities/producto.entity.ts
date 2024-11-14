import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Fabricante } from './fabricante.entity';
import { Categoria } from './categoria.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'int' })
  precio: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 100 })
  origen: string;

  @Column({ type: 'varchar', length: 255 })
  imagen: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => Fabricante, (fabricante) => fabricante.productos)
  fabricante: Fabricante;

  @ManyToMany(() => Categoria, (categoria) => categoria.productos)
  categorias: Categoria[];
}
