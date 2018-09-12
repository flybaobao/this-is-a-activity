import api from '@/config/api'

let DOMAIN_NAME = ''
if (process.env.NODE_ENV === 'production') {
  let protocol = document.location.protocol
  // 微信浏览器兼容问题修复
  if (protocol === 'http:/' || protocol === 'http' || protocol === 'http:') {
    protocol = 'http://'
  }
  if (protocol === 'https:/' || protocol === 'https' || protocol === 'https:') {
    protocol = 'https://'
  }
  DOMAIN_NAME = `${protocol}${document.domain}`
} else {
  DOMAIN_NAME = api.dev.host
}

const RELATIVE_PATH = 'appactive'

export const HOST_ROUTER = `${DOMAIN_NAME}/${RELATIVE_PATH}/`
