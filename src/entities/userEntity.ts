declare type UserOptions = {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
}

class UserEntity {
  readonly id?: number;
  readonly email?: string;
  readonly password?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly isVerified?: boolean;

  constructor(options?: Partial<UserOptions>) {
    this.id = options?.id;
    this.email = options?.email;
    this.password = options?.password;
    this.createdAt = options?.createdAt;
    this.updatedAt = options?.updatedAt;
    this.isVerified = options?.isVerified;
  }
}

export {
  UserEntity as default,
  UserOptions
}
