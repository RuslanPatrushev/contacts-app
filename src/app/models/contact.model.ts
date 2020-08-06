export class Contact {
  id: number;
  name: string;
  phone: string;
  date?: Date;
  userId?: number;

  constructor(id: number, name: string, phone: string, date?: Date, userId?: number) {
    this.name = name;
    this.phone = phone;
    this.date = new Date(date) ;
    this.id = id;
    this.userId = userId;
  }
}
