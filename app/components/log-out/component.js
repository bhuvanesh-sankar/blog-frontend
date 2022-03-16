import Component from '@ember/component';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../../constants/application';

export default Component.extend({
    session: service(),
    router: service(),
    actions:{
        logout: function(){
            this.session.logout()
                .then((data) => {
                    this.get('router').transitionTo('trending');
                })
                .catch((err) => {
                })
        }
    }
});
