var CommentsCountComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    console.warn('this.state', this.state);
    return {
      commentsCount: Comments.find({postId: this.props.postId}).count()
    };
  },
  render() {
    return <a href={this.props.path}>{this.data.commentsCount} comments</a>;
  }
});

Template.postItem.helpers({
  CommentsCountComponent: function() {
    return CommentsCountComponent;
  },
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
  // commentsCount: function() {
  //   return Comments.find({postId: this._id}).count();
  // }
});
