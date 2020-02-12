import console from '@/utils/consoleprintControl';//控制打印
/* eslint-disable */
const getGeolocationInfo = () =>{ //获取地理信息
    const p = new Promise(function(resolve,reject){
        AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
            });
            geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                    onComplete(result)
                }else{
                    onError(result)
                }
            });
        });
        //解析定位结果
        function onComplete(data) {
            console.log("=========获取地理信息数据success========================");
            console.log(data)
            resolve(data)
            // document.getElementById('status').innerHTML='定位成功'
            // var str = [];
            // str.push('定位结果：' + data.position);
            // str.push('定位类别：' + data.location_type);
            // if(data.accuracy){
            //      str.push('精度：' + data.accuracy + ' 米');
            // }//如为IP精确定位结果则没有精度信息
            // str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
            // document.getElementById('result').innerHTML = str.join('<br>');
        }
        //解析定位错误信息
        function onError(data) {
            // document.getElementById('status').innerHTML='定位失败'
            // document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
            reject('定位失败')
        }

    })
    return p;
} 
export default getGeolocationInfo;