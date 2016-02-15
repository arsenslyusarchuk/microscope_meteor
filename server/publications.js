Meteor.publish('posts', function(options)  {
  check(options, {
    sort: Object,
    limit: Number
  })
  return Posts.find({}, {sort: options.sort, limit: options.limit});
});

Meteor.publish('singlePost', function(id) {
  check(id, String);
  return id && Posts.find(id);
});
