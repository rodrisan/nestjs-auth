import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameManyToManyTable1685383135628 implements MigrationInterface {
    name = 'RenameManyToManyTable1685383135628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_40e7da0284a5389344605de8dab"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_e1d833224b5be535323207473f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_40e7da0284a5389344605de8da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1d833224b5be535323207473f"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "PK_8fd95511a998d598ff66d500933"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "PK_e1d833224b5be535323207473f1" PRIMARY KEY ("categoriesId")`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP COLUMN "productsId"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "PK_e1d833224b5be535323207473f1"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP COLUMN "categoriesId"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD "products" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "PK_1ac9328f76a54cd7e48e34f8b42" PRIMARY KEY ("products")`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD "categories" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "PK_1ac9328f76a54cd7e48e34f8b42"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "PK_d3f9de218a2b6d345c0d7d03fe5" PRIMARY KEY ("products", "categories")`);
        await queryRunner.query(`CREATE INDEX "IDX_1ac9328f76a54cd7e48e34f8b4" ON "products_categories_categories" ("products") `);
        await queryRunner.query(`CREATE INDEX "IDX_3fd520c5ca492c549db21fa700" ON "products_categories_categories" ("categories") `);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_1ac9328f76a54cd7e48e34f8b42" FOREIGN KEY ("products") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_3fd520c5ca492c549db21fa7000" FOREIGN KEY ("categories") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_3fd520c5ca492c549db21fa7000"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_1ac9328f76a54cd7e48e34f8b42"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3fd520c5ca492c549db21fa700"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ac9328f76a54cd7e48e34f8b4"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "PK_d3f9de218a2b6d345c0d7d03fe5"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "PK_1ac9328f76a54cd7e48e34f8b42" PRIMARY KEY ("products")`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP COLUMN "categories"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "PK_1ac9328f76a54cd7e48e34f8b42"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP COLUMN "products"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD "categoriesId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "PK_e1d833224b5be535323207473f1" PRIMARY KEY ("categoriesId")`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD "productsId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "PK_e1d833224b5be535323207473f1"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "PK_8fd95511a998d598ff66d500933" PRIMARY KEY ("productsId", "categoriesId")`);
        await queryRunner.query(`CREATE INDEX "IDX_e1d833224b5be535323207473f" ON "products_categories_categories" ("categoriesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_40e7da0284a5389344605de8da" ON "products_categories_categories" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_e1d833224b5be535323207473f1" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_40e7da0284a5389344605de8dab" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
