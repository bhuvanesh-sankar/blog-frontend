import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr(),
    name: DS.attr(),
    date_of_birth: DS.attr(),
    password: DS.attr()
});
