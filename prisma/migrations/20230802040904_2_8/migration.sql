/*
  Warnings:

  - You are about to drop the column `status` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `paymentAmount` on the `PaymentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `PaymentDetails` table. All the data in the column will be lost.
  - Added the required column `amount_total` to the `PaymentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `PaymentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `PaymentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `PaymentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "PaymentDetails" DROP COLUMN "paymentAmount",
DROP COLUMN "paymentMethod",
ADD COLUMN     "amount_total" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
