var Jimp = require('jimp');

//Watermark a file
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

//Resize a file
Jimp.read('./public/images/crew_cut.jpeg', (err, crew_cut) => {
  if (err) throw err;
  crew_cut
    .resize(386,515)
      .autocrop() 
      .write('./public/images/crew_cut_bigger.jpeg');       
  });

//Resize a file
Jimp.read('./public/images/watermark.jpeg', (err, crew_cut) => {
  if (err) throw err;
  crew_cut
      .resize(386,515)
      .autocrop() 
      .write('./public/images/watermark2.jpeg');       
  });

  waterMark();
