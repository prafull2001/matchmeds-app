const router = require('express').Router();
let Clinic = require('../models/clinic.model');

router.route('/').get((req, res) => {
  Clinic.find()
    .then(clinics => res.json(clinics))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phonenumber = Number(req.body.phonenumber);
  const address = req.body.address
  const prescription = req.body.prescription

  const newClinic = new Clinic({
    name,
    email,
    phonenumber,
    address,
    prescription,
  });

  newClinic.save()
  .then(() => res.json('Clinic added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  CLinic.findById(req.params.id)
    .then(clinic => res.json(clinic))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Clinic.findByIdAndDelete(req.params.id)
    .then(() => res.json('Clinic deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Clinic.findById(req.params.id)
    .then(clinic => {
        clinic.name = req.body.name;
        clinic.email = req.body.email;
        clinic.phonenumber = Number(req.body.phonenumber);
        clinic.address = req.body.address
        clinic.prescription = req.body.prescription

        clinic.save()
        .then(() => res.json('Clinic updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;