import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../constants/application';

export default Controller.extend({
    session: service(),
    router: service(),
    actions:{
        logout: function(){
            this.session.logout()
                .then((data) => {
                    this.get('router').transitionTo('trending');
                });
        }
    }
});
