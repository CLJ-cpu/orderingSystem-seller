import request from "../request/request.js";

// 上传图片
export function uploadCommonImage(data) {
  return request(`/image/common`, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': '',
    }
  })
}