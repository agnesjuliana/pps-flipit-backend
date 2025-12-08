/*
  Warnings:

  - A unique constraint covering the columns `[flashcardItemId,playId]` on the table `PlayResult` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlayResult_flashcardItemId_playId_key" ON "PlayResult"("flashcardItemId", "playId");
