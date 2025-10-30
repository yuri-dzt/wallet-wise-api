import { randomUUID } from "crypto";

export interface CategoryProps {
  id: string;
  name: string;
  description?: string;
  created_at: number;
  updated_at?: number;
}

export type CategoryCollection = Category[];

export class Category {
  private readonly props: CategoryProps;

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  constructor(
    props: Omit<CategoryProps, "id" | "created_at"> & {
      id?: string;
      created_at?: number;
    }
  ) {
    this.props = {
      id: props.id || randomUUID(),
      name: props.name,
      description: props.description,
      updated_at: props.updated_at,
      created_at: props.created_at || Date.now(),
    };
  }

  public updateName(name: string) {
    this.props.name = name;
    this.props.updated_at = Date.now()
  }

  public updateDescription(description: string) {
    this.props.description = description;
    this.props.updated_at = Date.now()
  }
}
