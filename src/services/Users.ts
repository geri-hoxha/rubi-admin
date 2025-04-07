import CrudRequest from './CrudRequest';
import request, { Result } from './request';

export interface IUserModel {
  userId: string;
  userType: string;
  displayName: string;
  username: string;
  password?: string;
}

class Users extends CrudRequest<IUserModel> {
  public async singIn(data: {
    username: string;
    password: string;
  }): Promise<Result<any>> {
    return request(`/signin`, {
      method: 'POST',
      data,
    });
  }

  public async getAllRoles(userId: string): Promise<Result<any>> {
    return request(`/${this.entity}/${userId}/roles`, {
      method: 'GET',
    });
  }

  public async setRoles(
    userId: string,
    roleCodes: string[],
  ): Promise<Result<any>> {
    return request(`/${this.entity}/${userId}/roles`, {
      method: 'POST',
      data: roleCodes,
    });
  }

  public async updatePassword(
    userId: string,
    data: {
      oldPassword: string;
      newPassword: string;
    },
  ): Promise<Result<any>> {
    return request(`/${this.entity}/${userId}/password`, {
      method: 'POST',
      data,
    });
  }
}
export default new Users('users');
