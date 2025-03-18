import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {DbDataSource} from '../datasources';
import {Profile, ProfileRelations} from '../models';

export class ProfileRepository extends DefaultCrudRepository<
  Profile,
  typeof Profile.prototype.id,
  ProfileRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Profile, dataSource);
  }

  async create(profile: Omit<Profile, 'id'>): Promise<Profile> {
    // Verifica se já existe um perfil para este userId
    const existingProfile = await this.findOne({where: {userId: profile.userId}});

    if (existingProfile) {
      throw new HttpErrors.BadRequest('Este usuário já possui um perfil.');
    }

    // Se não existir, cria o novo perfil
    return super.create(profile);
  }
}
