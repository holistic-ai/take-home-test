CREATE TABLE IF NOT EXISTS "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"filename" varchar(255) NOT NULL,
	"summary" varchar(2000)
);
