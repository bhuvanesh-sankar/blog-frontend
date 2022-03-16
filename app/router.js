import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('trending', {path:'/'});
  this.route('login', {path: 'blog/login'});
  this.route('logout', {path: 'bog/logout'});
  this.route('signup', {path: 'blog/signup'});
  this.route('trending', {path: 'blog/trending'});
  this.route('create-post', {path: 'blog/posts/create'});
  this.route('post', {path: 'blog/posts/:id'});
  this.route('edit-post', {path:'blog/posts/edit/:id'});
  this.route('user-profile', {path: 'blog/users/profile/:id'});
});

export default Router;
