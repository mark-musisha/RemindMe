import { IAbstractEntity, AbstractEntity } from '../../common/abstract.entity';
import { Column, Entity } from 'typeorm';

import { RoleType } from '../../constants';
import { UserDto } from './dtos/user.dto';

export interface IUserEntity extends IAbstractEntity<UserDto> {
  firstName?: string;

  lastName?: string;

  role: RoleType;

  email?: string;

  password?: string;

  phone?: string;

  avatar?: string;
}

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> implements IUserEntity {
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;
  @Column({ nullable: true })
  isRegisteredWithGoogle: boolean;

  @Column({ nullable: true })
  isRegisteredWithFacebook: boolean;
}
