// Created by Sinisa Drpa on 02/18/18.

const Monitor = require('../modules/monitor')

// Constructor
function Status() {}

Status.prototype.get = (req, res) => {
   const monitor = new Monitor()
   return res.json(monitor.getSyncStats())
}

module.exports = Status