export default function getToken(){
    if(window.token){
        return window.token;
    }else if (localStorage.token){
        return window.token = localStorage.token
    }else{
        return null;
    }
}