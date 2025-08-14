CREATE TABLE `continents` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `countries` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`continent_id` integer,
	FOREIGN KEY (`continent_id`) REFERENCES `continents`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`country_id` integer,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `plan_locations` (
	`id` integer PRIMARY KEY NOT NULL,
	`plan_id` integer NOT NULL,
	`location_id` integer NOT NULL,
	FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `plans` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text,
	`is_published` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`location_id` integer NOT NULL,
	`travel_id` integer,
	`plan_id` integer,
	`start_date` text,
	`end_date` text,
	`created_at` text NOT NULL,
	`updated_at` text,
	`is_published` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`travel_id`) REFERENCES `travels`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `post_tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`post_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `travels` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`start_date` text,
	`end_date` text,
	`created_at` text NOT NULL,
	`updated_at` text,
	`is_published` integer DEFAULT 0 NOT NULL,
	`plan_id` integer,
	FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `travel_locations` (
	`id` integer PRIMARY KEY NOT NULL,
	`travel_id` integer NOT NULL,
	`location_id` integer NOT NULL,
	FOREIGN KEY (`travel_id`) REFERENCES `travels`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE cascade
);
