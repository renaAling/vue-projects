import fetch from "@http/request.js";
export const LOGIN = (parmas) => fetch.post('login',parmas)  // http://www.baidu.com/login
export const LOGOUT = () => fetch.get('logout')
export const getLang =()=> fetch.get('getlang')