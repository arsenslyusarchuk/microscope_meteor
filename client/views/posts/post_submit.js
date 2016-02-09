Template.postSubmit.events({
  'submit form': function(event) {
    event.preventDefault();

    var post = {
      url: $(event.target).find('[name=url]').val(),
      title: $(event.target).find('[name=title]').val()
    }

    Meteor.call('postInsert', post, function(error, result) {
      if (error)
        return alert(error.reason);

      // show this result but route anyway
      if (result.postExists)
        throwError('This link has already been posted');
    });
    Router.go('postsList');
  }
});
