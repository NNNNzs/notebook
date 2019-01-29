import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    username:userName,
    password
  }
  return axios.request({
    url:'http://192.168.15.54:8080/Xunrar/login',
    data:$qs.stringify(data),
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    // url: 'logout',
    url:'http://sc.94rp.com/bzDCP/login/removeuser',
    method: 'post',
    data:$qs.stringify(token),
  })
}
