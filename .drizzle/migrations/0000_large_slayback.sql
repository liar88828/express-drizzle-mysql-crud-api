CREATE TABLE `blog_to_category` (
	`blog_id` int NOT NULL,
	`slug` varchar(25) NOT NULL,
	PRIMARY KEY(`blog_id`)
);
--> statement-breakpoint
CREATE TABLE `blogs` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(25) NOT NULL,
	`content` varchar(2000) NOT NULL,
	`thumbnail` varchar(255) NOT NULL DEFAULT 'https://media.istockphoto.com/id/1344687455/id/vektor/pertanyaan-menyanyikan-ikon-datar-ilustrasi-vektor-terisolasi-pada-latar-belakang-putih.jpg?s=612x612&w=0&k=20&c=7fiPX_7gnL13O_V5OtrVm9y4d_M9U5YyR0iUc52782E=',
	`published` boolean NOT NULL DEFAULT true,
	`views` int NOT NULL DEFAULT 0,
	`rating` decimal(2,1) NOT NULL DEFAULT '0.0',
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`author_id` varchar(50) NOT NULL,
	`blog_id` int NOT NULL);
--> statement-breakpoint
CREATE TABLE `category` (
	`slug` varchar(25) PRIMARY KEY NOT NULL,
	`title` varchar(255) NOT NULL,
	`thumbnail` varchar(255) NOT NULL DEFAULT 'https://media.istockphoto.com/id/1344687455/id/vektor/pertanyaan-menyanyikan-ikon-datar-ilustrasi-vektor-terisolasi-pada-latar-belakang-putih.jpg?s=612x612&w=0&k=20&c=7fiPX_7gnL13O_V5OtrVm9y4d_M9U5YyR0iUc52782E=',
	`rating` decimal(2,1) NOT NULL DEFAULT '0.0',
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE TABLE `roles` (
	`slug` varchar(25) PRIMARY KEY NOT NULL,
	`title` varchar(50) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(50) PRIMARY KEY NOT NULL,
	`full_name` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(100) NOT NULL,
	`age` int NOT NULL,
	`gender` enum('male','female') NOT NULL,
	`role_slug` varchar(25) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE UNIQUE INDEX `slug_unique_idx` ON `blogs` (`slug`);--> statement-breakpoint
CREATE INDEX `published_idx` ON `blogs` (`published`);--> statement-breakpoint
CREATE UNIQUE INDEX `slug_unique_idx` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `blog_to_category` ADD CONSTRAINT `blog_to_category_slug_category_slug_fk` FOREIGN KEY (`slug`) REFERENCES `category`(`slug`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_author_id_users_id_fk` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_blog_id_blog_to_category_blog_id_fk` FOREIGN KEY (`blog_id`) REFERENCES `blog_to_category`(`blog_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_role_slug_roles_slug_fk` FOREIGN KEY (`role_slug`) REFERENCES `roles`(`slug`) ON DELETE no action ON UPDATE no action;