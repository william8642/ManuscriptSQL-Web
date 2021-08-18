const config = {
    user :'sa',
    password:'xx',
    server:'140.xxx',
    database:'開發測試用MSN',
    requestTimeout:60000,

    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 60000
    },

    options:{
        trustedConnection: true,
        enableArithPort:true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
          },
    },
  
}

module.exports = config;