'use strict';


const mongoose = require('mongoose'),
  log4js = require('log4js'),
  log = log4js.getLogger('mongo_controller'),
  Task = mongoose.model('Tasks');

exports.list_all_tasks = function (req, res) {
  log.trace('Listing all items');
  Task.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_task = function (req, res) {
  log.trace('Creating new item');
  var new_task = new Task(req.body);
  new_task.save(function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function (req, res) {
  log.trace(`Reading item ${req.params.taskId}`);
  Task.findById(req.params.taskId, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function (req, res) {
  log.trace(`Updating item ${req.params.taskId}`);
  Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function (req, res) {
  log.trace(`Deleting task ${req.params.taskId}`);
  Task.remove({
    _id: req.params.taskId
  }, function (err) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};


