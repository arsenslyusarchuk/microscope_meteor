///////////////Posts///////////////////

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

///////////////Comments///////////////////

Meteor.publish('comments', function(postId) {
  // check(postId, String);
  // return Comments.find({postId: postId});
  return Comments.find({});
});

Meteor.publish('comments_for_post', function(postId) {
  check(postId, String);
  return Comments.find({postId: postId});
});
