import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Fabricante } from './fabricante.entity';
@Entity()
export class Producto {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'varchar', length: 255, unique: true }) nombre: string;
  @Column({ type: 'text' }) descripcion: string;
  @Column({ type: 'int' }) precio: number;
  @Column({ type: 'int' }) stock: number;
  @Column({ type: 'varchar', length: 100 }) origen: string;
  @Column({ type: 'varchar', length: 255 }) imagen: string;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
  @ManyToOne(() => Fabricante, (fabricante) => fabricante.productos)
  fabricante: Fabricante;
}
