export interface Expense {
	_id: string;
	name: string;
	value: number;
	description: string;
	date: Date;
	createdAt: Date;
	userId: string;
	userData: Array<any>;
	tags: Array<string>;
}
