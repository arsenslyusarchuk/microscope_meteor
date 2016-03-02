Comments = new Mongo.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();
    check(commentAttributes, {
      postId: String,
      body: String
    });
    var post = Posts.findOne(commentAttributes.postId);
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");
    if (!commentAttributes.body)
      throw new Meteor.Error(422, 'Please write some content');
    if (!post)
      throw new Meteor.Error(422, 'You must comment on a post');
    comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
      userId: user._id,
      author: user.emails[0].address,
      submitted: new Date().getTime()
    });
    // создаем комментарий и сохраняем id
    comment._id = Comments.insert(comment);
    // создаем уведомление, информируя пользователя о новом комментарии
    createCommentNotification(comment);
    return comment._id;
  }
});
