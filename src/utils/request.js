import Taro from '@tarojs/taro'

export default function request(url, options) {
  let newOptions = { ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.header = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.header
      };
    } else {
      // newOptions.body is FormData
      newOptions.header = {
        Accept: 'application/json',
        ...newOptions.header
      };
    }
  } else {
    newOptions.header = {
      'Content-Type': 'json',
      ...newOptions.header
    }
  }

  return Taro.request({url, ...newOptions})

}

