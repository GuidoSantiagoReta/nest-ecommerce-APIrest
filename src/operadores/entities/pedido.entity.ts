import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Operador } from './operador.entity';
import { Comprador } from './comprador.entity';
import { DetallePedido } from './detallePedido.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  updateAt: Date;

  @ManyToOne(() => Operador, (operador) => operador.pedidos)
  operador: Operador;

  @ManyToOne(() => Comprador, (comprador) => comprador.pedidos)
  comprador: Comprador;

  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
  detalles: DetallePedido[];
}




  