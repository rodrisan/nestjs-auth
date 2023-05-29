import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductDates1685373166801 implements MigrationInterface {
  name = 'AddProductDates1685373166801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
  }
}
