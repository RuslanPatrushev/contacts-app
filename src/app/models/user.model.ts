export class User {
  login: string;
  password: string;
  id?: number;
  name?: string;
  constructor(login: string, password: string, id?: number, name?: string) {
    this.login = login;
    this.password = password;
    this.name = name;
    this.id = id;
  }
}
