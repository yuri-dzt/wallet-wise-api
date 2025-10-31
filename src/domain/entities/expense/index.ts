import { randomUUID } from "crypto";

export interface ExpenseProps {
  id: string;
  user_id: string;
  category_id: string;
  date: number;
  price: number;
  created_at: number;
  updated_at?: number;
}

export type ExpenseCollection = Expense[];

export class Expense {
  private readonly props: ExpenseProps;

  get id() {
    return this.props.id;
  }

  get user_id() {
    return this.props.user_id;
  }

  get category_id() {
    return this.props.category_id;
  }

  get date() {
    return this.props.date;
  }

  get price() {
    return this.props.price;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  constructor(
    props: Omit<ExpenseProps, "id" | "created_at"> & {
      id?: string;
      created_at?: number;
    }
  ) {
    this.props = {
      id: props.id || randomUUID(),
      user_id: props.user_id,
      category_id: props.category_id,
      date: props.date,
      price: props.price,
      updated_at: props.updated_at,
      created_at: props.created_at || Date.now(),
    };
  }

  public updateDate(date: number) {
    this.props.date = date;
    this.props.updated_at = Date.now()
  }

  public updatePrice(price: number) {
    this.props.price = price;
    this.props.updated_at = Date.now()
  }

  public updateUser(user_id: string) {
    this.props.user_id = user_id;
    this.props.updated_at = Date.now()
  }

  public updateCategory(category_id: string) {
    this.props.category_id = category_id;
    this.props.updated_at = Date.now()
  }
}
