import {Entity, model, property} from '@loopback/repository';

@model()
export class PostDestaque extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  postId: number;

  @property({
    type: 'number',
    required: true, 
  })
  destaqueId: number;
  
  constructor(data?: Partial<PostDestaque>) {
    super(data);
  }
}

export interface PostDestaqueRelations {
  // describe navigational properties here
}

export type PostDestaqueWithRelations = PostDestaque & PostDestaqueRelations;
