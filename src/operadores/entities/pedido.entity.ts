import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Operador } from './operador.entity';
import { Comprador } from './comprador.entity';
import { DetallePedido } from './detallePedido.entity';
import { Exclude, Expose } from 'class-transformer';

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

  @Exclude()
  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
  detalles: DetallePedido[];

  /*métodos que permiten que las propiedades calculadas product y total sean visibles 
  cuando una instancia de Pedido se serializa, para exponer los datos sin almacenarlos 
  en la base de datos */ 

  @Expose()
  get product(){
    if (this.detalles){
      return this.detalles
      .filter((detalle)=> !!detalle)
      .map((detalle) => ({
        ...detalle.producto,
        cantidad: detalle.cantidad
      }));
    }
    return [];
  }
  
  @Expose()
  get total(){
    if (this.detalles){
      return this.detalles
      .filter((detalle) => !!detalle)
      .reduce((total, detalle) => {
        const totalDetalle = detalle.producto.precio * detalle.cantidad; 
        return total + totalDetalle;
       
      },0
    );
    }
    return 0;
  }

}




  