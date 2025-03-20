import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Destaques} from '../models';
import {DestaquesRepository} from '../repositories';

export class DestaquesController {
  constructor(
    @repository(DestaquesRepository)
    public destaquesRepository : DestaquesRepository,
  ) {}

  @post('/destaques')
  @response(200, {
    description: 'Destaques model instance',
    content: {'application/json': {schema: getModelSchemaRef(Destaques)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Destaques, {
            title: 'NewDestaques',
            exclude: ['id'],
          }),
        },
      },
    })
    destaques: Omit<Destaques, 'id'>,
  ): Promise<Destaques> {
    return this.destaquesRepository.create(destaques);
  }

  @get('/destaques/count')
  @response(200, {
    description: 'Destaques model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Destaques) where?: Where<Destaques>,
  ): Promise<Count> {
    return this.destaquesRepository.count(where);
  }

  @get('/destaques')
  @response(200, {
    description: 'Array of Destaques model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Destaques, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Destaques) filter?: Filter<Destaques>,
  ): Promise<Destaques[]> {
    return this.destaquesRepository.find(filter);
  }

  @patch('/destaques')
  @response(200, {
    description: 'Destaques PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Destaques, {partial: true}),
        },
      },
    })
    destaques: Destaques,
    @param.where(Destaques) where?: Where<Destaques>,
  ): Promise<Count> {
    return this.destaquesRepository.updateAll(destaques, where);
  }

  @get('/destaques/{id}')
  @response(200, {
    description: 'Destaques model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Destaques, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Destaques, {exclude: 'where'}) filter?: FilterExcludingWhere<Destaques>
  ): Promise<Destaques> {
    return this.destaquesRepository.findById(id, filter);
  }

  @patch('/destaques/{id}')
  @response(204, {
    description: 'Destaques PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Destaques, {partial: true}),
        },
      },
    })
    destaques: Destaques,
  ): Promise<void> {
    await this.destaquesRepository.updateById(id, destaques);
  }

  @put('/destaques/{id}')
  @response(204, {
    description: 'Destaques PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() destaques: Destaques,
  ): Promise<void> {
    await this.destaquesRepository.replaceById(id, destaques);
  }

  @del('/destaques/{id}')
  @response(204, {
    description: 'Destaques DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.destaquesRepository.deleteById(id);
  }
}
