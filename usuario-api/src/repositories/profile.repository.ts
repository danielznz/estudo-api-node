import {inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {DbDataSource} from '../datasources';
import {Profile, ProfileRelations} from '../models';
import {UserRepository} from './user.repository';

export class ProfileRepository extends DefaultCrudRepository<
  Profile,
  typeof Profile.prototype.id,
  ProfileRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {
    super(Profile, dataSource);
  }

  // Sobrescreve o método create para verificar userId
  async create(profile: Omit<Profile, 'id'>): Promise<Profile> {
    // Verifica se o userId existe no banco de dados
    const userExists = await this.userRepository.exists(profile.userId);
    
    if (!userExists) {
      throw new HttpErrors.BadRequest('O usuário fornecido não existe.');
    }

    // Verifica se já existe um perfil para este userId
    const existingProfile = await this.findOne({where: {userId: profile.userId}});
    if (existingProfile) {
      throw new HttpErrors.BadRequest('Este usuário já possui um perfil.');
    }

    // Se tudo estiver ok, cria o novo perfil
    return super.create(profile);
  }
}
