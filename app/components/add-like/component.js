import Component from '@ember/component';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../../constants/application';

export default Component.extend({
    ajax: service(),
    init () {
        this._super();
    },
    actions: {
        addLike(){
            let postId = this.get('attrs').postId.value
            let payload = {
                post_id: postId
            }
            this.ajax.makeNetworkCall(ApplicationConstants.URL.ADD_LIKE, ApplicationConstants.POST, ApplicationConstants.HEADERS, JSON.stringify(payload))
                .then((response) => {
                    if(response['isSuccess']) {
                        window.location.reload();
                    }
                    else {
                        let errorMessage = '';
                        errorMessage = response['errorText'];
                        window.alert(errorMessage);
                    }
                    
                })
                .catch((err) => {
                    console.log(`err -> ${err}`)
                    let errorMessage = '';
                    // errorMessage = response['errorText'];
                    window.alert('Unable to like post.  ' + errorMessage);
                });
        },
        disLike() {
            let postId = this.get('attrs').postId.value
            this.ajax.makeNetworkCall(ApplicationConstants.URL.REMOVE_LIKE + postId, ApplicationConstants.DELETE, ApplicationConstants.HEADERS)
                .then((response) => {
                    if(response['isSuccess']) {
                        window.location.reload();
                    }
                    else {
                        let errorMessage = '';
                        errorMessage = response['errorText'];
                        window.alert(errorMessage);
                    }
                })
                .catch((err) => {
                })
        }
    }
});
