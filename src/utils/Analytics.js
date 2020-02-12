/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * User: Junhang
 * Date: 2018/9/5 上午9:46
 */

import URLPath from '../config/URLPath'
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: URLPath.analytics,
});

export default class Analytics {

    static onEvent(event, event_name = '', event_value = '', event_count = 1, channel = 'official', user = '',
                     duration = 0, attribute1 = '', attribute2 = '', attribute3 = '', attribute4 = '', attribute5 = '') {
        axiosInstance.post('/', {
            mt: 'analytics',
            event: event,
            event_name: event_name,
            event_value: event_value,
            event_count: event_count,
            user: user,
            channel: channel,
            duration: duration,
            attribute1: attribute1,
            attribute2: attribute2,
            attribute3: attribute3,
            attribute4: attribute4,
            attribute5: attribute5,
        })
            .then(data => {
                // console.log(JSON.stringify(data.data))
            })
    }

    static sendMessage(params) {
        axios.get(URLPath.yunshiIP + '/PhoneCsmHandler.ashx', {
            params: Object.assign(params, {
                mt: 50076
            })
        }).catch(err => {})
    }

    static newoprationtime(appType,appID,appName) {
        let formData = new FormData();
        
        formData.append('mt',50259);
        formData.append('appType',appType);
        formData.append('appID',appID);
        formData.append('appName',appName);

        return axios({
            method: 'post',
            url: URLPath.yunshiIP+'/PhoneCSMHandler.ashx',
            data: formData
        }).then(res => {
            // console.log(res)
        })
    }


}

