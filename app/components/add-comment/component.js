import Component from '@ember/component';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../../constants/application';

export default Component.extend({
    ajax: service(),
    router: service(),
    init () {
        this._super();
    },
    actions: {
        addComment(){
            let comment = this.get('comment');
            
            let postId = this.get('attrs').postId.value
            let payload = {
                post_id: postId,
                description: comment
            }
            this.ajax.makeNetworkCall(ApplicationConstants.URL.ADD_COMMENT, ApplicationConstants.POST, ApplicationConstants.HEADERS, JSON.stringify(payload))
                .then((response) => {
                    if(response['isSuccess']) {
                        window.location.reload();
                    }
                    else {
                        let errorMessage = "";
                        errorMessage = response["errorText"];
                        window.alert(errorMessage);
                        this.set('comment', '');
                    }
                })
                .catch((err) => {
                    window.alert("Unable to add comment.  ");
                    this.set('comment', '');
                })
        }
    }
  
});
