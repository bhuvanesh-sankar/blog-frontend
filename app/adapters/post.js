import DS from 'ember-data';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../constants/application';

export default DS.RESTAdapter.extend({
    cookies: service(),
    xhrFields: { withCredentials: true },
    ajax(url, method, hash) {
        hash = hash || {};
        hash.crossDomain = true;
        hash.xhrFields = {
          withCredentials: true
        };
        return this._super(url, method, hash);
      },

    handleResponse(status, headers, payload, requestData) {
        console.log({status});
        this._super(...arguments);
    },
    init() {
        this._super(...arguments);
        this.set('headers', {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
      },
    host: 'http://localhost:3000'
});