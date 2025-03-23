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
import {User, Post} from '../models';
import {UserRepository} from '../repositories';

export class UserPostController {
  constructor(
    @repository(UserRepository)
    protected userRepository: UserRepository,
  ) {}

  // =================== 1. LEITURA (GET) ===================

  @get('/users/{id}/posts', {
    responses: {
      '200': {
        description: 'Array of User has many Post',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Post)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Post>,
  ): Promise<Post[]> {
    return this.userRepository.posts(id).find(filter);
  }

  // =================== 2. CRIAÇÃO (POST) ===================

  @post('/users/{id}/posts', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Post)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Post, {
            title: 'NewPostInUser',
            exclude: ['id'],
            optional: ['userId'],
          }),
        },
      },
    }) 
    post: Omit<Post, 'id'>,
  ): Promise<Post> {
    return this.userRepository.posts(id).create(post);
  }

  // =================== 3. ATUALIZAÇÃO (PATCH) ===================

  @patch('/users/{id}/posts', {
    responses: {
      '200': {
        description: 'User.Post PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Post, {partial: true}),
        },
      },
    })
    post: Partial<Post>,
    @param.query.object('where', getWhereSchemaFor(Post)) where?: Where<Post>,
  ): Promise<Count> {
    return this.userRepository.posts(id).patch(post, where);
  }

  // =================== 4. REMOÇÃO (DELETE) ===================

  @del('/users/{id}/posts', {
    responses: {
      '200': {
        description: 'User.Post DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Post)) where?: Where<Post>,
  ): Promise<Count> {
    return this.userRepository.posts(id).delete(where);
  }
}
