import Cookies from 'js-cookie'

export const Local = {
  set<T>(key: string, val: T) {
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  get(key: string) {
    const json = <string>window.localStorage.getItem(key)
    return JSON.parse(json)
  },
  remove(key: string) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  },
}

export const Session = {
  set(key: string, val: any) {
    if (key === 'token') {
      Cookies.set(key, val)
    }
    window.sessionStorage.setItem(key, JSON.stringify(val))
  },
  get(key: string) {
    if (key === 'token')
      return Cookies.get(key)
    const json = <string>window.sessionStorage.getItem(key)
    return JSON.parse(json)
  },
  remove(key: string) {
    if (key === 'token')
      return Cookies.remove(key)
    window.sessionStorage.removeItem(key)
  },
  clear() {
    Cookies.remove('token')
    window.sessionStorage.clear()
  },
  setToken(token: string) {
    this.set('token', token)
  },
  getToken() {
    return this.get('token')
  },
}
