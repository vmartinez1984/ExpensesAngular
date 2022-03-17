export class Period {
  id: number = 0;
  name: string = '';
  dateStart: string = '';
  dateStop: string = '';

  constructor(id: number, name: string, dateStart: string, dateStop: string) {
    this.id = id;
    this.name = name;
    this.dateStart = dateStart;
    this.dateStop = dateStop;
  }
}
