/*
  Warnings:

  - You are about to drop the column `bankAccountId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `bankAccountNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_bankAccountId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "bankAccountId",
ADD COLUMN     "bankAccountNumber" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bankAccountNumber_fkey" FOREIGN KEY ("bankAccountNumber") REFERENCES "BankAccount"("bankAccountNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
