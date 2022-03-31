export default function request(url, options = {}) {
   const token = localStorage.getItem('token');
   return axios({
     url: /^http/.test(url) ? url : `${ORIGIN}${url}`,
     method: 'get',
     headers: token ? { Authorization: token } : undefined,
     ...options,
     data: options.body,
   })
 }