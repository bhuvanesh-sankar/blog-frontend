import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../constants/application'


export default Controller.extend({
    ajax: service(),
    router: service(),
    isSignUpFailed: false,
    errorMessage: '',
    actions:{
        signup: function(){
            let name = this.get("username");
            let password = this.get("password");
            let email = this.get("email");
            let dateOfBirth = this.get("dateOfBirth")
            if (new Date(dateOfBirth) > new Date()) {
                this.set("isSignUpFailed", true);
                this.set("errorMessage", "Enter valid date of birth");
                return;
            }
            let payload = {
                name,
                password,
                email,
                date_of_birth: dateOfBirth
            }
            this.ajax.makeNetworkCall(ApplicationConstants.URL.CREATE_USER, ApplicationConstants.POST, ApplicationConstants.HEADERS, JSON.stringify(payload))
                .then((response) => {
                    if(response['isSuccess']) {
                        this.set("isSignUpFailed", false);
                        this.set("errorMessage", "");
                        this.get('router').transitionTo('login');
                    }
                    else {
                        throw response;
                    }
                })
                .catch((err) => {
                    if(err['errorText'].hasOwnProperty('email') || err['errorText'].hasOwnProperty('password') || err['errorText'].hasOwnProperty('name')) {
                        let errorMessage = ApplicationConstants.ERRORMESSAGES[Object.keys(err['errorText'])[0]];
                        this.set("errorMessage", errorMessage);    
                    }
                    this.set("isSignUpFailed", true);
                })
        }
    }
});
