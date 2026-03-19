const fs = require('fs');
fetch('https://www.houseofhiranandani.com/')
  .then(res => res.text())
  .then(text => {
    const urls = text.match(/https?:\/\/[^"']*\.mp4/g);
    if (urls) {
      console.log([...new Set(urls)]);
    } else {
      console.log('No mp4 videos found');
    }
  });
