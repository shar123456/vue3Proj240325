
let G_BASEURL='';
 G_BASEURL=process.env.NODE_ENV === 'production' ? 'http://120.26.194.72:8086/Api' : 'http://127.0.0.1:5256/Api';

 //G_BASEURL=process.env.NODE_ENV === 'production' ? 'http://119.8.25.19:8059/Api' : 'http://119.8.25.19:8059/Api';

export {G_BASEURL}