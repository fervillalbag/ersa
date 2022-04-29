-- CreateTable
CREATE TABLE "HeaderInfo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT[],

    CONSTRAINT "HeaderInfo_pkey" PRIMARY KEY ("id")
);
