import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../constants/application';

export default Route.extend({
    ajax: service(),
    async model() {
        let posts = [];
        await this.ajax.makeNetworkCall(ApplicationConstants.URL.GET_ALL_POSTS, ApplicationConstants.GET, ApplicationConstants.HEADERS)
            .then(response =>{
                if(response.isSuccess) {
                    posts = response.posts;
                }
            })
            .catch(err => {
            })
        posts.reverse();
        return posts;
    }
});
