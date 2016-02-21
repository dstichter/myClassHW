var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var mysql = require('mysql')
var session = require('express-session')
var Sequelize = require('sequelize')
var sequelize = new Sequelize('lab', 'root');
var bcrypt = require('bcryptjs');

var Student = sequelize.define('Student', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  classes: Sequelize.STRING,
  username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: {
				args: [5,32],
				msg: "Your password must be between 5-32 characters"
			},
		}
	}
}, {
	hooks: {
		beforeCreate: function(input){
			input.password = bcrypt.hashSync(input.password, 08301992);
		}
	}
});
var Teacher = sequelize.define('Teacher', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  classes: Sequelize.STRING,
  ta: Sequelize.BOOLEAN
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [5,32],
        msg: "Your password must be between 5-32 characters"
      },
    }
  }
}, {
	hooks: {
		beforeCreate: function(input){
			input.password = bcrypt.hashSync(input.password, 08301992);
		}
	}
});

var PORT = process.env.NODE_ENV || 8000;
var app = express();

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: 'the quick brown fox jumps over the lazy dog',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  },
  saveUninitialized: true,
  resave: false
}));

connection.sync().then(function() {
  app.listen(port, function() {
      console.log("Listening on:" + port)
  });
});
