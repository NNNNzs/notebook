const axios = require('axios');
axios({
    // withCredentials: true, //带cookie
    data: {
        username:'11',
        pwd:'11'
    },
    url: 'http://localhost:3001/api/test1',
    method: "post",
    // headers: {
    //     "Cookie" :'Nz_session:s:pjjN_YB5gaOhYllZ1heaHV8yS4BT7oyg.RXskP0MEPu7UXaUWtrisobpUIOrazKhX+2+aa0HLW1U',
    // },
  }).then(rep => {
      console.log(rep)
  }).catch(res=>{console.log(res)})