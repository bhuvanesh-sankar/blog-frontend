import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../constants/application';

export default Route.extend({
    ajax: service(),
    async model() {
        let postTypes = [];
        await this.ajax.makeNetworkCall(ApplicationConstants.URL.GET_POST_TYPES, ApplicationConstants.GET, ApplicationConstants.HEADERS)
            .then(response => {
                if(response.isSuccess && response.postsType.length > 0) {
                    for(let type of response.postsType) {
                        postTypes.push({
                            id: type.id, 
                            post_type: type.post_type});
                    }
                } 
            });
        return postTypes;
    }
});
