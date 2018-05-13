const express = require('express');
const app = express();
const path = require('path');

const months = ['January', 'February', 'March', 'April', 'May',
                'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.use(express.static('./views'));
app.use(express.static('./public'));

app.get('/:date', (req, res) => {
  let date;
  if (isNaN(+req.params.date)) {
    date = Date.parse(req.params.date);
  } else {
    date = +req.params.date * 1000;
  }

  if (date) {
    res.send(getTimestamp(date));
  } else {
    res.send({ unix: null, natural: null});
  }
});

// Creates and returns a timestamp object
getTimestamp = (date) => {
  date = new Date(date);
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  let timestamp = {
    unix: date.getTime() / 1000,
    natural: `${month} ${day} ${year}`
  };

  return timestamp;
}

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log('Server running on port ' + port);
});
