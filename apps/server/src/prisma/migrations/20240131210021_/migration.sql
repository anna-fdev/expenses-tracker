/*
  Warnings:

  - You are about to drop the column `note` on the `Expense` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "note",
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);
