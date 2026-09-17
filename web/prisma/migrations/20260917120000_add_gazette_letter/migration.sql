-- CreateTable
CREATE TABLE "gazette_letters" (
    "id" TEXT NOT NULL,
    "place" TEXT,
    "letter" TEXT NOT NULL,
    "email" TEXT,
    "status" TEXT NOT NULL DEFAULT 'unread',
    "reply" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gazette_letters_pkey" PRIMARY KEY ("id")
);
