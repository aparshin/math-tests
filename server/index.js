var express = require('express'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    fs = require('fs');

var app = express();

var STAT_FILENAME = 'results.json',
    USERS_FILENAME = 'users.json';

var users = JSON.parse(fs.readFileSync(USERS_FILENAME, 'utf8'));

passport.use(new LocalStrategy(
    function(username, password, done) {
        for (var n in users) {
            if (n.toLowerCase() === username.toLowerCase()) {
                if (users[n] === password) {
                    done(null, {username: username});
                } else {
                    done(null, false);
                }
                return;
            }
        }
        done(null, false);
    }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function(id, cb) {
    cb(null, {username: id});
});

app.use(cors({
    credentials: true,
    origin: true
}));
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/add', bodyParser.json(), function (req, res) {
    var newResult = req.body;
    fs.readFile(STAT_FILENAME, 'utf8', (err, data) => {

        var allResults = !err && data ? JSON.parse(data) : [];

        newResult.saveTime = new Date().valueOf();

        if (req.user) {
            newResult.user = req.user.username;
        }

        allResults.push(newResult);

        fs.writeFileSync(STAT_FILENAME, JSON.stringify(allResults));

        res.send('ok');
    })
})

app.get('/stat', (req, res) => {
    var allResults = JSON.parse(fs.readFileSync(STAT_FILENAME, 'utf8') || '[]');
    res.json(allResults);
})

app.get('/login', function(req, res){
    res.json(req.user || null);
})

app.post('/login', bodyParser.urlencoded({ extended: true }), function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);
        if (!user) {
            return res.status(403).json({
                message: "no user found"
            });
        }

        // Manually establish the session...
        req.login(user, function(err) {
            if (err) return next(err);
            return res.json({
                username: user.username
            });
        });

    })(req, res, next);
});

app.get('/logout', function(req, res){
    req.logout();
    res.json('Logouted');
});

app.listen(3456, function () {
    // console.log('Example app listening!');
});
