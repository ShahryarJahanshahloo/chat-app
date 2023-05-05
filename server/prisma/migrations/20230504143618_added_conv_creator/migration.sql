/*
  Warnings:

  - You are about to drop the `_ConversationToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ConversationToUser" DROP CONSTRAINT "_ConversationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationToUser" DROP CONSTRAINT "_ConversationToUser_B_fkey";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ConversationToUser";

-- CreateTable
CREATE TABLE "UsersOnConversations" (
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnConversations_pkey" PRIMARY KEY ("userId","conversationId")
);

-- AddForeignKey
ALTER TABLE "UsersOnConversations" ADD CONSTRAINT "UsersOnConversations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnConversations" ADD CONSTRAINT "UsersOnConversations_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
