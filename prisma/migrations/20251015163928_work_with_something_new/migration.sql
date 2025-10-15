/*
  Warnings:

  - A unique constraint covering the columns `[email_config_id]` on the table `settings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cloud_config_id]` on the table `settings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "settings_email_config_id_key" ON "settings"("email_config_id");

-- CreateIndex
CREATE UNIQUE INDEX "settings_cloud_config_id_key" ON "settings"("cloud_config_id");
