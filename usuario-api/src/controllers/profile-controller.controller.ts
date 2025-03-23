import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Profile} from '../models';
import {ProfileRepository} from '../repositories';

export class ProfileController {
  constructor(
    @repository(ProfileRepository)
    public profileRepository: ProfileRepository,
  ) {}

  // =================== 1. LEITURA (GET) ===================

  @get('/profiles')
  @response(200, {
    description: 'Array of Profile model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Profile, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Profile) filter?: Filter<Profile>,
  ): Promise<Profile[]> {
    return this.profileRepository.find(filter);
  }

  @get('/profiles/{id}')
  @response(200, {
    description: 'Profile model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Profile, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Profile, {exclude: 'where'}) filter?: FilterExcludingWhere<Profile>,
  ): Promise<Profile> {
    return this.profileRepository.findById(id, filter);
  }

  @get('/profiles/count')
  @response(200, {
    description: 'Profile model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Profile) where?: Where<Profile>,
  ): Promise<Count> {
    return this.profileRepository.count(where);
  }

  // =================== 2. CRIAÇÃO (POST) ===================

  @post('/profiles')
  @response(200, {
    description: 'Profile model instance',
    content: {'application/json': {schema: getModelSchemaRef(Profile)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profile, {
            title: 'NewProfile',
            exclude: ['id'],
          }),
        },
      },
    })
    profile: Omit<Profile, 'id'>,
  ): Promise<Profile> {
    return this.profileRepository.create(profile);
  }

  // =================== 3. ATUALIZAÇÃO (PATCH / PUT) ===================

  @patch('/profiles')
  @response(200, {
    description: 'Profile PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profile, {partial: true}),
        },
      },
    })
    profile: Profile,
    @param.where(Profile) where?: Where<Profile>,
  ): Promise<Count> {
    return this.profileRepository.updateAll(profile, where);
  }

  @patch('/profiles/{id}')
  @response(204, {
    description: 'Profile PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profile, {partial: true}),
        },
      },
    })
    profile: Profile,
  ): Promise<void> {
    await this.profileRepository.updateById(id, profile);
  }

  @put('/profiles/{id}')
  @response(204, {
    description: 'Profile PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() profile: Profile,
  ): Promise<void> {
    await this.profileRepository.replaceById(id, profile);
  }

  // =================== 4. REMOÇÃO (DELETE) ===================

  @del('/profiles/{id}')
  @response(204, {
    description: 'Profile DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.profileRepository.deleteById(id);
  }
}
