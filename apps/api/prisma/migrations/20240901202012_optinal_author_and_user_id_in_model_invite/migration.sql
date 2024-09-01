-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_user_id_fkey";

-- AlterTable
ALTER TABLE "invites" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
