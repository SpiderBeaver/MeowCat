import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1614866373923 implements MigrationInterface {
    name = 'InitialMigration1614866373923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `passwordHash` varchar(255) NOT NULL, `avatar` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `text` varchar(320) NOT NULL, `createdAt` datetime NOT NULL, `userId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `post_likes_user` (`postId` int NOT NULL, `userId` int NOT NULL, INDEX `IDX_631290356ede4fcbb402128732` (`postId`), INDEX `IDX_ec7439ad132e39ffe77fba5fed` (`userId`), PRIMARY KEY (`postId`, `userId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_5c1cf55c308037b5aca1038a131` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post_likes_user` ADD CONSTRAINT `FK_631290356ede4fcbb4021287321` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post_likes_user` ADD CONSTRAINT `FK_ec7439ad132e39ffe77fba5fed9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post_likes_user` DROP FOREIGN KEY `FK_ec7439ad132e39ffe77fba5fed9`");
        await queryRunner.query("ALTER TABLE `post_likes_user` DROP FOREIGN KEY `FK_631290356ede4fcbb4021287321`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_5c1cf55c308037b5aca1038a131`");
        await queryRunner.query("DROP INDEX `IDX_ec7439ad132e39ffe77fba5fed` ON `post_likes_user`");
        await queryRunner.query("DROP INDEX `IDX_631290356ede4fcbb402128732` ON `post_likes_user`");
        await queryRunner.query("DROP TABLE `post_likes_user`");
        await queryRunner.query("DROP TABLE `post`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
