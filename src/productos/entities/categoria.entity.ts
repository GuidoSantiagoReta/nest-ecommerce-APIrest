import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Producto } from './producto.entity'; 

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToMany(() => Producto, (producto) => producto.categorias)
  @JoinTable({
    name: 'productos_categorias',
    joinColumn:{
      name: 'categoria_id',
    },
    inverseJoinColumn: {
      name:'producto_id'
    }
  }
  ) // Solo tiene que estar en un lado de la relación
  productos: Producto[];
}

