import {Entity, model, property, hasMany} from '@loopback/repository';
import {Destaques} from './destaques.model';
import {PostDestaque} from './post-destaque.model';

@model()
export class Post extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  content?: string;

  @property({
    type: 'string',
  })
  imageUrl?: string;

  @property({
    type: 'number',
  })
  likes?: number;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @hasMany(() => Destaques, {through: {model: () => PostDestaque}})
  destaques: Destaques[];

  constructor(data?: Partial<Post>) {
    super(data);
  }
}

export interface PostRelations {
  // describe navigational properties here
}

export type PostWithRelations = Post & PostRelations;
