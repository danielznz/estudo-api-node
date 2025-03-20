import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'number',
    required: true,
  })
  postId: number;


  constructor(data?: Partial<Destaques>) {
    super(data);
  }
}

export interface DestaquesRelations {
  // describe navigational properties here
}

export type DestaquesWithRelations = Destaques & DestaquesRelations;
