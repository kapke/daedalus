// @flow
import type { RequestConfig } from '../../common/types';
import { request } from '../../utils/request';

export const applyNodeUpdate = (
  config: RequestConfig,
): Promise<any> => (
  request({
    method: 'POST',
    path: '/api/internal/apply-update',
    ...config,
  })
);
