// const isRelease = false
const isRelease = window.location.hostname === 'oil-m.tjyunshi.com';

const host_ip = isRelease ? 'https://webapi.tjyunshi.com/' : 'https://'+document.domain+':30800';

const img_path = 'https://dfs.tjyunshi.com';

const UrlConfig = {
    feature: isRelease ? 'oil' : 'staging_oil',
    is_release: isRelease,
    ms_ip: isRelease ? 'http://www.tjyunshi.com' : 'http://123.196.126.55:8098',
    excel_ip: 'http://123.196.126.62:8000',

    // api_host: isRelease ? 'http://api.tjyunshi.com/v1' : 'http://123.196.126.66:9000/v1'
    api_ip: `${host_ip}`,
    api_host: `${host_ip}`,
    api_host_v1: `${host_ip}/v1`,
    upload_files_url: `${img_path}/upload`,
    // api_host_MSHandler: `${host_ip}/CustomerHandler`,
};

export default UrlConfig;