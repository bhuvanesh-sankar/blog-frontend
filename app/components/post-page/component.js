import Component from '@ember/component';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../../constants/application';

export default Component.extend({
    cookies: service(),
    router: service(),
    ajax: service(),
    init() {
        this._super();
        this.set('canDeletePost', false);
        this.set('canEditPost', false);
        let userIdOfCurrentPost = this.get('attrs').post.value.user_id;
        if(this.get('cookies').exists(ApplicationConstants.COOKIES.USER)){
            let userCookie = JSON.parse(this.get('cookies').read(ApplicationConstants.COOKIES.USER));
            let currentLoggedInUserId = userCookie.id;
            if(currentLoggedInUserId == userIdOfCurrentPost) {
                this.set('canDeletePost', true);
                this.set('canEditPost', true);
                
            }
            else {
                this.set('canDeletePost', false);
                this.set('canEditPost', false);
            }
        }
    },
    actions: {
        deletePost() {
            console.log('delete clicked')
            let postId = this.get('attrs').post.value.id;
            this.ajax.makeNetworkCall(ApplicationConstants.URL.DELETE_POST + postId, ApplicationConstants.DELETE, ApplicationConstants.HEADERS)
                .then((response) => {
                    if(response['isSuccess']) {
                        this.get("router").transitionTo("trending");
                        window.alert("Post deleted successfully")
                    }
                    else {
                        window.alert('Unable to delete post');
                    }
                    
                })
                .catch((err) => {
                    window.alert('Unable to delete post');
                })
        }
    }    
});
