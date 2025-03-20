import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Post, PostRelations, Destaques, PostDestaque} from '../models';
import {PostDestaqueRepository} from './post-destaque.repository';
import {DestaquesRepository} from './destaques.repository';

export class PostRepository extends DefaultCrudRepository<
  Post,
  typeof Post.prototype.id,
  PostRelations
> {

  public readonly destaques: HasManyThroughRepositoryFactory<Destaques, typeof Destaques.prototype.id,
          PostDestaque,
          typeof Post.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PostDestaqueRepository') protected postDestaqueRepositoryGetter: Getter<PostDestaqueRepository>, @repository.getter('DestaquesRepository') protected destaquesRepositoryGetter: Getter<DestaquesRepository>,
  ) {
    super(Post, dataSource);
    this.destaques = this.createHasManyThroughRepositoryFactoryFor('destaques', destaquesRepositoryGetter, postDestaqueRepositoryGetter,);
    this.registerInclusionResolver('destaques', this.destaques.inclusionResolver);
  }
}
