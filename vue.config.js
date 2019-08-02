module.exports = {
  
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-weather-app/'
    : '/'
  }

  // zwykly slash nie
  //. CORS
  ///'/vue-weather-app/'