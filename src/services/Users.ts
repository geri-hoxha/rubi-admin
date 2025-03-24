import { Result } from '@/components/AgGrid';
import CrudRequest from './CrudRequest';
import request from './request';

export interface IUserModel {
  userId: string;
  userType: string;
  displayName: string;
  username: string;
}

class Users extends CrudRequest<IUserModel> {
  public async singIn(
    data: {
      username: string;
      password: string;
    },
  ): Promise<Result<any>> {
    return request(`/${this.entity}/signin`, {
      method: 'POST',
      data,
    });
  }
}
export default new Users('users');
