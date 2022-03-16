import Component from '@ember/component';
import Ember from 'ember';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../constants/application';

export default Component.extend({
    ajax: service(),
    session: service(),
    router: service(),
    cookies: service(),
    init() {
        this._super();
        if(this.get('cookies').exists(ApplicationConstants.COOKIES.USER)){
            let userCookie = JSON.parse(this.get('cookies').read(ApplicationConstants.COOKIES.USER));
            this.set('username', userCookie.name);
            this.set('userid', userCookie.id);
        }
        else {
            this.set('username', 'user');
            this.set('userid', 0);
        }

    }
});
