'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RxDatabase = exports.QueryChangeDetector = exports.PouchDB = exports.RxSchema = exports.removeDatabase = exports.create = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * create a database
 * @param  {string} prefix as databaseName for the storage (this can be the foldername)
 * @param  {Object} storageEngine any leveldown instance
 * @param  {String} password if the database contains encrypted fields
 * @param  {boolean} multiInstance if true, multiInstance-handling will be done
 * @return {Promise<Database>}
 */
var create = exports.create = function () {
    var _ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(args) {
        return _regenerator2['default'].wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', _RxDatabase2['default'].create(args));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function create(_x) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * removes the database and all its known data
 * @param  {string} databaseName
 * @param  {Object} adapter
 * @return {Promise}
 */


var removeDatabase = exports.removeDatabase = function () {
    var _ref2 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee2(databaseName, adapter) {
        return _regenerator2['default'].wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', _RxDatabase2['default'].removeDatabase(databaseName, adapter));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function removeDatabase(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

exports.plugin = plugin;
exports.isRxDatabase = isRxDatabase;
exports.isRxCollection = isRxCollection;
exports.isRxDocument = isRxDocument;
exports.isRxQuery = isRxQuery;
exports.isRxSchema = isRxSchema;

var _RxDatabase = require('./RxDatabase');

var _RxDatabase2 = _interopRequireDefault(_RxDatabase);

var _RxSchema = require('./RxSchema');

var _RxSchema2 = _interopRequireDefault(_RxSchema);

var _RxDocument = require('./RxDocument');

var _RxDocument2 = _interopRequireDefault(_RxDocument);

var _RxQuery = require('./RxQuery');

var _RxQuery2 = _interopRequireDefault(_RxQuery);

var _RxCollection = require('./RxCollection');

var _RxCollection2 = _interopRequireDefault(_RxCollection);

var _QueryChangeDetector = require('./QueryChangeDetector');

var _QueryChangeDetector2 = _interopRequireDefault(_QueryChangeDetector);

var _PouchDB = require('./PouchDB');

var _PouchDB2 = _interopRequireDefault(_PouchDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function plugin(mod) {
    if ((typeof mod === 'undefined' ? 'undefined' : (0, _typeof3['default'])(mod)) === 'object' && mod['default']) mod = mod['default'];
    _PouchDB2['default'].plugin(mod);
}

function isRxDatabase(obj) {
    return _RxDatabase2['default'].isInstanceOf(obj);
}
function isRxCollection(obj) {
    return _RxCollection2['default'].isInstanceOf(obj);
}
function isRxDocument(obj) {
    return _RxDocument2['default'].isInstanceOf(obj);
}
function isRxQuery(obj) {
    return _RxQuery2['default'].isInstanceOf(obj);
}
function isRxSchema(obj) {
    return _RxSchema2['default'].isInstanceOf(obj);
}

exports.RxSchema = _RxSchema2['default'];
exports.PouchDB = _PouchDB2['default'];
exports.QueryChangeDetector = _QueryChangeDetector2['default'];
exports.RxDatabase = _RxDatabase2['default'];
exports['default'] = {
    create: create,
    removeDatabase: removeDatabase,
    plugin: plugin,
    isRxDatabase: isRxDatabase,
    isRxCollection: isRxCollection,
    isRxDocument: isRxDocument,
    isRxQuery: isRxQuery,
    isRxSchema: isRxSchema,
    RxSchema: _RxSchema2['default'],
    PouchDB: _PouchDB2['default'],
    QueryChangeDetector: _QueryChangeDetector2['default'],
    RxDatabase: _RxDatabase2['default']
};
