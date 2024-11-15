import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { Fabricante } from './fabricante.entity';
import { Categoria } from './categoria.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;
  
  @Index()  //índice que permite encontrar datos rapidamente 
  @Column({ type: 'int' })
  precio: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 100 })
  origen: string;

  @Column({ type: 'varchar', length: 255 })
  imagen: string;

  @Exclude() //indica que la propiedad no sea incluida en la serialización
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  
  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => Fabricante, (fabricante) => fabricante.productos)
  @JoinColumn({name: 'brand_id'})
  fabricante: Fabricante;

  @ManyToMany(() => Categoria, (categoria) => categoria.productos)
  categorias: Categoria[];
}
