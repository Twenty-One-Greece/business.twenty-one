// Change PROD_ENV to true before uploading the app
const PROD_ENV = false

// Variables according to environment
export var URL

// Set variables
if (PROD_ENV) {
    URL = 'http://business.twenty-one.co/'
    console.log(' PRODUCTION ENVIRONMENT ----- ' + URL)
} else {
    URL = 'http://localhost:3000/'
    console.log(' DEVELOPMENT ENVIRONMENT ----- ' + URL)
}

export const URL_FOR_USERS = URL + 'users'