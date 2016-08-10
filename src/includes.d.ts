declare module 'colors/safe' {
	export function setTheme(theme:any):any;

	export function black(text: string): string;
	export function red(text: string): string;
	export function green(text: string): string;
	export function yellow(text: string): string;
	export function blue(text: string): string;
	export function magenta(text: string): string;
	export function cyan(text: string): string;
	export function white(text: string): string;
	export function gray(text: string): string;
	export function grey(text: string): string;
}

declare module 'winston' {
	export interface TransportInstance {}
	export class Transport { constructor(options?: any); }
	export var Logger: any;
	export var transports: any;
}
