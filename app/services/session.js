import Service from '@ember/service';
import { inject as service } from '@ember/service';
import ApplicationConstants from '../constants/application';

export default Service.extend({
    ajax: service(),
    cookies: service(),

    init() {
        this._super(...arguments);
        if(this.get('cookies').exists(ApplicationConstants.COOKIES.USER)){
            this.set('isLoggedIn', true);
        }
        else {
            this.set('isLoggedIn', false);
        }
    },
    
    async login(email, password) {
        return new Promise(async (resolve, reject)=>{
            var payload = {email, password};
            await this.ajax.makeNetworkCall(ApplicationConstants.URL.SIGN_IN, ApplicationConstants.POST, ApplicationConstants.HEADERS, JSON.stringify(payload))
                .then((response) => {
                    if(response['isSuccess']) {
                        this.set('isLoggedIn', true);
                        this.get('cookies').write(ApplicationConstants.COOKIES.USER, JSON.stringify(response['user']));
                        resolve(response);
                    }
                    else {
                        reject(response);
                    }
                })
                .catch((err) => {
                    reject(err) 
                });
        });
    },

    async logout() {
        //
        let userCookie = ApplicationConstants.COOKIES.USER;
        document.cookie = userCookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=localhost; path=/blog;';
        return new Promise(async (resolve, reject)=>{
        await this.ajax.makeNetworkCall(ApplicationConstants.URL.SIGN_OUT, ApplicationConstants.POST, ApplicationConstants.HEADERS)
                .then((response) => {
                    this.set('isLoggedIn', false);
                    // this.get('cookies').clear(ApplicationConstants.COOKIES.USER)
                    //cookies.clear() isn't working, so deleting the cookie using js instead of ember
                    let userCookie = ApplicationConstants.COOKIES.USER;
                    document.cookie = userCookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=localhost; path=/blog;';
                    //  sessionStorage.removeItem(userCookie); 
                    resolve(response)
                })
                .catch((err) => {
                    let userCookie = ApplicationConstants.COOKIES.USER;
                    document.cookie = userCookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=localhost; path=/blog;';
                    reject(err)
                });
        });
    }
});
