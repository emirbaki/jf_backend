-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT,
    "followerCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tweet" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tweetUrl" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "retweetCount" INTEGER NOT NULL DEFAULT 0,
    "replyCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "quoteCount" INTEGER NOT NULL DEFAULT 0,
    "bookmarkCount" INTEGER NOT NULL DEFAULT 0,
    "embedding" BYTEA,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FactCheck" (
    "id" TEXT NOT NULL,
    "tweetId" TEXT NOT NULL,
    "isTrue" BOOLEAN NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FactCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Source_username_key" ON "Source"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Tweet_tweetUrl_key" ON "Tweet"("tweetUrl");

-- CreateIndex
CREATE UNIQUE INDEX "FactCheck_tweetId_key" ON "FactCheck"("tweetId");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactCheck" ADD CONSTRAINT "FactCheck_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
