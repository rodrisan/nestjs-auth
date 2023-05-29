import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRootEntity1685374822471 implements MigrationInterface {
    name = 'UpdateRootEntity1685374822471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "PK_133ec679a801fab5e070f73d3ea"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "PK_b0c437120b624da1034a81fc561"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "PK_b0c437120b624da1034a81fc561"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "PK_133ec679a801fab5e070f73d3ea"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
