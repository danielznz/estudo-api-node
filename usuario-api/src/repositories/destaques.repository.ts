import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Destaques, DestaquesRelations} from '../models';

export class DestaquesRepository extends DefaultCrudRepository<
  Destaques,
  typeof Destaques.prototype.id,
  DestaquesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Destaques, dataSource);
  }
}
