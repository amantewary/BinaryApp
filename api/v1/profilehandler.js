const express = require("express");
const app = express.Router();
const passport = require("passport");

const Profile = require("../../models/profile");

//!Private Route
//Get Profile of Logged In User
app.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (request, response) => {
    Profile.findOne({
      user: request.user.id
    })
      .populate("user", ["name", "profile_pic"])
      .then(profile => {
        if (!profile) {
          return response.status(404).json({
            profile: "Profile Not Found"
          });
        }
        response.json(profile);
      })
      .catch(err => response.status(404).json(err));
  }
);

//!Private Route
//Create Profile of Registered User
app.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (request, response) => {
    const userInfo = {};
    userInfo.user = request.user.id;
    if (request.body.username) {
      userInfo.username = request.body.username;
    }
    if (request.body.employer_name) {
      userInfo.employer_name = request.body.employer_name;
    }
    if (request.body.website) {
      userInfo.website = request.body.website;
    }
    if (request.body.address) {
      userInfo.address = request.body.address;
    }
    if (request.body.current_role) {
      userInfo.current_role = request.body.current_role;
    }
    if (request.body.github) {
      userInfo.github = request.body.github;
    }
    if (typeof request.body.skills !== "undefined") {
      userInfo.skills = request.body.skills.split(",");
    }

    Profile.findOne({
      user: request.user.id
    }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          {
            user: request.user.id
          },
          {
            $set: userInfo
          },
          {
            new: true
          }
        ).then(profile => response.json(profile));
      } else {
        Profile.findOne({
          username: userInfo.username
        }).then(profile => {
          if (profile) {
            return response.status(400).json({
              errors: "Username Taken"
            });
          }
          new Profile(userInfo).save().then(profile => response.json(profile));
        });
      }
    });
  }
);

//!Public route -- (Optional)
//Get User Profile By Username
app.get("/username/:username", (request, response) => {
  Profile.findOne({
    username: request.params.username
  })
    .populate("user", ["name", "profile_pic"])
    .then(profile => {
      if (!profile) {
        return response.status(400).json({
          error: "Profile Not Found"
        });
      }
      response.json(profile);
    })
    .catch(err => response.status(404).json(err));
});

//!Public route -- (Optional)
//Get User Profile By ID
app.get("/user/:user_id", (request, response) => {
  Profile.findOne({
    user: request.params.user_id
  })
    .populate("user", ["name", "profile_pic"])
    .then(profile => {
      if (!profile) {
        return response.status(400).json({
          error: "Profile Not Found"
        });
      }
      response.json(profile);
    })
    .catch(err => response.status(404).json(err));
});

//Get All Existing User Profile
app.get("/all", (request, response) => {
  Profile.find()
    .populate("user", ["name", "profile_pic"])
    .then(profiles => {
      if (!profiles) {
        return response.status(400).json({
          error: "No Profile Available"
        });
      }
      response.json(profiles);
    })
    .catch(err => response.status(404).json(err));
});

//!Private Route
//Add Work Experience
app.post(
  "/exp",
  passport.authenticate("jwt", {
    session: false
  }),
  (request, response) => {
    Profile.findOne({
      user: request.user.id
    })
      .then(profile => {
        const Exp = {
          role: request.body.role,
          employer_name: request.body.employer_name,
          address: request.body.address,
          started: request.body.started,
          ended: request.body.ended,
          is_current: request.body.is_current,
          desc: request.body.desc
        };

        profile.exp.unshift(Exp);
        profile.save().then(profile => response.json(profile));
      })
      .catch(err => response.status(404).json(err));
  }
);

//!Private Route
//Add Education Details
app.post(
  "/edu",
  passport.authenticate("jwt", {
    session: false
  }),
  (request, response) => {
    Profile.findOne({
      user: request.user.id
    })
      .then(profile => {
        const Edu = {
          institution_name: request.body.institution_name,
          degree_type: request.body.degree_type,
          field: request.body.field,
          started: request.body.started,
          ended: request.body.ended,
          is_current: request.body.is_current,
          desc: request.body.desc
        };

        profile.edu.unshift(Edu);
        profile.save().then(profile => response.json(profile));
      })
      .catch(err => response.status(404).json(err));
  }
);

//!Private Route
//Delete Work Experience
app.delete(
  "/exp/:exp_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (request, response) => {
    Profile.findOne({
      user: request.user.id
    })
      .then(profile => {
        const remove = profile.exp
          .map(item => item.id)
          .indexOf(request.params.exp_id);

        profile.exp.splice(remove, 1);

        profile.save().then(profile => response.json(profile));
      })
      .catch(err => response.status(404).json(err));
  }
);

//!Private Route
//Delete Education Qualification
app.delete(
  "/edu/:edu_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (request, response) => {
    Profile.findOne({
      user: request.user.id
    })
      .then(profile => {
        const remove = profile.edu
          .map(item => item.id)
          .indexOf(request.params.edu_id);

        profile.edu.splice(remove, 1);

        profile.save().then(profile => response.json(profile));
      })
      .catch(err => response.status(404).json(err));
  }
);

module.exports = app;
