import UserEntity, { UserOptions } from '../entities/userEntity';

class UserModel extends UserEntity {
  constructor(options?: Partial<UserOptions>) {
    super(options);
  }

  copyWith(options: Partial<UserOptions>): UserModel {
    return new UserModel(
      Object.assign({}, this, options),
    );
  }

}

export default UserModel;
