import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1724665830596 implements MigrationInterface {
  name = 'Init1724665830596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "payment" (
                "created_utc" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL,
                "updated_utc" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_by" character varying,
                "deleted_utc" TIMESTAMP,
                "deleted_by" character varying,
                "id" uuid NOT NULL,
                "name" character varying(200) NOT NULL,
                "user_id" character varying NOT NULL,
                "event_id" character varying NOT NULL,
                "amount" numeric(6, 2) NOT NULL,
                CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "created_utc" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL,
                "updated_utc" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_by" character varying,
                "deleted_utc" TIMESTAMP,
                "deleted_by" character varying,
                "id" uuid NOT NULL,
                "name" character varying(200) NOT NULL,
                "first_name" character varying(200) NOT NULL,
                "last_name" character varying(200) NOT NULL,
                "email" character varying(50) NOT NULL,
                CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "locale" (
                "id" uuid NOT NULL,
                "name" character varying(200) NOT NULL,
                CONSTRAINT "UQ_a228fc2e2eea07da9355df2690a" UNIQUE ("name"),
                CONSTRAINT "PK_4b7a3ebe8ec48f1bb2c4b80e349" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "notification" (
                "created_utc" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL,
                "updated_utc" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_by" character varying,
                "deleted_utc" TIMESTAMP,
                "deleted_by" character varying,
                "id" uuid NOT NULL,
                "title" character varying NOT NULL,
                "body" character varying NOT NULL,
                "from" TIMESTAMP NOT NULL,
                "to" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "application" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "link" character varying NOT NULL,
                CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "notification" DROP COLUMN "title"
        `);
    await queryRunner.query(`
            ALTER TABLE "notification" DROP COLUMN "body"
        `);
    await queryRunner.query(`
            ALTER TABLE "notification" DROP COLUMN "from"
        `);
    await queryRunner.query(`
            ALTER TABLE "notification" DROP COLUMN "to"
        `);
    await queryRunner.query(`
            ALTER TABLE "notification"
            ADD "title" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "notification"
            ADD "body" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "notification"
            ADD "from" TIMESTAMP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "notification"
            ADD "to" TIMESTAMP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "notification"
            ADD "name" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "notification"
            ADD "description" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "notification"
            ADD "start" TIMESTAMP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "notification"
            ADD "end" TIMESTAMP NOT NULL
        `);
    await queryRunner.query(`
            INSERT INTO locale (id, name)
                VALUES ('abc22573-96aa-4582-9157-391b135e9fea', 'Russian (RU)');
            INSERT INTO locale (id, name)
                VALUES ('5ba940fb-1cfb-4794-aa82-5bb4dad2795f', 'English (US)');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "notification" DROP COLUMN "end"
        `);
    await queryRunner.query(`
            ALTER TABLE "notification" DROP COLUMN "start"
        `);
    await queryRunner.query(`
            ALTER TABLE "notification" DROP COLUMN "description"
        `);
    await queryRunner.query(`
            ALTER TABLE "notification" DROP COLUMN "name"
        `);
    await queryRunner.query(`
            ALTER TABLE "notification" DROP COLUMN "to"
        `);
    await queryRunner.query(`
            ALTER TABLE "notification" DROP COLUMN "from"
        `);
    await queryRunner.query(`
            ALTER TABLE "notification" DROP COLUMN "body"
        `);
    await queryRunner.query(`
            ALTER TABLE "notification" DROP COLUMN "title"
        `);
    await queryRunner.query(`
            ALTER TABLE "notification"
            ADD "to" TIMESTAMP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "notification"
            ADD "from" TIMESTAMP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "notification"
            ADD "body" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "notification"
            ADD "title" character varying NOT NULL
        `);
    await queryRunner.query(`
            DROP TABLE "application"
        `);
    await queryRunner.query(`
            DROP TABLE "notification"
        `);
    await queryRunner.query(`
            DROP TABLE "locale"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "payment"
        `);
  }
}
