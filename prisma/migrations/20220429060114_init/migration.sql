/*
  Warnings:

  - The primary key for the `HeaderInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "HeaderInfo" DROP CONSTRAINT "HeaderInfo_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "HeaderInfo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HeaderInfo_id_seq";
