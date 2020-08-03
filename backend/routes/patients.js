const router = require('express').Router();
let Patient = require('../models/patient.model');

router.route('/').get((req, res) => {
  Patient.find()
    .then(patients => res.json(patients))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const dob = Date.parse(req.body.dob);
  const phonenumber = Number(req.body.phonenumber);
  const address = req.body.address
  const familysize = Number(req.body.familysize)
  const prescription = req.body.prescription
  const clinicID = req.body.clinicID

  const newPatient = new Patient({
    name,
    email,
    dob,
    phonenumber,
    address,
    familysize,
    prescription,
    clinicID
  });

  newPatient.save()
  .then(() => res.json('Patient added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Patient.findById(req.params.id)
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Patient.findByIdAndDelete(req.params.id)
    .then(() => res.json('Patient deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Patient.findById(req.params.id)
    .then(patient => {
        patient.name = req.body.name;
        patient.email = req.body.email;
        patient.dob = Date.parse(req.body.dob);
        patient.phonenumber = Number(req.body.phonenumber);
        patient.address = req.body.address
        patient.familysize = Number(req.body.familysize)
        patient.prescription = req.body.prescription
        patient.clinicID = req.body.clinicID

        patient.save()
        .then(() => res.json('Patient updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;