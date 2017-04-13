import {autorun, observable} from 'mobx'

class Main {
    
    @observable user = {}


    setUserInfo(user) {
        this.user = user
        location.href = '#/dashboard'
        console.log('Logged In')
    }
}

const mainStore = new Main();
export default mainStore