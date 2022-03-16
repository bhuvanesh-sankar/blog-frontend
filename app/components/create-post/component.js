import Component from '@ember/component';
import {inject as service} from '@ember/service';
import ApplicationConstants from '../../constants/application';

export default Component.extend({
    ajax: service(),
    router: service(),
    store: service(),
    init() {
        this._super()
        this.postTitle = '';
        this.postDescription = '';
        this.imageUrl = '';
        this.postTypes;
        this.selectedPostType = '';
        let type = this.get('attrs').type;
        if(type == 'edit') {
            this.set('edit', 1);
            this.set('create', 0);
            let postId = this.get('attrs').postId.value.id;
            this.set('postId', postId);
            this.set("isPostEditFailed", false);
        }
        else {
            this.set('create', 1);
            this.set('edit', 0);
            this.set("isPostCreationFailed", false);
        }
    },
    async updatePost() {
        //update post
        this.set("isPostEditFailed", false);
        this.selectedPostType = document.getElementById('postType').value;
        if(!this.postTitle && !this.postDescription && !this.imageUrl && !this.selectedPostType) {
            this.set("isPostEditFailed", true);
            return;
        }
        let payload = {}
        if(this.postTitle != '') {
            payload.title = this.postTitle;
        }
        if(this.postDescription != '') {
            payload.description = this.postDescription
        }
        if(this.imageUrl != '') {
            payload.image_url = this.imageUrl;
        }

        if(this.selectedPostType) {
            payload.post_type_id = this.selectedPostType;
        }
            
        await this.ajax.makeNetworkCall(ApplicationConstants.URL.EDIT_POST + this.get('postId'), ApplicationConstants.PUT, ApplicationConstants.HEADERS, JSON.stringify(payload))
        .then(response => {
            this.set('postTitle', '');
            this.set('postDescription', '');
            this.set('imageUrl', '');
            this.set('selectedPostType', '');
            if(response.isSuccess) {
                this.set("isPostEditFailed", false);
                this.get('router').transitionTo('post', response['post'].id);
            }
            else {
                this.set("isPostEditFailed", true);
            } 
        })
        .catch(err => {
            this.set("isPostEditFailed", true);
        })
    },

    async createPost() {
        this.selectedPostType = document.getElementById('postType').value;
        if(this.postTitle && this.postDescription && this.imageUrl) {
            this.set("isPostCreationFailed", false);
            let payload = {
                title: this.postTitle,
                description: this.postDescription,
                post_type_id: this.selectedPostType,
                image_url: this.imageUrl
            }
            let post = this.store.createRecord('post', payload);
            post.save()
                .then(response => {
                    console.log('inside then')
                    console.log({response});
                    this.set("isPostCreationFailed", false);
                    this.get('router').transitionTo('post', response.id);
                })
                .catch(err => {
                    this.set("isPostCreationFailed", true);
                    console.log('inside catch - ', JSON.stringify(err))
                })
        }
        else {
            this.set("isPostCreationFailed", true);
        }
    },
    
    
    /*
    async createPost() {
        this.selectedPostType = document.getElementById('postType').value;
            if(this.postTitle && this.postDescription && this.imageUrl) {
                this.set("isPostCreationFailed", false);
                let payload = {
                    title: this.postTitle,
                    description: this.postDescription,
                    post_type_id: this.selectedPostType,
                    image_url: this.imageUrl
                }
                await this.ajax.makeNetworkCall(ApplicationConstants.URL.CREATE_POST, ApplicationConstants.POST, ApplicationConstants.HEADERS, JSON.stringify(payload))
                .then(response => {
                    this.set('postTitle', '');
                    this.set('postDescription', '');
                    this.set('imageUrl', '');
                    this.set('selectedPostType', '');
                    if(response.isSuccess) {
                        this.set("isPostCreationFailed", false);
                        this.get('router').transitionTo('post', response['post'].id);
                    }
                    else {
                        this.set("isPostCreationFailed", true);
                    } 
                })
                .catch(err => {
                    this.set("isPostCreationFailed", true);
                })
            }
            else {
                this.set("isPostCreationFailed", true);
            }
    },  */

    actions: {
        handlePost() {
            if(this.get('edit')==1) {
                this.updatePost();
            }
            else {
                this.createPost();
            }
        }
    }
});
