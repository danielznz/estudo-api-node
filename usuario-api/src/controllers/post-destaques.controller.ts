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
import {PostRepository} from '../repositories';

export class PostDestaquesController {
  constructor(
    @repository(PostRepository) protected postRepository: PostRepository,
  ) { }

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

  @post('/posts/{id}/destaques', {
    responses: {
      '200': {
        description: 'create a Destaques model instance',
        content: {'application/json': {schema: getModelSchemaRef(Destaques)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Post.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Destaques, {
            title: 'NewDestaquesInPost',
            exclude: ['id'],
          }),
        },
      },
    }) destaques: Omit<Destaques, 'id'>,
  ): Promise<Destaques> {
    return this.postRepository.destaques(id).create(destaques);
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
