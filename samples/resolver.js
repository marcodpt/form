import countries from '../data/countries.js'
import cities_us from '../data/cities_us.js'
import cities_cn from '../data/cities_cn.js'
import cities_br from '../data/cities_br.js'
import roles from '../data/roles.js'

const Data = {
  countries,
  cities_us,
  cities_cn,
  cities_br,
  roles
}

export default (url) => {
  if (url == 'roles') {
    return Data.roles
  } else {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Data[url])
      }, 2000)
    })
  }
}
