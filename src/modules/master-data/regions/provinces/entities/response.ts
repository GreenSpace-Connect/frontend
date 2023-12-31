import { TPaginateResponse, TResponseData } from '@/utils/entities/response';

export type TProvinceResponse = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TProvincePaginateResponse = TPaginateResponse<TProvinceResponse>;

export type TProvinceDetailResponse = TResponseData<TProvinceResponse>;
