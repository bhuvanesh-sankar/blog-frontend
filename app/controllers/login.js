import Controller from '@ember/controller';
import Ember from 'ember';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../constants/application';

export default Controller.extend({
    session: service(),
    ajax: service(),
    router: service(),
    loginFailed: false,
    actions:{
        login: function(){
            let email = this.get("email");
            let password = this.get("password");

            this.session.login(email, password)
                .then((data) => {
                    this.set("loginFailed", false);
                    this.set("email", "");
                    this.set("password", "");
                    this.get('router').transitionTo('trending');
                })
                .catch((err) => {
                    this.set("loginFailed", true);
                })
            // this.store.findRecord('user', 1);
            // let person = this.store.createRecord('user', {
            //     name: 'shane',
            //     email: 'shane5@gmail.com',
            //     password: 'shane123',
            //     date_of_birth: "25-12-1995"
            // })
            // person.save();
        }
    }
});    

