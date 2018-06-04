const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const passport = require("passport");
const mongoose = require("mongoose");

// Load Input Validation
const validateProfileInput = require("../../validation/profile");

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["email", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "This user does not have a profile";
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["email", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profiles: "There are no profiles" }));
});
// @route   GET api/profile/handle/:handle
// @desc    Get user profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["email", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile =
          "There is no profile with this handle: " + req.params.handle;
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get user profile by user id
// @access  Public
router.get("/user/:id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.id })
    .then(profile => {
      res.json(profile);
    })
    // If we are searching by id error is catched
    .catch(err =>
      res
        .status(404)
        .json({ profile: "There is no profile with this id: " + req.params.id })
    );
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Input validation
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.occupation) profileFields.occupation = req.body.occupation;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.webpage) profileFields.webpage = req.body.webpage;
    if (req.body.speciality) profileFields.speciality = req.body.speciality;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.height) profileFields.height = req.body.height;
    if (req.body.agency) profileFields.agency = req.body.agency;
    // Social
    profileFields.social = {};
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.ig) profileFields.social.ig = req.body.ig;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        // Create
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "This handle is already taken";
            res.status(400).json(errors);
          }
          // Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      } else {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      }
    });
  }
);

// @route   POST api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
