Posts = new Mongo.Collection('posts');

ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var post = _.extend(_.pick(postAttributes, 'url', 'message'), {
      title: postAttributes.title + (this.isSimulation ? '(client)' : '(server)'),
      userId: user._id,
      author: user.emails[0].address,
      submitted: new Date().getTime()
    });

    // ждем 5 секунд
    // if (! this.isSimulation) {
    //   var Future = Npm.require('fibers/future');
    //   var future = new Future();
    //   Meteor.setTimeout(function() {
    //     future.return();
    //   }, 5 * 1000);
    //   future.wait();
    // }

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  }
});
