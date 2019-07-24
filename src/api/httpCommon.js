/* jshint esversion: 6 */
/**
 * axios与后端服务数据交互层封装
 * 提供fetch、get、post三种交互方式,底层调用axios方法实现
 */
import axios from 'axios'
import {Notification} from 'element-ui'
import {MessageBox} from 'element-ui'
import Vue from "vue";

const $ = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-type': 'application/json;charset=utf-8',
  },
  withCredentials: true
});
const hintTime = 1500;
export default {
  fetch (url, option) {
    $.request({
      url: url,
      method: option['type'] || 'get',
      data: option['data'] || {},
      params: option['data'] || {},
      responseType: option['dataType'] || 'json'
    })
    .then((response) => {
      let res = response.data
      if (typeof (res.error) === 'object') res.error = res.error['msg']
      if (res.ret === -1) {
        return Notification.error({title: '提示', message: res.msg, duration: hintTime})
      }
      if (option['success']) {
        option['success'](res.data)
      }
    })
    .catch((e) => {
      if (option['error']) {
        option['error'](e)
      } else {
        Notification.error({title: '提示', message: '服务器异常,请稍后重试', duration: hintTime})
      }
    })
  },
  get (url, params, callback,isAllResult) {
    $.get( url, {params: params})
      .then((response) => {
        this.success(response, callback,isAllResult)
      })
      .catch((e) => {
        Notification.error({title: '错误', message: '服务器异常,请稍后重试', duration: hintTime})
      })
  },
  post (url, data, callback, callback_error,isAllResult) {
    // 在浏览器中使用axios post请求时,data数据是form data
    $.post( url, JSON.stringify(data))
      .then((response) => {
        this.success(response, callback, callback_error,isAllResult)
      })
      .catch((e) => {
        Notification.error({title: '错误', message: '服务器异常,请稍后重试', duration: hintTime})
      })
  },
  success (response, callback, callback_error,isAllResult) {
    let res = response.data;

    if (res.ret === -1) {
      // return Notification.error({title: '提示', message: res.error, duration: hintTime})
      Notification.error({title: '提示', message: res.error!=null ? error:res.msg , duration: hintTime})
      console.log(res)
      if (callback_error) return callback_error('callback_error')
    }else if (res.ret === -2 || res.ret === 1000 || res.ret === 1008
      ||  res.ret === 1009){
      //提示重新登录
      MessageBox.alert('您的登录状态已失效，请重新登录！', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          Vue.prototype.$loading({text:"加载中..."});
          // 跳转到登录页面
          window.parent.location = pathConfig.SSOPath;
          // window.parent.location.reload();//刷新父级页面
        }
      });
    }


    if (callback) {
      if(isAllResult){
        callback(res)
      }else{
        callback(res.data)
      }
    }
    // if (callback) callback(res)
  }
}
