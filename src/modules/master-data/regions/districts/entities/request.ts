import { TDefaultParams } from '@/utils/entities/request';
import { TDistrictResponse } from './response';
import { TCityResponse } from '../../cities/entities/response';

export type TDistrictParams = TDefaultParams<TDistrictResponse> & {
  search?: string;
  cityId?: TCityResponse['id'];
};

export type TDistrictPayload = {
  name: string;
  cityId: TCityResponse['id'];
};
