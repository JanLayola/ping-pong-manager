'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tournamentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  hostID: [{
    type: ObjectId,
    ref: 'User'
  }],
  date: {
    type: String,
    required: true
  },
  numberPlayers: {
    type: Number,
    required: true,
    enum: [4]
  },
  image: {
    type: String
  },
  players: [{
    type: ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
