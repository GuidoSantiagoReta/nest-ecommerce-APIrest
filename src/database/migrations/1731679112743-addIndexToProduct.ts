import {MigrationInterface, QueryRunner} from "typeorm";

export class addIndexToProduct1731679112743 implements MigrationInterface {
    name = 'addIndexToProduct1731679112743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_c3bdec19983950497f2ff61589" ON "producto" ("precio") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c3bdec19983950497f2ff61589"`);
    }

}
