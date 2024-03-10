var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

// aove imported required modules 

const app = express() 

app.use(bodyParser.json())

app.use(express.static('public')) // includes html files 

app.use(bodyParser.urlencoded({
    extended:true // Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
}))

mongoose.connect('mongodb://localhost:27017/saathVachan')

var db= mongoose.connection

db.on('error',()=>console.log("Error in connecting to database"))
db.once('open',()=>console.log("Connect to database successfully !!"))

// mongoose.model('User',user)

// to get regiteration page and data post  // 

app.post("/registeration",(req,res)=>{
    var firstname =req.body.firstname
    var lastname = req.body.lastname
    var fathername = req.body.fathername
    var mothername = req.body.mothername
    var gender = req.body.gender
    var birthdate = req.body.birthdate
    var height = req.body.height
    var weight = req.body.weight
    var caste = req.body.caste
    var subcaste = req.body.subcaste
    var mobileno = req.body.mobileno
    var emailid = req.body.emailid
    var username = req.body.username
    var password = req.body.password
    var confpassword = req.body.confpassword

    // creating objects below 

    var data = {
        "firstname":firstname,
        "lastname":lastname,
        "fathername":fathername,
        "mothername":mothername,
        "gender":gender,
        "birthdate":birthdate,
        "height":height,
        "weight":weight,
        "caste":caste,
        "subcaste":subcaste,
        "mobileno":mobileno,
        "emailid":emailid,
        "username":username,
        "password":password,
        "confpassword":confpassword

    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Data inserted Successfully");
    })
    return res.redirect('registered_success.html');
});

var User = db.collection('users');
 


// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Assuming 'User' is the model you defined
  User.findOne({ username, password }, (err, user) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }

    // Check if the user exists
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    // Successful login - redirect to another page
    res.sendFile(__dirname + '/public/afterlog.html');
  });
});

// Main page route
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/main.html');
});

// After log page route
app.get("/afterlog", (req, res) => {
  res.sendFile(__dirname + '/public/afterlog.html');
});


// main page get //

app.get("/" , (req,res)=>{
    res.set({
        "Allow-access-Allow-origin":"*" // because we are using local host 
    })
    return res.redirect('main.html')
}).listen(3000);

console.log("listening on port 3000");
