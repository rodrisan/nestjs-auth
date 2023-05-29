import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnRelationName1685375324290 implements MigrationInterface {
    name = 'UpdateColumnRelationName1685375324290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "customerId" TO "customer_id"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_c6c520dfb9a4d6dd749e73b13de" TO "UQ_c7bc1ffb56c570f42053fa7503b"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_c7bc1ffb56c570f42053fa7503b" TO "UQ_c6c520dfb9a4d6dd749e73b13de"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "customer_id" TO "customerId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
