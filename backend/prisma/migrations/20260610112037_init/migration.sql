-- CreateTable
CREATE TABLE "UserProfile" (
    "id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "purchased_category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Untitled Workspace',
    "query_tree" JSONB NOT NULL,
    "dataset_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserProfile_full_name_age_idx" ON "UserProfile"("full_name", "age");
