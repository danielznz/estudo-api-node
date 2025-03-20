import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {PostDestaque, PostDestaqueRelations} from '../models';

export class PostDestaqueRepository extends DefaultCrudRepository<
  PostDestaque,
  typeof PostDestaque.prototype.id,
  PostDestaqueRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(PostDestaque, dataSource);
  }
}
