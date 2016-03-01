Template.postItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  commentsCount: function() {
    // console.log('parentTemplate');
    // console.log(Template.parentData());
    // console.log(Comments.find().count())
    return Comments.find({postId: this._id}).count();
    // return comments.find({postId: this._id}).count();
  }
});
