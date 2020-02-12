import UrlConfig from '../../config/host.config';
import {get,post,post2,get2,get3,post3,request1} from '../utils/request';
import { stringify } from 'qs';

function transferStr(params){
    const obj = JSON.parse(params);
    let paramsStr='?';
    paramsStr += stringify(obj);
    return paramsStr;
}
export async function getWebLive(params) {
    return post3(UrlConfig.api_host+'/web/live/',transferStr(params).substring(1));
}

export async function getUrlList(){
    return get(UrlConfig.api_host+'/web/liveurl/');
}

export async function getBlobFileList(){
    return get(UrlConfig.api_host+'/web/blobfileurl/');
}