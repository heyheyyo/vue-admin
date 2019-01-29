import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'http://localhost:3000/api/v1/events',
    method: 'get',
    params: query
  })
}
