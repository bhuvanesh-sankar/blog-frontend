import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../constants/application';

export default Route.extend({
    ajax: service(),
    async model(params) {
        let responseObj = {};
        await this.ajax.makeNetworkCall(ApplicationConstants.URL.GET_SPECIFIC_USER + params.id, ApplicationConstants.GET, ApplicationConstants.HEADERS)
            .then(response =>{
                if(response.isSuccess){
                    responseObj['isSuccess'] = true;
                    responseObj['user'] = response.user;
                }
                else{
                    responseObj['isSuccess'] = false;
                    responseObj['errorText'] = 'Oops... Unable to retrieve user data.'
                } 
            })
            .catch(err => {
                responseObj['isSuccess'] = false;
                responseObj['errorText'] = 'Oops... Unable to retrieve user data.'
            })
    
        await this.ajax.makeNetworkCall(ApplicationConstants.URL.GET_USER_SPECIFIC_POSTS + params.id, ApplicationConstants.GET, ApplicationConstants.HEADERS)
            .then(response =>{
                if(response.isSuccess){
                    responseObj['posts'] = response.posts.reverse();
                } 
            })
            .catch(err => {
                responseObj['posts'] = [];
            })
        return responseObj;
    }
});
