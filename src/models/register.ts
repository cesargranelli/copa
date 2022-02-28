import { FormGroup } from "@angular/forms";

export class Register {
  name: string;
  nickname: string;
  email: string;
  password: string;

  convert(formUser: any): Register {
    this.name = formUser.name;
    this.nickname = formUser.nickname;
    this.email = formUser.email;
    this.password = formUser.password;

    return this;
  }
}
