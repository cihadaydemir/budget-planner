CREATE TABLE `expense_category` (
	`serial_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id` text(21) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `expense_category_id_unique` ON `expense_category` (`id`);--> statement-breakpoint
ALTER TABLE `transactions` ADD `category` text REFERENCES expense_category(id);