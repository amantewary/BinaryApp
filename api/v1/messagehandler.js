const express = require('express');
const app = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Msg = require('../../models/message');
const Profile = require('../../models/profile');

//!Private Route
//Add New Message
app.post('/', passport.authenticate('jwt', {
  session: false
}), (request, response) => {
  const message = new Msg({
    message_body: request.body.message_body,
    name: request.body.name,
    profile_pic: request.body.profile_pic,
    user: request.user.id
  });
  message.save().then(message => response.json(message));
});

//Get All Messages
app.get('/', (request, response) => {
  Msg.find().sort({
    created_at: -1
  }).then(messages => response.json(messages)).catch(err => response.status(404).json({
    error: 'Messages Unavailable'
  }));
});

//Get Message By ID
app.get('/:id', (request, response) => {
  Msg.findById(request.params.id).then(messages => response.json(messages)).catch(err => response.status(404).json({
    error: 'Incorrect ID'
  }));
});

//!Private Route
//Delete Message By ID
app.delete('/:id', passport.authenticate('jwt', {
  session: false
}), (request, response) => {
  Profile.findOne({
    user: request.user.id
  }).then(profile => {
    Msg.findById(request.params.id).then(message => {
      if (message.user.toString() !== request.user.id) {
        return response.status(401).json({
          error: 'Unauthorized Access'
        });
      }

      message.remove().then(() => response.json({
        success: true
      }));
    }).catch(err => response.status(404).json({
      error: 'Message Not Found'
    }));
  })
});

//!Private Route
//Add a like to Message
app.post('/likes/:id', passport.authenticate('jwt', {
  session: false
}), (request, response) => {
  Profile.findOne({
    user: request.user.id
  }).then(profile => {
    Msg.findById(request.params.id).then(message => {
      if (message.likes.filter(like => like.user.toString() === request.user.id).length > 0) {
        return response.status(400).json({
          error: 'You Already liked This Message'
        });
      }
      message.likes.unshift({
        user: request.user.id
      });
      message.save().then(message => response.json(message));
    }).catch(err => response.status(404).json({
      error: 'Message Not Found'
    }));
  })
});

//!Private Route
//Delete Like from the Message
app.post('/dislikes/:id', passport.authenticate('jwt', {
  session: false
}), (request, response) => {
  Profile.findOne({
    user: request.user.id
  }).then(profile => {
    Msg.findById(request.params.id).then(message => {
      if (message.likes.filter(like => like.user.toString() === request.user.id).length === 0) {
        return response.status(400).json({
          error: "You Didn't Liked This Message"
        });
      }
      const remove = message.likes.map(item => item.user.toString()).indexOf(request.user.id);
      message.likes.splice(remove, 1);
      message.save().then(message => response.json(message));
    }).catch(err => response.status(404).json({
      error: 'Message Not Found'
    }));
  })
});

//Add New Comment
app.post('/comments/:id', passport.authenticate('jwt', {
  session: false
}), (request, response) => {
  Msg.findById(request.params.id).then(message => {
    const comment = {
      comment_body: request.body.comment_body,
      name: request.body.name,
      profile_pic: request.body.profile_pic,
      user: request.user.id
    }
    message.comments.unshift(comment);
    message.save().then(message => response.json(message));
  }).catch(err => response.status(404).json({
    error: 'Message Not Found'
  }));
});

//Delete Comment
app.delete('/comments/:id/:comment_id', passport.authenticate('jwt', {
  session: false
}), (request, response) => {
  Msg.findById(request.params.id).then(message => {
    if (message.comments.filter(comment => comment._id.toString() === request.params.comment_id).length == 0) {
      return response.status(404).json({
        error: 'Comment Not Found'
      });
    }

    const remove = message.comments.map(item => item._id.toString()).indexOf(request.params.comment_id);
    message.comments.splice(remove, 1);
    message.save().then(message => response.json(message));
  }).catch(err => response.status(404).json({
    error: 'Message Not Found'
  }));
});


module.exports = app;