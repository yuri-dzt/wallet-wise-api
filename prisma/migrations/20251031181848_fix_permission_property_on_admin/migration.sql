/*
  Warnings:

  - You are about to alter the column `permission` on the `admins` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `admins` MODIFY `permission` BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
