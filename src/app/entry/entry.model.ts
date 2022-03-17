export class Entry {
  id: number;
  amount: number;
  periodId: number;
  name: string;
  dateRegister: string = "";

  constructor(id: number, name: string, amount: number, periodId: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.periodId = periodId;
  }
}