import { ListReq } from '@proto.ts/common';

export class AuthProvider {
  protected transformToAuth0Params(params: ListReq): any {
    const request: any = {};
    if (params.paginate) {
      request.page = params.paginate.page ?? undefined;
      request.per_page = params.paginate.perPage ?? undefined;
    }
    if (params.orderBy) {
      request.sort = `${params.orderBy.sort}:${/^(desc)/i.test(params.orderBy.order) ? '-1' : '1'}`;
    }
    return request;
  }
}
