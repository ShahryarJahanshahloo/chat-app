/*
  Warnings:

  - The `createdAt` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnConversations" DROP CONSTRAINT "UsersOnConversations_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnConversations" DROP CONSTRAINT "UsersOnConversations_userId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "UsersOnConversations" ADD CONSTRAINT "UsersOnConversations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnConversations" ADD CONSTRAINT "UsersOnConversations_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
