import request from './request';

type Result<T> = any;

interface IParamsModel {
  page: number;
  pageSize: number;
}

class CrudRequest<T> {
  public entity: string;

  constructor(entity: string) {
    this.entity = entity;
  }

  public async create(args: T): Promise<Result<T>> {
    return request(`/${this.entity}`, {
      method: 'POST',
      data: args,
    });
  }

  public async update<U>(id: string, data: U): Promise<Result<T>> {
    return request(`/${this.entity}/${id}`, {
      method: 'POST',
      data,
    });
  }

  public async get(id: string): Promise<Result<T>> {
    return request(`/${this.entity}/${id}`, {
      method: 'GET',
    });
  }

  public async delete(id: string) {
    return request(`/${this.entity}/${id}/delete`, {
      method: 'DELETE',
    });
  }

  public async getList(
    page: number,
    pageSize: number,
    queryParams: string[] = [],
  ): Promise<Result<T[]>> {
    return request(
      `/${this.entity}?page=${page}&pageSize=${pageSize}${queryParams
        .map((param) => param)
        .join('')}`,
      {
        method: 'GET',
      },
    );
  }
}

export default CrudRequest;
