export class Expense {
  id: number;
  amount: number;
  categoryId: number;
  categoryName: string = '';
  periodId: number;
  name: string;
  dateRegister: string = '';

  constructor(
    id: number,
    name: string,
    amount: number,
    categoryId: number,
    periodId: number
  ) {
    this.id = id;
    this.name = name;
    this.categoryId = categoryId;
    this.amount = amount;
    this.periodId = periodId;
  }
}
