import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}