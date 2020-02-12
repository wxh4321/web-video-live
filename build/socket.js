/*
  1.通过ws模块来创建服务器
  2.服务器连接客户端---(给客户端编号)
  3.接收客户端发来的信息
  4.监听客户端下线  
*/

//1.通过ws模块，来创建服务器
const webSocket = require('ws');//安装并引入webSocket模块
const ws = new webSocket.server({
    port:3000,
    hostname:'192.168.0.102'
});
//对客户端发来数据进行封装调用
function boardcast(client,msg){
    console.log("client  : ",client);
    for (var key in clients){
        clients[key].send(msg);//接收到客户端信息，遍历客户端，显示所有信息
    }
}

module.exports=function(){
    //2.服务器连接客户端并对客户端数量计数
    var clients = {};
    var count = 0;
    ws.on('connection',client=>{
        client.name=++count;//对客户端进行编号
        clients[client.name]=client;//将连接到客户端存到集合内
        
        //3.接收客户端发来的数据
        client.on('message',msg=>{
            console.log(`客户端${client.name}:${msg}}`);
            boardcast(client,msg);//接收到客户信息时，调用函数显示所有信息
        });
        
        //4.监听客户端下线
        client.on('close',()=>{
            delete clients[client.name];//清除下线客户端
            console.log(`客户端${client.name}closed~~~`);
        });
    });
}
