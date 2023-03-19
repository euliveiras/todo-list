import { randomUUID } from 'crypto';
import { Categories } from './categories';

interface TaskProps {
  label: string;
  additionalInfo?: string;
  expiration: Date;
  categories: Categories;
  ownerId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type Replace<T, R> = Omit<T, keyof R> & R;

export class Task {
  private _id: string;
  private props: TaskProps;

  constructor(props: Replace<TaskProps, { createdAt: Date }>, _id?: string) {
    this._id = _id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  private validateLabel(label: string) {
    return label.length >= 2;
  }

  public get id() {
    return this._id;
  }

  public get label() {
    return this.props.label;
  }

  public set label(label: string) {
    const isLabelValid = this.validateLabel(label);

    if (!isLabelValid) {
      throw new Error('Label must contain more than 2 characters');
    }
    this.props.label = label;
  }

  public get additionalInfo() {
    return this.props.additionalInfo;
  }

  public set additionalInfo(label: string) {
    this.props.additionalInfo = label;
  }

  public get expiration() {
    return this.props.expiration;
  }

  public get categories() {
    return this.props.categories;
  }

  public set categories(categories: Categories) {
    this.props.categories = categories;
  }

  public get ownerId() {
    return this.props.ownerId;
  }

  public set ownerId(ownerId: string) {
    this.props.label = ownerId;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}
