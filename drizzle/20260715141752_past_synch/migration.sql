CREATE TABLE `games_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`rawgId` integer NOT NULL UNIQUE,
	`name` text NOT NULL,
	`image` text,
	`platform` text NOT NULL,
	`status` text NOT NULL,
	`personalRating` integer,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`email` text NOT NULL UNIQUE,
	`password` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP
);
