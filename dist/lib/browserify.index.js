'use strict';

require('babel-polyfill');

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_index2['default'].plugin(require('pouchdb-adapter-idb'));
_index2['default'].plugin(require('pouchdb-adapter-http'));
_index2['default'].plugin(require('pouchdb-replication'));

window['RxDB'] = _index2['default'];
