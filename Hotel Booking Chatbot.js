/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var env = require("node-env-file");
env(__dirname + "/.env");

var Botkit = require("botkit");
var debug = require("debug")("botkit:main");

var bot_options = {
  replyWithTyping: true
};

// Use a mongo database if specified, otherwise store in a JSON file local to the app.
// Mongo is automatically configured when deploying to Heroku
if (process.env.MONGO_URI) {
  // create a custom db access method
  var db = require(__dirname + "/components/database.js")({});
  bot_options.storage = db;
} else {
  bot_options.json_file_store = __dirname + "/.data/db/"; // store user data in a simple JSON format
}

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.socketbot(bot_options);

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + "/components/express_webserver.js")(
  controller
);

// Load in some helpers that make running Botkit on Glitch.com better
require(__dirname + "/components/plugin_glitch.js")(controller);

// Load in a plugin that defines the bot's identity
require(__dirname + "/components/plugin_identity.js")(controller);

// Open the web socket server
controller.openSocketServer(controller.httpserver);

var wit = require("./botkit-middleware-witai"); //shayl el fn el kebira

var mywit = wit({ token: "4WSGYBVFQY2NHGCBLEYYLS73XY5G4DMY" });
controller.middleware.receive.use(mywit.receive); //.use: 3shan 23dl 3la el default 'recieve'
/*let Resorts=[
 { name : 'hurghada' , choice1 :' Steigenberger Pure Lifestyle (Price for the night 2039)' ,choice2: 'King House ( Price for the night 584)'},
  { name :'alex', choice1 :'Hilton (Price for the night 2040) ',choice2:' Cherry (Price for the night 900) ' },
  {name : 'sharm' ,choice1 : 'Tolip Inn Sharm(Price for the night 384) ',choice2:' Coral Sea Aqua Club Resort (Price for the night 1570) '},
  {name : 'porto shokhna ' ,choice1: 'Nile Meridien Hotel( Price for the night 1052) ',choice2:' Pyramids Garden Motel ( Price for the night 384)'}

]*/
/*let Hotels = [
  {
    Hotel : ["Steigenberger Pure Lifestyle"],
    Price : "2039",
    Place : "Hurghada"
  },
  {
    Hotel : ["King House "],
    Price : "584",
    Place : "Hurghada"
  },
  {
    Hotel : ["Nile Meridien Hotel"],
    Price : "1052",
    Place : "Porto Sokhna "
  },
  {
    Hotel : ["Pyramids Garden Motel"],
    Price : "384",
    Place : " Porto Sokhna "
  },
  
  {
    Hotel : ["Hilton"],
    Price : "2040",
    Place : " Alex "
  },
  {
    Hotel : ["Cherry"],
    Price : "900",
    Place : " Alex "
  },
   {

    Hotel : [" Tolip Inn Sharm"],
    Price : "384",
    Place : "Sharm"
   },
  {
    Hotel : ["Coral Sea Aqua Club Resort "],
    Price : "1570",
    Place : "Sharm"
  },
  

];

*/
let greeting =["hi","hello","good morning","alo","good evening"]
let suggest =["suggest places","suggest","show me places","what places you show me"]
function custom_hear_middleware(patterns, message) {

  for (var p = 0; p < patterns.length; p++) {
      if (patterns[p] == message.text) {
          return true;
      }
  }
  return false;
}



