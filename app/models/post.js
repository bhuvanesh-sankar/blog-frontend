import DS from 'ember-data';

export default DS.Model.extend({
    user_id: DS.attr(),
    title: DS.attr(),
    description: DS.attr(),
    image_url: DS.attr(),
    post_type_id: DS.attr()
});
