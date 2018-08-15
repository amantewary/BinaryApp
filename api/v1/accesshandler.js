const bcrypt = require("bcryptjs");
const express = require("express");
const app = express.Router();
const token = require("jsonwebtoken");
const passport = require("passport");

const config = require("../../config/config");
const Access = require("../../models/access");

//User Registration
app.post("/registration", (request, response) => {
  Access.findOne({
    email: request.body.email
  })
    .then(user => {
      if (user) {
        return response.status(400).json({
          email: "Entered Email Already Registered."
        });
      } else {
        const new_user = new Access({
          name: request.body.name,
          email: request.body.email,
          password: request.body.password,
          password2: request.body.password2,
          profile_pic: request.body.profile_pic
        });
        //Generating Salt with size 10
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            throw err;
          }
          //Generating Hash
          bcrypt.hash(new_user.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            new_user.password = hash;
            new_user
              .save()
              .then(user => response.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

//User Login
app.post("/login", (request, response) => {
  Access.findOne({
    email: request.body.email
  })
    .then(user => {
      if (!user) {
        return response.status(404).json({
          email: "Entered Email Does Not Exist. Create your FREE Binary Account"
        });
      }
      bcrypt.compare(request.body.password, user.password).then(correct => {
        if (correct) {
          //Generating Payload
          const payload = {
            id: user.id,
            name: user.name,
            profile_pic: user.profile_pic
          };
          token.sign(
            payload,
            config.secret,
            {
              expiresIn: 3600 //One hour expiry//TODO: Change it to one day
            },
            (err, new_token) => {
              response.json({
                success: true,
                token: "Bearer " + new_token
              });
            }
          );
        } else {
          return response.status(400).json({
            password: "Incorrect Password! Please Try Again"
          });
        }
      });
    })
    .catch(err => console.log(err));
});

//*This is a private route
//!Can't be accessed without authentication
//Get Current User
app.get(
  "/current/user",
  passport.authenticate("jwt", {
    session: false
  }),
  (request, response) => {
    response.json({
      user_id: request.user.id,
      name: request.user.name,
      email: request.user.email
    });
  }
);

module.exports = app;
