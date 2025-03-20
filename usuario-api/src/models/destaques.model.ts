import {Entity, model, property, hasMany} from '@loopback/repository';
import {Post} from './post.model';
import {PostDestaque} from './post-destaque.model';

@model()
export class Destaques extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  nome?: string;

  @property({
    type: 'string',
  })
  imagemURL?: string;

  // Adicionando a relação inversa
  @hasMany(() => Post, {through: {model: () => PostDestaque}})
  posts: Post[];

  constructor(data?: Partial<Destaques>) {
    super(data);
  }
}

export interface DestaquesRelations {
  // describe navigational properties here
}

export type DestaquesWithRelations = Destaques & DestaquesRelations;
