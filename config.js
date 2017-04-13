// Change PROD_ENV to true before uploading the app
const PROD_ENV = false

// Variables according to environment
var URL = null

// Set variables
if (PROD_ENV) {
    console.log(' --- PRODUCTION ENVIRONMENT ---')
    URL = 'http://business.twenty-one.co/'
} else {
    console.log(' --- DEVELOPMENT ENVIRONMENT ---')
    URL = 'http://localhost:3000/'
}

// Export Variables
module.exports = {
    URL: URL,
    URL_FOR_USERS: URL + 'users'
}