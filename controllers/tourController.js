const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  if (val > tours.length - 1) {
    return res.status(404).json({ status: 'fail', message: 'invalid id' });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if ((req.body.name === undefined || req.body.price === undefined)) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'invalid name or price' });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((t) => t.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const tourId = tours[tours.length - 1].id + 1;
  const newTour = { id: tourId, ...req.body };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((t) => t.id === id);

  const newTour = { ...tour, name: req.body.name };
  const filteredTours = tours.filter((t) => t.id !== id);
  const newTours = [...filteredTours, newTour];

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    () => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
