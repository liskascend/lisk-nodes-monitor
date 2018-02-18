const axios = require('axios')
const lodash = require('lodash')

const config = require('./../../config')

// Private vars
var _interval =  null
var _cached = null

const getSyncStatus = address => {
   const url = 'http://' + address + ':' + config.port + '/api/loader/status/sync'
   //console.log(url)
   const cfg = {
      timeout: 1000
   }
   return axios.get(url, cfg)
}

const pickBest = fromStats => {
   const array = fromStats
      .filter(s => { 
         return s.success === true && s.syncing === false 
      })
      .sort((s1, s2) => { s1.height > s2.height })
   const best = lodash.head(array)
   return best
}

const check = async () => {
   // Get synchronization stats from nodes
   const array = []
   // Wait until all promises have completed even when some reject, with Promise.all: https://gist.github.com/nhagen/a1d36b39977822c224b8
   const handleErr = e => { 
      return e 
   }
   for (var i = 0; i < config.nodes.length; i++) {
      const address = config.nodes[i]
      const response = await getSyncStatus(address).catch(handleErr)
      const stat = { ...response.data, address }
      array.push(stat)
   }
   _cached = array
}

// MARK: -

// Constructor
function Monitor() {
   const addresses = config.peers
   // Monitor executes check fn. at specified time intervals and caches the result to _cached 
   const timeInteval = 5000 // in ms
   _interval = setInterval(check, timeInteval, addresses)
}

Monitor.prototype.getSyncStats = () => {
   if (!_cached) {
      return []
   }
   const best = pickBest(_cached)
   //console.log('--- ' + Date() + ' ---')
   //console.log(_cached)
   //console.log('----------------------')
   return { all: _cached, best }
}

module.exports = Monitor
