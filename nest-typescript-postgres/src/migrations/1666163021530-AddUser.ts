import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUser1666163021530 implements MigrationInterface {
    name = 'AddUser1666163021530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email_address" character varying(256) NOT NULL, "password" character varying(256) NOT NULL, "first_name" character varying(128), "last_name" character varying(128), CONSTRAINT "UQ_a8979f71f59cb66a8b03bde38c1" UNIQUE ("email_address"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
