import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Post} from './post.model';
import {Profile} from './profile.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;


  @property({
    type: 'string',
    required: true,
  })
  sobrenome: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  senha: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @hasOne(() => Profile)
  profile: Profile;

  @hasMany(() => Post)
  posts: Post[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
