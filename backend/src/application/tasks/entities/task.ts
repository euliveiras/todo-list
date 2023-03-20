import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Category } from './category';

interface TaskProps {
  label: string;
  additionalInfo?: string;
  expiration: Date;
  categories: Category[];
  ownerId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type Replace<T, R> = Omit<T, keyof R> & R;

@Injectable()
export class Task {
  private _id: string;
  private props: TaskProps;

  constructor(props: Replace<TaskProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();

    this.validateLabel(props.label);

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  private validateLabel(label: string) {
    const isLabelValid = label.length >= 2;
    if (!isLabelValid) {
      throw new Error('Label must contain more than 2 characters');
    }
  }

  public get id() {
    return this._id;
  }

  public get label() {
    return this.props.label;
  }

  public set label(label: string) {
    this.validateLabel(label);

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

  public set categories(categories: Category[]) {
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
