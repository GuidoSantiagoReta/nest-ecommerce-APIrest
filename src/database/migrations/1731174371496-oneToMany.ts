import {MigrationInterface, QueryRunner} from "typeorm";

export class oneToMany1731174371496 implements MigrationInterface {
    name = 'oneToMany1731174371496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operador" DROP COLUMN "compradoId"`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "fabricanteId" integer`);
        await queryRunner.query(`ALTER TABLE "fabricante" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "fabricante" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "fabricante" ADD CONSTRAINT "UQ_86a08872e8e5ca25e9a069145e2" UNIQUE ("nombre")`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5" FOREIGN KEY ("fabricanteId") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5"`);
        await queryRunner.query(`ALTER TABLE "fabricante" DROP CONSTRAINT "UQ_86a08872e8e5ca25e9a069145e2"`);
        await queryRunner.query(`ALTER TABLE "fabricante" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "fabricante" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "fabricanteId"`);
        await queryRunner.query(`ALTER TABLE "operador" ADD "compradoId" integer`);
    }

}
