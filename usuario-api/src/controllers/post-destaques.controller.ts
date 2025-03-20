import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Post,
  PostDestaque,
  Destaques,
} from '../models';
import {PostRepository, PostDestaqueRepository} from '../repositories';

export class PostDestaquesController {
  constructor(
    @repository(PostRepository) protected postRepository: PostRepository,
    @repository(PostDestaqueRepository) protected postDestaqueRepo: PostDestaqueRepository
  ) {}

  @get('/posts/{id}/destaques', {
    responses: {
      '200': {
        description: 'Array of Post has many Destaques through PostDestaque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Destaques)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Destaques>,
  ): Promise<Destaques[]> {
    return this.postRepository.destaques(id).find(filter);
  }

  @post('/posts/{postId}/destaques/{destaqueId}', {
    responses: {
      '200': {
        description: 'Vincula um Post a um Destaque existente',
        content: {'application/json': {schema: getModelSchemaRef(PostDestaque)}},
      },
    },
  })
  async linkPostToDestaque(
    @param.path.number('postId') postId: number,
    @param.path.number('destaqueId') destaqueId: number
  ): Promise<PostDestaque> {
    return this.postDestaqueRepo.create({
      postId,
      destaqueId
    });
  }

  @patch('/posts/{id}/destaques', {
    responses: {
      '200': {
        description: 'Post.Destaques PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Destaques, {partial: true}),
        },
      },
    })
    destaques: Partial<Destaques>,
    @param.query.object('where', getWhereSchemaFor(Destaques)) where?: Where<Destaques>,
  ): Promise<Count> {
    return this.postRepository.destaques(id).patch(destaques, where);
  }

  @del('/posts/{id}/destaques', {
    responses: {
      '200': {
        description: 'Post.Destaques DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Destaques)) where?: Where<Destaques>,
  ): Promise<Count> {
    return this.postRepository.destaques(id).delete(where);
  }
}