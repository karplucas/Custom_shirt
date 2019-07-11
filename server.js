const express = require('express');
const clothing = require('./shirts.json');
 
//multer object creation
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)
}
})
var upload = multer({ storage: storage })


const app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

function functionName() {
  console.log('This is working');
} 

//Homepage
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Custom Shirt Builder',
    clothing: clothing.profiles
  });
});


app.route('/customize')
  .get(function(req, res) {    
      const cloth = clothing.profiles.find(p => p.id === req.query.id);
        res.render('customize', {
          title: `${cloth.name}`,
          cloth,
        });
    })
  /*.post(upload.single('imageupload'), function(req, res) {
      //console.log('Entered the post.');
      //res.send("File upload sucessfully.");
    });*/


//Server start
const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

