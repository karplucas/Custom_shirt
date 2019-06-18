var Jimp = require('jimp');
const express = require('express');
const clothing = require('./shirts.json');

const app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Custom Shirt Builder',
    clothing: clothing.profiles
  });
});


app.get('/customize', (req, res) => {    
  const cloth = clothing.profiles.find(p => p.id === req.query.id);
    res.render('customize', {
      title: `${cloth.name}`,
      cloth,
    });
  });

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});


//Fix this promise rejection warning.
//const server = app.listen(7000, (err, success) => {
//  if (err) throw err;
//  success
//    console.log(`Express running → PORT ${server.address().port}`);
//  });

async function waterMark() {
  const image =  await Jimp.read('./public/images/crew_cut_bigger.jpeg');
  const watermark = await Jimp.read('./public/images/watermark2.jpeg');

  image.composite(watermark, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 0.8,
    opacitySource: 0.06
  });

  await image.writeAsync('./public/images/watermarked.jpeg');
}

Jimp.read('./public/images/crew_cut.jpeg', (err, crew_cut) => {
  if (err) throw err;
  crew_cut
    .resize(516,686)
      //.color([
          //{ apply: 'hue', params: [0] },
          //{ apply: 'lighten', params: [50]},
          //{ apply: 'xor', params: ['#06D']}
      //])
      .autocrop() 
      .write('./public/images/crew_cut_bigger.jpeg');       
  });

  Jimp.read('./public/images/watermark.jpeg', (err, crew_cut) => {
    if (err) throw err;
    crew_cut
        .resize(516,686)
        //.color([
            //{ apply: 'hue', params: [0] },
            //{ apply: 'lighten', params: [50]},
            //{ apply: 'xor', params: ['#06D']}
        //])
        .autocrop() 
        .write('./public/images/watermark2.jpeg');       
    });

  waterMark();










//Test the following



