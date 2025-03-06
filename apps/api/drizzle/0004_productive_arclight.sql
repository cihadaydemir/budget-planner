PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_pockets` (
	`serial_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id` text(21) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`name` text NOT NULL,
	`description` text,
	`budget` integer,
	`user_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_pockets`("serial_id", "id", "created_at", "updated_at", "deleted_at", "name", "description", "budget", "user_id") SELECT "serial_id", "id", "created_at", "updated_at", "deleted_at", "name", "description", "budget", "user_id" FROM `pockets`;--> statement-breakpoint
DROP TABLE `pockets`;--> statement-breakpoint
ALTER TABLE `__new_pockets` RENAME TO `pockets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `pockets_id_unique` ON `pockets` (`id`);--> statement-breakpoint
CREATE TABLE `__new_transactions` (
	`serial_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id` text(21) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`name` text NOT NULL,
	`description` text,
	`amount` integer NOT NULL,
	`is_paid` integer DEFAULT false NOT NULL,
	`category` text,
	`pocket_id` text NOT NULL,
	`user_id` text,
	FOREIGN KEY (`category`) REFERENCES `expense_category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`pocket_id`) REFERENCES `pockets`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("serial_id", "id", "created_at", "updated_at", "deleted_at", "name", "description", "amount", "is_paid", "category", "pocket_id", "user_id") SELECT "serial_id", "id", "created_at", "updated_at", "deleted_at", "name", "description", "amount", "is_paid", "category", "pocket_id", "user_id" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;--> statement-breakpoint
CREATE UNIQUE INDEX `transactions_id_unique` ON `transactions` (`id`);