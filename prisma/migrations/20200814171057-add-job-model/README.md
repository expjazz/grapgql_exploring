# Migration `20200814171057-add-job-model`

This migration has been generated by Expedito Andrade at 8/14/2020, 2:10:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Job" (
"id" SERIAL,
"start" text  NOT NULL ,
"finish" text   ,
"curriculumId" integer  NOT NULL ,
PRIMARY KEY ("id"))

ALTER TABLE "public"."Job" ADD FOREIGN KEY ("curriculumId")REFERENCES "public"."Curriculum"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200814145045-add-password-to-user..20200814171057-add-job-model
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -26,10 +26,19 @@
   id Int @id @default(autoincrement())
   aboutMe String
   candidate User @relation(fields: [candidateId], references: [id])
   candidateId Int
+  pastJobs Job[]
 }
+model Job {
+  id Int @id @default(autoincrement())
+  start String
+  finish String?
+  curriculum Curriculum @relation(fields: [curriculumId], references: [id])
+  curriculumId Int
+}
+
 model Profile {
   bio String?
   address String?
   contactNumber String?
```


