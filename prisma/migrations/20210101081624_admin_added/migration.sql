/*
  Warnings:

  - The migration will remove the values [admin] on the enum `Role`. If these variants are still used in the database, the migration will fail.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `String` to `Enum("Role")`.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('admin_1', 'admin_2', 'admin_3', 'borrower', 'lender');
ALTER TABLE "public"."users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "Role";
