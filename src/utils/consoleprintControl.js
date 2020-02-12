/*
 * @Author: wxh4321
  * @Date: 2019-08-09 16:59:31
 * @Last Modified by: wxh4321
 * @Last Modified time: 2020-02-06 18:50:00
  */
import UrlConfig from '../../config/host.config';

var debug = UrlConfig.is_release?false:true;//调试模式打开
const console1 = {
    log:function log(key){
        if(debug){
            console.log(key);
        }
     }
};
    
export default console1;
 