'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const bcrypt = require('bcrypt');
const parser = require('../config/cloudinary.js');

const saltRounds = 10;

const { isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddlewares');

/* GET users listing. */
router.get('/:username/tournaments', isNotLoggedIn, async (req, res, next) => {
  try {
    const username = req.params;
    const user = await User.findOne(username);
    const tournamentsList = await Tournament.find();
    tournamentsList.forEach((tournament) => {
      if (user._id.equals(tournament.hostID[0])) {
        tournament.iAmHost = true;
      } if (tournament.fase1.length > 1 || tournament.fase2.length > 1 || tournament.fase3.length > 1) {
        tournament.started = true;
      }
    });
    const data = {
      tournaments: true,
      user: user,
      userId: user._id,
      tournamentsList
    };
    res.render('tournaments/play', data);
  } catch (error) {
    next(error);
  }
});

router.get('/profile/:username', isNotLoggedIn, async (req, res, next) => {
  try {
    const username = req.params;
    const user = await User.findOne(username);
    const data = {
      tournaments: true,
      user: user
    };
    res.render('profile/view', data);
  } catch (error) {
    next(error);
  }
});

router.get('/profile/:username/update', isNotLoggedIn, async (req, res, next) => {
  try {
    const username = req.params;
    const user = await User.findOne(username);

    const data = {
      tournaments: true,
      user: user,
      countries: ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegowina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, the Democratic Republic of the', 'Cook Islands', 'Costa Rica', "Cote d'Ivoire", 'Croatia (Hrvatska)', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'France Metropolitan', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and Mc Donald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran (Islamic Republic of)', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', "Korea, Democratic People's Republic of", 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', "Lao, People's Democratic Republic", 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia (Slovak Republic)', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'St. Helena', 'St. Pierre and Miquelon', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Türkiye', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin Islands (British)', 'Virgin Islands (U.S.)', 'Wallis and Futuna Islands', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zambia', 'Zimbabwe']
    };
    res.render('profile/update', data);
  } catch (error) {
    next(error);
  }
});

router.post('/profile/:username/update', isNotLoggedIn, isFormFilled, async (req, res, next) => {
  try {
    const { username, password, email, city, country } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userQuery = req.session.currentUser.username;

    const updatedUser = {
      username,
      password: hashedPassword,
      email,
      city,
      country
    };
    await User.findOneAndUpdate(userQuery, updatedUser);

    req.session.currentUser = updatedUser;

    res.redirect('/users/{{currentUser.username}}/tournaments');
  } catch (error) {
    next(error);
  }
});

router.post('/tournament/:id/results', isNotLoggedIn, async (req, res, next) => {
  try {
    const { winner, champion } = req.body;
    console.log(req.body);
    console.log(winner);
    const id = req.params.id;
    await Tournament.findByIdAndUpdate(id, { $push: { fase4: winner } });
    await Tournament.findByIdAndUpdate(id, { $push: { winner: champion } });
    res.redirect(`/users/tournaments/${id}/live`);
  } catch (error) {
    next(error);
  }
});

router.get('/:username/tournaments/create', isNotLoggedIn, async (req, res, next) => {
  try {
    const username = req.params;
    const user = await User.findOne(username);
    const data = {
      tournaments: true,
      user: user
    };
    res.render('tournaments/create', data);
  } catch (error) {
    next(error);
  }
});

router.get('/:username/tournaments/ranking', isNotLoggedIn, async (req, res, next) => {
  try {
    const data = {
      tournaments: true
    };
    res.render('tournaments/ranking', data);
  } catch (error) {
    next(error);
  }
});

router.get('/:username/tournaments/manage', isNotLoggedIn, async (req, res, next) => {
  try {
    const username = req.params;
    const user = await User.findOne(username);
    const tournamentsList = await Tournament.find();
    tournamentsList.forEach((tournament) => {
      if (user._id.equals(tournament.hostID[0])) {
        tournament.iAmHost = true;
      }
    });
    const data = {
      tournaments: true,
      user: user,
      userId: user._id,
      tournamentsList
    };
    res.render('tournaments/manage', data);
  } catch (error) {
    next(error);
  }
});

router.post('/tournaments/:id/start', isNotLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentTournament = await Tournament.findById(id);
    const array = currentTournament.players;
    const shuffle = () => {
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    };
    if (currentTournament.players.length === 4) {
      await Tournament.findByIdAndUpdate(id, { $push: { fase3: currentTournament.players } });
    } else if (currentTournament.players.length === 8) {
      await Tournament.findByIdAndUpdate(id, { $push: { fase2: currentTournament.players } });
    } else if (currentTournament.players.length === 16) {
      await Tournament.findByIdAndUpdate(id, { $push: { fase1: currentTournament.players } });
    }
    shuffle(array);
    res.redirect(`/users/tournaments/${currentTournament._id}/live`);
  } catch (error) {
    next(error);
  }
});

router.post('/tournaments/create', parser.single('image'), isNotLoggedIn, async (req, res, next) => {
  try {
    const { name, location, date, players } = req.body;
    const { currentUser } = req.session;
    let imageurl = '';
    if (req.file) {
      imageurl = req.file.secure_url;
    }
    console.log(req.body);

    const response = await Tournament.create({
      name,
      location,
      date,
      numberPlayers: players,
      image: imageurl
    });
    const userId = req.session.currentUser._id;
    await Tournament.findByIdAndUpdate(response._id, { $push: { hostID: userId } });
    res.redirect(`/users/${currentUser.username}/tournaments`);
  } catch (error) {
    next(error);
  }
});

router.get('/tournaments/:id/live', isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params;

  const tournamentF3 = await Tournament.findById(id).populate('fase3');
  const tournamentF4 = await Tournament.findById(id).populate('fase4');
  const winner = await Tournament.findById(id).populate('winner');
  try {
    const data = {
      fase3: tournamentF3.fase3,
      fase4: tournamentF4.fase4,
      winner: winner.winner,
      name: tournamentF3.name,
      tournaments: true,
      id: tournamentF3._id
    };
    res.render('tournaments/live', data);
  } catch (error) {
    next(error);
  }
});

router.post('/tournaments/:id', isNotLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.session.currentUser._id;
    const currentTournament = await Tournament.findById(id);
    let inTournament = false;
    currentTournament.players.forEach(player => {
      console.log(player);
      if (player.equals(userId)) {
        inTournament = true;
      }
    });
    if (!inTournament && currentTournament.players.length < 4) {
      await Tournament.findByIdAndUpdate(id, { $push: { players: userId } });
      res.redirect('tournaments/view');
    } else {
      console.log('No space for you fuck');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
