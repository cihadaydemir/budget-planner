CREATE TABLE `pockets` (
	`serial_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id` text(21) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`name` text NOT NULL,
	`description` text,
	`budget` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pockets_id_unique` ON `pockets` (`id`);--> statement-breakpoint
CREATE TABLE `transactions` (
	`serial_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id` text(21) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`name` text NOT NULL,
	`description` text,
	`amount` integer NOT NULL,
	`pocket_id` text NOT NULL,
	FOREIGN KEY (`pocket_id`) REFERENCES `pockets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `transactions_id_unique` ON `transactions` (`id`);