import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {
    indexes: {
      uniqueUserProfile: {
        keys: {userId: 1},
        options: {unique: true},
      },
    },
  },
})
export class Profile extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  bio?: string;

  @property({
    type: 'string',
  })
  photo?: string;

  @property({
    type: 'string',
  })
  location?: string;

  @property({
    type: 'string',
  })
  link?: string;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Profile>) {
    super(data);
  }
}

export interface ProfileRelations { }

export type ProfileWithRelations = Profile & ProfileRelations;
