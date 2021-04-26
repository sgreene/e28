export const axios = require('axios').create(
    {
        baseURL: 'http://e28api.trinigooner.loc/',
        responseType: 'json'
    }
)