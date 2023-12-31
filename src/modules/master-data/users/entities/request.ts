import { TDefaultParams } from '@/utils/entities/request';
import { TUserResponse } from './response';
import { TRoleResponse } from '../../roles/entities/response';

export type TUserParams = TDefaultParams<TUserResponse> & {
  search?: string;
  roleId?: TRoleResponse['id'];
};

export type TUserPayload = {
  email: string;
  password: string;
  fullname: string;
  roleId: TRoleResponse['id'];
  photo: string;
  phoneNumber: string;
};
