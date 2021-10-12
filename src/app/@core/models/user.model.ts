import { Roles } from '../types/roles.types';

export class User {
  private _name: string;
  private _lastname: string;
  private _email: string;
  private _role: Roles | null;

  private _id: string;

  constructor(
    name: string,
    lastname: string,
    email: string,
    role: Roles,
    _id: string
  ) {}

  public get role(): Roles | null {
    return this._role;
  }
  public get name(): String | null {
    return this._name;
  }
  public get lastname(): String | null {
    return this._lastname;
  }
}
