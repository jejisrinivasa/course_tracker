const express = require('express');
const DataSchema = require('../models/DataSchema');
const UserSchema = require('../models/UserSchema');

const router = express.Router();

router.post('/add', (req, res) => {
    const data = {
        username: req.body.username,
        coursename: req.body.coursename,
        completedstatus: false
    };

    DataSchema(data)
        .save()
        .then(r => res.json(r))
        .catch(err => res.send(err));
});

router.post('/addUser', (req, res) => {
    UserSchema({ username: req.body.username })
        .save()
        .then(user => res.json(user))
        .catch(err => res.send(err));
});

router.get('/getUser', (req, res) => {
    UserSchema.find()
        .then(r => res.json(r))
        .catch(err => res.send('connot get users...'));
});

router.get('/get', (req, res) => {
    DataSchema.find()
        .then(users => res.json(users))
        .catch(err => res.send("error occured while reading..."));
});

router.put('/update/:name', (req, res) => {
    UserSchema.findOne({ username: req.params.name })
        .then(user => {
            user.ongoing = user.ongoing + 1;
            user.save()
                .then(response => res.send("updated successfully"))
                .catch(err => res.send('update failed'));
        })
        .catch(err => res.send('Unable to find the user'));
});

router.put('/change/:name', (req, res) => {
    UserSchema.findOne({ username: req.params.name })
        .then(user => {
            user.ongoing = user.ongoing - 1;
            user.completed = user.completed + 1;

            user.save()
                .then(response => res.send('changed successfully'))
                .catch(err => res.send('change failed'));
        })
        .catch(err => res.send('unable to the user'));
});

router.put('/edit/:id', (req, res) => {
    DataSchema.findById(req.params.id)
        .then(user => {
            user.completedstatus = true;
            user.save()
                .then(response => res.json(response))
                .catch(err => res.send("edit failed"));
        }).catch(err => res.send('user not found'));
});

router.put('/decreaseCompleted/:name', (req, res) => {
    UserSchema.findOne({ username: req.params.name })
        .then(user => {
            user.completed = user.completed - 1;
            user.save()
                .then(response => res.send("updated successfully"))
                .catch(err => res.send('update failed'));
        })
        .catch(err => res.send('Unable to find the user'));
});

router.put('/decreaseOngoing/:name', (req, res) => {
    UserSchema.findOne({ username: req.params.name })
        .then(user => {
            user.ongoing = user.ongoing - 1;
            user.save()
                .then(response => res.send("updated successfully"))
                .catch(err => res.send('update failed'));
        })
        .catch(err => res.send('Unable to find the user'));
});

router.delete('/delete/:id', (req, res) => {
    //console.log(req.params.id);
    DataSchema.findById(req.params.id)
        .then(() => {
            DataSchema.findByIdAndDelete(req.params.id)
                .then(response => res.send(response))
                .catch(err => res.send('Deletion failed'));
        }).catch(err => res.send('Cannot find user'));
});

router.delete('/deleteUser/:id', (req, res) => {
    UserSchema.findById(req.params.id)
        .then(() => {
            UserSchema.findByIdAndDelete(req.params.id)
                .then(response => res.send(response))
                .catch(err => res.send('Deletion failed'));
        }).catch(err => res.send('Cannot find user'));
});

router.delete('/erase/:name', (req, res) => {
    DataSchema.deleteMany({ username: req.params.name })
        .then(response => res.send('Deleted successfully'))
        .catch(err => res.send('deletion failed'));
});

module.exports = router;