/*
  Warnings:

  - You are about to drop the column `public` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_conversationId_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "public",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Group";
