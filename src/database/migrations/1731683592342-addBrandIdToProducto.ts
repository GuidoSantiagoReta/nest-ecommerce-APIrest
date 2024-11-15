import {MigrationInterface, QueryRunner} from "typeorm";

export class addBrandIdToProducto1731683592342 implements MigrationInterface {
    name = 'addBrandIdToProducto1731683592342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75"`);
        await queryRunner.query(`ALTER TABLE "producto" RENAME COLUMN "fabricanteId" TO "brand_id"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME COLUMN "compradorId" TO "comprador_id"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME CONSTRAINT "UQ_9a6bd793b4f149fb11d8692ed75" TO "UQ_f2c59774661db02f747afa2e01f"`);
        await queryRunner.query(`CREATE TABLE "productos_categorias" ("categoria_id" integer NOT NULL, "producto_id" integer NOT NULL, CONSTRAINT "PK_9086c59de4955743f5575f52bb4" PRIMARY KEY ("categoria_id", "producto_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f61bc079f9cb009e4319face80" ON "productos_categorias" ("categoria_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f7e8213e5f76aea1385c4c1a5" ON "productos_categorias" ("producto_id") `);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_6c4c95a940b61bf128d3331562e" FOREIGN KEY ("brand_id") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "FK_f2c59774661db02f747afa2e01f" FOREIGN KEY ("comprador_id") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productos_categorias" ADD CONSTRAINT "FK_f61bc079f9cb009e4319face80a" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "productos_categorias" ADD CONSTRAINT "FK_0f7e8213e5f76aea1385c4c1a57" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productos_categorias" DROP CONSTRAINT "FK_0f7e8213e5f76aea1385c4c1a57"`);
        await queryRunner.query(`ALTER TABLE "productos_categorias" DROP CONSTRAINT "FK_f61bc079f9cb009e4319face80a"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "FK_f2c59774661db02f747afa2e01f"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_6c4c95a940b61bf128d3331562e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f7e8213e5f76aea1385c4c1a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f61bc079f9cb009e4319face80"`);
        await queryRunner.query(`DROP TABLE "productos_categorias"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME CONSTRAINT "UQ_f2c59774661db02f747afa2e01f" TO "UQ_9a6bd793b4f149fb11d8692ed75"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME COLUMN "comprador_id" TO "compradorId"`);
        await queryRunner.query(`ALTER TABLE "producto" RENAME COLUMN "brand_id" TO "fabricanteId"`);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5" FOREIGN KEY ("fabricanteId") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
