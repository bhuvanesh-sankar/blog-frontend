import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../constants/application';

export default Route.extend({
    ajax: service(),
    async model(params) {
        let responseObj = {};
        await this.ajax.makeNetworkCall(ApplicationConstants.URL.GET_SPECIFIC_POST + params.id, ApplicationConstants.GET, ApplicationConstants.HEADERS)
            .then(response =>{
                if(response.isSuccess){
                    responseObj['isSuccess'] = true;
                    responseObj['post'] = response.post[0];
                }
                else{
                    responseObj['isSuccess'] = false;
                    responseObj['errorText'] = 'Oops... Unable to retrieve post.'
                } 
            })
            .catch(err => {
                responseObj['isSuccess'] = false;
                responseObj['errorText'] = 'Oops... Unable to retrieve post.'
            })
        return responseObj;
    }
});
