import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Comprador } from './comprador.entity';
import { Pedido } from './pedido.entity';

@Entity()
export class Operador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  role: string;

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

  @OneToMany(() => Pedido, (pedido) => pedido.operador)
  pedidos: Pedido[];

  @OneToOne(() => Comprador, (comprador) => comprador.operador, {
    nullable: true,
  })
  @JoinColumn({ name: 'compradorId' })
  comprador: Comprador;

  @Column({ name: 'compradorId', nullable: true })
  compradorId: number;
}

