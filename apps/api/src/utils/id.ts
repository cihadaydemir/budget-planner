import { customAlphabet } from "nanoid";

const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

const nanoid = customAlphabet(alphabet);

const prefixes = {
	pocket: "pck",
	expense: "exp",
} as const;

export type IdPrefix = keyof typeof prefixes;

export function newId(prefix: IdPrefix): string {
	return [prefixes[prefix], nanoid(17)].join("_");
}
