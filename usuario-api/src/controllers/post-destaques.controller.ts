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
  
  @get('/destaques/{destaqueId}/posts', {
    responses: {
      '200': {
        description: 'Array of Posts related to a specific Destaque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Post)},
          },
        },
      },
    },
  })
  async findPostsByDestaqueId(
    @param.path.number('destaqueId') destaqueId: number,
    @param.query.object('filter') filter?: Filter<Post>,
  ): Promise<Post[]> {
    return this.postRepository.find({
      where: {
        id: {
          inq: (
            await this.postDestaqueRepo.find({ 
              where: { destaqueId },
              fields: { postId: true }
            })
          ).map(rel => rel.postId),
        },
      },
      ...filter,
    });
  }

  @get('/posts/{postId}/destaques', {
    responses: {
      '200': {
        description: 'Array of Destaques related to a specific Post',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Destaques)},
          },
        },
      },
    },
  })
  async findDestaquesByPostId(
    @param.path.number('postId') postId: number,
    @param.query.object('filter') filter?: Filter<Destaques>,
  ): Promise<Destaques[] | {message: string}> {
    const destaqueIds = (
      await this.postDestaqueRepo.find({
        where: {postId},
        fields: {destaqueId: true},
      })
    ).map(rel => rel.destaqueId);
  
    if (destaqueIds.length === 0) {
      return {message: "Essa publicação não está em nenhum destaque."};
    }
  
    return this.postRepository.destaques(postId).find(filter);
  }
  
  @get('/posts/destaque-status', {
    responses: {
      '200': {
        description: 'Lista de posts com status de destaque (destacado ou não destacado)',
        content: {'application/json': {schema: {type: 'array', items: getModelSchemaRef(Post)}}},
      },
    },
  })
  async findPostsByDestaqueStatus(
    @param.query.boolean('isDestacado') isDestacado: boolean
  ): Promise<Post[]> {
    const postIdsComDestaque = (
      await this.postDestaqueRepo.find({
        fields: { postId: true },
      })
    ).map(rel => rel.postId);
  
    const whereCondition = isDestacado
      ? { id: { inq: postIdsComDestaque } }
      : { id: { nin: postIdsComDestaque } };
  
    return this.postRepository.find({ where: whereCondition });
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
}

