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
    enum: [4, 8, 16]
  },
  image: {
    type: String
  },
  players: [{
    type: ObjectId,
    ref: 'User'
  }],
  fase1: [{
    type: ObjectId,
    ref: 'User'
  }],
  fase2: [{
    type: ObjectId,
    ref: 'User'
  }],
  fase3: [{
    type: ObjectId,
    ref: 'User'
  }],
  results3: [{
    type: String
  }],
  winner: [{
    type: ObjectId,
    ref: 'User'
  }],
  started: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