var ID 
    var Name
    var Email 
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(':memory:');
    db.serialize(function() {
    // create table for user     
    db.run("CREATE TABLE user (id INT, name TEXT ,email TEXT )");
    var stmt = db.prepare("INSERT INTO user VALUES (?,?,?)");
    stmt.run(874343432,"Ghada Gamal" , "pbeghada@gmail.com" );
    stmt.run(904554645,"Raghad Khaled" , "RaghadKhalad@gmail.com" );
    stmt.finalize();
    });
    controller.hears(greeting, 'message_received', custom_hear_middleware,function(bot,message){ 
      bot.startConversation(message , function(err , convo){
          if(!err){
            convo.addQuestion('Enter your ID Please' , function(res , convo){   
                  ID = res.text;
                  //console.log(ID , "before if")
                  if(db.each("SELECT id FROM user", function(err, row) { return row.id != ID}))
                           {
                              //console.log("inside if")
                              convo.addQuestion('Enter your Name Please' , function(res , convo){  
                                  Name = res.text
                                  //console.log("Name")
                                  convo.next();
                                  });
                                  convo.addQuestion('Enter your Email Please' , function(res , convo){  
                                  Email = res.text
                                  //console.log("Email")
                                  convo.next();
                                  });
                                  convo.addQuestion('Nice to meet you' , function(res , convo){  
                                  //console.log("before database")
                                  var stmt1 = db.prepare("INSERT INTO user VALUES (?,?,?)"); 
                                  stmt1.run(ID , Name , Email );  
                                  stmt1.finalize();
                                  //console.log("after database")
                                  db.each("SELECT id, name FROM user", function(err, row) {
                                    console.log("User id : "+row.id, row.name);

                                   });
                                   bot.reply(message, {
                                    text:'Choose one of these Places',
                                    quick_replies: [
                                        {
                                            title: 'Hurghada',
                                            payload:'hurghada'
                                            
                                        },
                                        {
                                            title: 'Alex',
                                            payload: 'alex'
                                           
                                        },
                                        {
                                            title: 'Sharm',
                                            payload: 'sharm'
                                           
                                        },
                                        {
                                            title: 'porto shokhna',
                                            payload: 'porto'
                                           
                                        }
                                    ]
                                  },function() {});
                                
                                  convo.next();
                                  });
                              
                           }
                  else // id is found 
                  {
                      //console.log( "inside else")
                      convo.next();
                      db.close();
                  }  
               
              convo.next();          
              });
          }
      });
      })
     
controller.hears('hurghada','message_received', function(bot, message) {
    bot.reply(message, {
      text:'Choose Hotel',
      quick_replies: [
          {
              title: 'Steigenberger Pure Lifestyle (Price for the night 2039)',
              payload:'Done'
              
          },
          {
              title: 'King House ( Price for the night 584)',
              payload: 'Done'
             
          },
          
      ]
    },function() {});
})
controller.hears('alex','message_received', function(bot, message) {
    bot.reply(message, {
      text:'Choose Hotel',
      quick_replies: [
          {
              title: 'Hilton (Price for the night 2040) ' ,
              payload:'Done'
              
          },
          {
              title: ' Cherry (Price for the night 900) ',
              payload: 'Done'
             
          },
          
      ]
    },function() {});
})
controller.hears('sharm','message_received', function(bot, message) {
    bot.reply(message, {
      text:'Choose Hotel',
      quick_replies: [
          {
              title: 'Tolip Inn Sharm(Price for the night 384) ' ,
              payload:'Done'
              
          },
          {
              title: ' Coral Sea Aqua Club Resort (Price for the night 1570) ',
              payload: 'Done'
             
          },
          
      ]
    },function() {});
})
controller.hears('porto','message_received', function(bot, message) {
    bot.reply(message, {
      text:'Choose Hotel',
      quick_replies: [
          {
              title: 'Nile Meridien Hotel( Price for the night 1052) ',
              payload:'Done'
              
          },
          {
              title:' Pyramids Garden Motel ( Price for the night 384)' ,
              payload: 'Done'
             
          },
          
      ]
    },function() {});
})
      
controller.hears('Done','message_received', function(bot, message) {
    bot.reply(message,"Booking is Done =) ")
})
controller.middleware.receive.use(function(bot, message, next) {
  message.text = message.text.toLowerCase();
  next();
})

// Start the bot brain in motion!!
controller.startTicking();

var normalizedPath = require("path").join(__dirname, "skills");
require("fs")
  .readdirSync(normalizedPath)
  .forEach(function(file) {
  require("./skills/" + file)(controller);
  });
  var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./skills/" + file)(controller);
});

console.log(
  "I AM ONLINE! COME TALK TO ME: http://localhost:" + (process.env.PORT || 5000)
);

function usage_tip() {
  console.log("~~~~~~~~~~");
  console.log("Botkit Starter Kit");
  console.log("Execute your bot application like this:");
  console.log("PORT=3000 node bot.js");
  console.log("~~~~~~~~~~");
}




