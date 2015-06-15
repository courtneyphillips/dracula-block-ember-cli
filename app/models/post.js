import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.belongsTo('author'),
  comment: DS.hasMany('comment'),
  body: DS.attr('string'),
  title: DS.attr('string'),
});
