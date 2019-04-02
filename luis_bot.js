/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ______     ______     ______   __  __     __     ______
 /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
 \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
 \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
 \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/

 This is a sample Slack bot built with Botkit.

 This bot demonstrates many of the core features of Botkit:

 * Connect to Slack using the real time API
 * Receive messages based on "spoken" patterns
 * Send a message with attachments
 * Send a message via direct message (instead of in a public channel)

 # RUN THE BOT:

 Get a Bot token from Slack:

 -> http://my.slack.com/services/new/bot

 Run your bot from the command line:

 token=<MY TOKEN> serviceUri=<LUIS_SERVICE_URI>node demo_bot.js

 # USE THE BOT:

 Find your bot inside Slack to send it a direct message.

 Say: "Hello"

 The bot will reply "Hello!"

 Make sure to invite your bot into other channels using /invite @<my bot>!

 # EXTEND THE BOT:

 Botkit has many features for building cool and useful bots!

 Read all about it here:

 -> http://howdy.ai/botkit

 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var env = require('node-env-file');
env(__dirname + '/.env');

//Log Helper
const logHelper = require("./util/logHelper");

var Botkit = require('botkit');
var debug = require('debug')('botkit:main');

var botkitStoragePostgres = require('./node_modules/botkit-storage-postgres');

var bot_options = {
    replyWithTyping: false,
    storage: botkitStoragePostgres({
        host: process.env.BOTKIT_STORAGE_POSTGRES_HOST,
        port: process.env.BOTKIT_STORAGE_POSTGRES_PORT,
        user: process.env.BOTKIT_STORAGE_POSTGRES_USER,
        password: process.env.BOTKIT_STORAGE_POSTGRES_PASSWORD,
        database: process.env.BOTKIT_STORAGE_POSTGRES_DATABASE
    })
};

//Localization
// Source: https://github.com/noveogroup-amorgunov/localizify
const localizify = require('./node_modules/localizify');

const de = require('./localization/de');

localizify
    .add('de', de)
    .setLocale('de');

var luis = require('./node_modules/botkit-middleware-luis/src/luis-middleware');

if (!process.env.serviceUri) {
    logHelper.error('Error: Specify Luis service uri');
    process.exit(1);
}

var luisOptions = {serviceUri: process.env.serviceUri};

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.socketbot(bot_options);

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')(controller);

// Open the web socket server
controller.openSocketServer(controller.httpserver);

//Add Luis Middleware to controller
controller.middleware.receive.use(luis.middleware.receive(luisOptions));

// Start the bot brain in motion!!
controller.startTicking();

var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
    require("./skills/" + file)(controller);
});

logHelper.info('I AM ONLINE! COME TALK TO ME: http://localhost:' + (process.env.PORT || 3000));