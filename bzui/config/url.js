import env from './env'

const DEV_URL = 'http://sc.94rp.com/bzDCP/'
const PRO_URL = 'http://sc.94rp.com/bzDCP/'

export default env === 'development' ? DEV_URL : PRO_URL
