PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_pockets` (
	`serial_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id` text(21) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`name` text NOT NULL,
	`description` text,
	`budget` integer
);
--> statement-breakpoint
INSERT INTO `__new_pockets`("serial_id", "id", "created_at", "updated_at", "deleted_at", "name", "description", "budget") SELECT "serial_id", "id", "created_at", "updated_at", "deleted_at", "name", "description", "budget" FROM `pockets`;--> statement-breakpoint
DROP TABLE `pockets`;--> statement-breakpoint
ALTER TABLE `__new_pockets` RENAME TO `pockets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `pockets_id_unique` ON `pockets` (`id`);--> statement-breakpoint
ALTER TABLE `transactions` ADD `is_paid` integer DEFAULT false NOT NULL;