'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

/**
 * creates and prepares a new collection
 * @param  {RxDatabase}  database
 * @param  {string}  name
 * @param  {RxSchema}  schema
 * @param  {?Object}  [pouchSettings={}]
 * @param  {?Object}  [migrationStrategies={}]
 * @return {Promise.<RxCollection>} promise with collection
 */
var create = exports.create = function () {
    var _ref20 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee18(_ref19) {
        var database = _ref19.database,
            name = _ref19.name,
            schema = _ref19.schema,
            _ref19$pouchSettings = _ref19.pouchSettings,
            pouchSettings = _ref19$pouchSettings === undefined ? {} : _ref19$pouchSettings,
            _ref19$migrationStrat = _ref19.migrationStrategies,
            migrationStrategies = _ref19$migrationStrat === undefined ? {} : _ref19$migrationStrat,
            _ref19$autoMigrate = _ref19.autoMigrate,
            autoMigrate = _ref19$autoMigrate === undefined ? true : _ref19$autoMigrate,
            _ref19$statics = _ref19.statics,
            statics = _ref19$statics === undefined ? {} : _ref19$statics,
            _ref19$methods = _ref19.methods,
            methods = _ref19$methods === undefined ? {} : _ref19$methods;
        var collection;
        return _regenerator2['default'].wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        if (!(!schema instanceof _RxSchema.RxSchema)) {
                            _context18.next = 2;
                            break;
                        }

                        throw new TypeError('given schema is no Schema-object');

                    case 2:
                        if (!(!database instanceof _RxDatabase.RxDatabase)) {
                            _context18.next = 4;
                            break;
                        }

                        throw new TypeError('given database is no Database-object');

                    case 4:
                        if (!(typeof autoMigrate !== 'boolean')) {
                            _context18.next = 6;
                            break;
                        }

                        throw new TypeError('autoMigrate must be boolean');

                    case 6:

                        util.validateCouchDBString(name);
                        checkMigrationStrategies(schema, migrationStrategies);

                        // check ORM-methods
                        checkORMmethdods(statics);
                        checkORMmethdods(methods);
                        Object.keys(methods).filter(function (funName) {
                            return schema.topLevelFields.includes(funName);
                        }).forEach(function (funName) {
                            throw new Error('collection-method not allowed because fieldname is in the schema ' + funName);
                        });

                        collection = new RxCollection(database, name, schema, pouchSettings, migrationStrategies, methods);
                        _context18.next = 14;
                        return collection.prepare();

                    case 14:

                        // ORM add statics
                        Object.entries(statics).forEach(function (entry) {
                            var fun = entry.pop();
                            var funName = entry.pop();
                            collection.__defineGetter__(funName, function () {
                                return fun.bind(collection);
                            });
                        });

                        if (!autoMigrate) {
                            _context18.next = 18;
                            break;
                        }

                        _context18.next = 18;
                        return collection.migratePromise();

                    case 18:
                        return _context18.abrupt('return', collection);

                    case 19:
                    case 'end':
                        return _context18.stop();
                }
            }
        }, _callee18, this);
    }));

    return function create(_x27) {
        return _ref20.apply(this, arguments);
    };
}();

exports.properties = properties;
exports.isInstanceOf = isInstanceOf;

var _PouchDB = require('./PouchDB');

var _PouchDB2 = _interopRequireDefault(_PouchDB);

var _objectPath = require('object-path');

var _objectPath2 = _interopRequireDefault(_objectPath);

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _RxDocument = require('./RxDocument');

var RxDocument = _interopRequireWildcard(_RxDocument);

var _RxQuery = require('./RxQuery');

var RxQuery = _interopRequireWildcard(_RxQuery);

var _RxChangeEvent = require('./RxChangeEvent');

var RxChangeEvent = _interopRequireWildcard(_RxChangeEvent);

var _KeyCompressor = require('./KeyCompressor');

var KeyCompressor = _interopRequireWildcard(_KeyCompressor);

var _DataMigrator = require('./DataMigrator');

var DataMigrator = _interopRequireWildcard(_DataMigrator);

var _Crypter = require('./Crypter');

var Crypter = _interopRequireWildcard(_Crypter);

var _DocCache = require('./DocCache');

var DocCache = _interopRequireWildcard(_DocCache);

var _QueryCache = require('./QueryCache');

var QueryCache = _interopRequireWildcard(_QueryCache);

var _ChangeEventBuffer = require('./ChangeEventBuffer');

var ChangeEventBuffer = _interopRequireWildcard(_ChangeEventBuffer);

var _RxReplicationState = require('./RxReplicationState');

var RxReplicationState = _interopRequireWildcard(_RxReplicationState);

var _RxSchema = require('./RxSchema');

var _RxDatabase = require('./RxDatabase');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var HOOKS_WHEN = ['pre', 'post'];
var HOOKS_KEYS = ['insert', 'save', 'remove', 'create'];

var RxCollection = function () {
    function RxCollection(database, name, schema) {
        var pouchSettings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        var _this = this;

        var migrationStrategies = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
        var methods = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
        (0, _classCallCheck3['default'])(this, RxCollection);

        this.database = database;
        this.name = name;
        this.schema = schema;
        this._migrationStrategies = migrationStrategies;
        this._pouchSettings = pouchSettings;
        this._methods = methods;
        this._atomicUpsertLocks = {};

        this._docCache = DocCache.create();
        this._queryCache = QueryCache.create();

        // defaults
        this.synced = false;
        this.hooks = {};
        this._subs = [];
        this._repStates = [];
        this.pouch = null; // this is needed to preserve this name

        // set HOOKS-functions dynamically
        HOOKS_KEYS.forEach(function (key) {
            HOOKS_WHEN.map(function (when) {
                var fnName = when + util.ucfirst(key);
                _this[fnName] = function (fun, parallel) {
                    return _this.addHook(when, key, fun, parallel);
                };
            });
        });
    }

    (0, _createClass3['default'])(RxCollection, [{
        key: 'prepare',
        value: function () {
            var _ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee() {
                var _this2 = this;

                return _regenerator2['default'].wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this._dataMigrator = DataMigrator.create(this, this._migrationStrategies);
                                this._crypter = Crypter.create(this.database.password, this.schema);
                                this._keyCompressor = KeyCompressor.create(this.schema);

                                this.pouch = this.database._spawnPouchDB(this.name, this.schema.version, this._pouchSettings);
                                this._observable$ = this.database.$.filter(function (event) {
                                    return event.data.col == _this2.name;
                                });
                                this._changeEventBuffer = ChangeEventBuffer.create(this);

                                // INDEXES
                                _context.next = 8;
                                return Promise.all(this.schema.indexes.map(function (indexAr) {
                                    var compressedIdx = indexAr.map(function (key) {
                                        if (!_this2.schema.doKeyCompression()) return key;
                                        var ret = _this2._keyCompressor._transformKey('', '', key.split('.'));
                                        return ret;
                                    });
                                    return _this2.pouch.createIndex({
                                        index: {
                                            fields: compressedIdx
                                        }
                                    });
                                }));

                            case 8:

                                this._subs.push(this._observable$.subscribe(function (cE) {
                                    // when data changes, send it to RxDocument in docCache
                                    var doc = _this2._docCache.get(cE.data.doc);
                                    if (doc) doc._handleChangeEvent(cE);
                                }));

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function prepare() {
                return _ref.apply(this, arguments);
            }

            return prepare;
        }()

        /**
         * checks if a migration is needed
         * @return {boolean}
         */

    }, {
        key: 'migrationNeeded',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee2() {
                var oldCols;
                return _regenerator2['default'].wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!(this.schema.version == 0)) {
                                    _context2.next = 2;
                                    break;
                                }

                                return _context2.abrupt('return', false);

                            case 2:
                                _context2.next = 4;
                                return this._dataMigrator._getOldCollections();

                            case 4:
                                oldCols = _context2.sent;
                                return _context2.abrupt('return', oldCols.length > 0);

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function migrationNeeded() {
                return _ref2.apply(this, arguments);
            }

            return migrationNeeded;
        }()

        /**
         * @param {number} [batchSize=10] amount of documents handled in parallel
         * @return {Observable} emits the migration-status
         */

    }, {
        key: 'migrate',
        value: function migrate() {
            var batchSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

            return this._dataMigrator.migrate(batchSize);
        }

        /**
         * does the same thing as .migrate() but returns promise
         * @param {number} [batchSize=10] amount of documents handled in parallel
         * @return {Promise} resolves when finished
         */

    }, {
        key: 'migratePromise',
        value: function migratePromise() {
            var batchSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

            return this._dataMigrator.migratePromise(batchSize);
        }

        /**
         * wrappers for Pouch.put/get to handle keycompression etc
         */

    }, {
        key: '_handleToPouch',
        value: function _handleToPouch(docData) {
            var encrypted = this._crypter.encrypt(docData);
            var swapped = this.schema.swapPrimaryToId(encrypted);
            var compressed = this._keyCompressor.compress(swapped);
            return compressed;
        }
    }, {
        key: '_handleFromPouch',
        value: function _handleFromPouch(docData) {
            var noDecrypt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var swapped = this.schema.swapIdToPrimary(docData);
            var decompressed = this._keyCompressor.decompress(swapped);
            if (noDecrypt) return decompressed;
            var decrypted = this._crypter.decrypt(decompressed);
            return decrypted;
        }

        /**
         * [overwrite description]
         * @param {object} obj
         * @param {boolean} [overwrite=false] if true, it will overwrite existing document
         */

    }, {
        key: '_pouchPut',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee3(obj) {
                var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                var ret, exist;
                return _regenerator2['default'].wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                obj = this._handleToPouch(obj);
                                ret = null;
                                _context3.prev = 2;
                                _context3.next = 5;
                                return this.pouch.put(obj);

                            case 5:
                                ret = _context3.sent;
                                _context3.next = 21;
                                break;

                            case 8:
                                _context3.prev = 8;
                                _context3.t0 = _context3['catch'](2);

                                if (!(overwrite && _context3.t0.status == 409)) {
                                    _context3.next = 20;
                                    break;
                                }

                                _context3.next = 13;
                                return this.pouch.get(obj._id);

                            case 13:
                                exist = _context3.sent;

                                obj._rev = exist._rev;
                                _context3.next = 17;
                                return this.pouch.put(obj);

                            case 17:
                                ret = _context3.sent;
                                _context3.next = 21;
                                break;

                            case 20:
                                throw _context3.t0;

                            case 21:
                                return _context3.abrupt('return', ret);

                            case 22:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[2, 8]]);
            }));

            function _pouchPut(_x8) {
                return _ref3.apply(this, arguments);
            }

            return _pouchPut;
        }()
    }, {
        key: '_pouchGet',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee4(key) {
                var doc;
                return _regenerator2['default'].wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.pouch.get(key);

                            case 2:
                                doc = _context4.sent;

                                doc = this._handleFromPouch(doc);
                                return _context4.abrupt('return', doc);

                            case 5:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function _pouchGet(_x9) {
                return _ref4.apply(this, arguments);
            }

            return _pouchGet;
        }()
        /**
         * wrapps pouch-find
         * @param {RxQuery} rxQuery
         * @param {?number} limit overwrites the limit
         * @param {?boolean} noDecrypt if true, decryption will not be made
         * @return {Object[]} array with documents-data
         */

    }, {
        key: '_pouchFind',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee5(rxQuery, limit) {
                var _this3 = this;

                var noDecrypt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
                var compressedQueryJSON, docsCompressed, docs;
                return _regenerator2['default'].wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                compressedQueryJSON = rxQuery.keyCompress();

                                if (limit) compressedQueryJSON.limit = limit;

                                _context5.next = 4;
                                return this.pouch.find(compressedQueryJSON);

                            case 4:
                                docsCompressed = _context5.sent;
                                docs = docsCompressed.docs.map(function (doc) {
                                    return _this3._handleFromPouch(doc, noDecrypt);
                                });
                                return _context5.abrupt('return', docs);

                            case 7:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function _pouchFind(_x11, _x12) {
                return _ref5.apply(this, arguments);
            }

            return _pouchFind;
        }()

        /**
         * assigns the ORM-methods to the RxDocument
         * @param {RxDocument} doc
         */

    }, {
        key: '_assignMethodsToDocument',
        value: function _assignMethodsToDocument(doc) {
            Object.entries(this._methods).forEach(function (entry) {
                var funName = entry[0];
                var fun = entry[1];
                doc.__defineGetter__(funName, function () {
                    return fun.bind(doc);
                });
            });
        }

        /**
         * create a RxDocument-instance from the jsonData
         * @param {Object} json documentData
         * @return {Promise<RxDocument>}
         */

    }, {
        key: '_createDocument',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee6(json) {
                var id, cacheDoc, doc;
                return _regenerator2['default'].wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                // return from cache if exsists
                                id = json[this.schema.primaryPath];
                                cacheDoc = this._docCache.get(id);

                                if (!cacheDoc) {
                                    _context6.next = 4;
                                    break;
                                }

                                return _context6.abrupt('return', cacheDoc);

                            case 4:
                                doc = RxDocument.create(this, json);

                                this._assignMethodsToDocument(doc);
                                this._docCache.set(id, doc);
                                this._runHooksSync('post', 'create', doc);

                                return _context6.abrupt('return', doc);

                            case 9:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function _createDocument(_x13) {
                return _ref6.apply(this, arguments);
            }

            return _createDocument;
        }()
        /**
         * create RxDocument from the docs-array
         * @return {Promise<RxDocument[]>} documents
         */

    }, {
        key: '_createDocuments',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee7(docsJSON) {
                var _this4 = this;

                return _regenerator2['default'].wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                return _context7.abrupt('return', Promise.all(docsJSON.map(function (json) {
                                    return _this4._createDocument(json);
                                })));

                            case 1:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function _createDocuments(_x14) {
                return _ref7.apply(this, arguments);
            }

            return _createDocuments;
        }()

        /**
         * returns observable
         */

    }, {
        key: '$emit',
        value: function $emit(changeEvent) {
            return this.database.$emit(changeEvent);
        }

        /**
         * @param {Object|RxDocument} json data or RxDocument if temporary
         * @param {RxDocument} doc which was created
         * @return {Promise<RxDocument>}
         */

    }, {
        key: 'insert',
        value: function () {
            var _ref8 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee8(json) {
                var tempDoc, insertResult, newDoc, emitEvent;
                return _regenerator2['default'].wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:

                                // inserting a temporary-document
                                tempDoc = null;

                                if (!RxDocument.isInstanceOf(json)) {
                                    _context8.next = 6;
                                    break;
                                }

                                tempDoc = json;

                                if (json._isTemporary) {
                                    _context8.next = 5;
                                    break;
                                }

                                throw new Error('You cannot insert an existing document');

                            case 5:
                                json = json.toJSON();

                            case 6:

                                json = (0, _clone2['default'])(json);
                                json = this.schema.fillObjectWithDefaults(json);

                                if (!json._id) {
                                    _context8.next = 10;
                                    break;
                                }

                                throw new Error('do not provide ._id, it will be generated');

                            case 10:

                                // fill _id
                                if (this.schema.primaryPath == '_id' && !json._id) json._id = util.generate_id();

                                _context8.next = 13;
                                return this._runHooks('pre', 'insert', json);

                            case 13:

                                this.schema.validate(json);

                                _context8.next = 16;
                                return this._pouchPut(json);

                            case 16:
                                insertResult = _context8.sent;


                                json[this.schema.primaryPath] = insertResult.id;
                                json._rev = insertResult.rev;

                                newDoc = tempDoc;

                                if (!tempDoc) {
                                    _context8.next = 24;
                                    break;
                                }

                                tempDoc._data = json;
                                _context8.next = 27;
                                break;

                            case 24:
                                _context8.next = 26;
                                return this._createDocument(json);

                            case 26:
                                newDoc = _context8.sent;

                            case 27:
                                _context8.next = 29;
                                return this._runHooks('post', 'insert', newDoc);

                            case 29:

                                // event
                                emitEvent = RxChangeEvent.create('INSERT', this.database, this, newDoc, json);

                                this.$emit(emitEvent);

                                return _context8.abrupt('return', newDoc);

                            case 32:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function insert(_x15) {
                return _ref8.apply(this, arguments);
            }

            return insert;
        }()

        /**
         * same as insert but overwrites existing document with same primary
         */

    }, {
        key: 'upsert',
        value: function () {
            var _ref9 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee9(json) {
                var primary, existing, newDoc;
                return _regenerator2['default'].wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                json = (0, _clone2['default'])(json);
                                primary = json[this.schema.primaryPath];

                                if (primary) {
                                    _context9.next = 4;
                                    break;
                                }

                                throw new Error('RxCollection.upsert() does not work without primary');

                            case 4:
                                _context9.next = 6;
                                return this.findOne(primary).exec();

                            case 6:
                                existing = _context9.sent;

                                if (!existing) {
                                    _context9.next = 15;
                                    break;
                                }

                                json._rev = existing._rev;
                                existing._data = json;
                                _context9.next = 12;
                                return existing.save();

                            case 12:
                                return _context9.abrupt('return', existing);

                            case 15:
                                _context9.next = 17;
                                return this.insert(json);

                            case 17:
                                newDoc = _context9.sent;
                                return _context9.abrupt('return', newDoc);

                            case 19:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function upsert(_x16) {
                return _ref9.apply(this, arguments);
            }

            return upsert;
        }()
    }, {
        key: '_atomicUpsertEnsureRxDocumentExists',
        value: function () {
            var _ref10 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee10(primary, json) {
                var doc;
                return _regenerator2['default'].wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return this.findOne(primary).exec();

                            case 2:
                                doc = _context10.sent;

                                if (!doc) {
                                    _context10.next = 5;
                                    break;
                                }

                                return _context10.abrupt('return');

                            case 5:
                                return _context10.abrupt('return', this.insert(json));

                            case 6:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function _atomicUpsertEnsureRxDocumentExists(_x17, _x18) {
                return _ref10.apply(this, arguments);
            }

            return _atomicUpsertEnsureRxDocumentExists;
        }()

        /**
         * upserts to a RxDocument, uses atomicUpdate if document already exists
         * @param  {object}  json
         * @return {Promise}
         */

    }, {
        key: 'atomicUpsert',
        value: function () {
            var _ref11 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee11(json) {
                var primary, doc;
                return _regenerator2['default'].wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                json = (0, _clone2['default'])(json);
                                primary = json[this.schema.primaryPath];

                                if (primary) {
                                    _context11.next = 4;
                                    break;
                                }

                                throw new Error('RxCollection.atomicUpsert() does not work without primary');

                            case 4:

                                // ensure that it wont try 2 parallel inserts
                                if (!this._atomicUpsertLocks[primary]) this._atomicUpsertLocks[primary] = this._atomicUpsertEnsureRxDocumentExists(primary, json);
                                _context11.next = 7;
                                return this._atomicUpsertLocks[primary];

                            case 7:
                                _context11.next = 9;
                                return this.findOne(primary).exec();

                            case 9:
                                doc = _context11.sent;
                                return _context11.abrupt('return', doc.atomicUpdate(function (innerDoc) {
                                    json._rev = innerDoc._rev;
                                    innerDoc._data = json;
                                }));

                            case 11:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function atomicUpsert(_x19) {
                return _ref11.apply(this, arguments);
            }

            return atomicUpsert;
        }()

        /**
         * takes a mongoDB-query-object and returns the documents
         * @param  {object} queryObj
         * @return {RxDocument[]} found documents
         */

    }, {
        key: 'find',
        value: function find(queryObj) {
            if (typeof queryObj === 'string') throw new Error('if you want to search by _id, use .findOne(_id)');

            var query = RxQuery.create('find', queryObj, this);
            return query;
        }
    }, {
        key: 'findOne',
        value: function findOne(queryObj) {
            var query = void 0;

            if (typeof queryObj === 'string') {
                query = RxQuery.create('findOne', {
                    _id: queryObj
                }, this);
            } else query = RxQuery.create('findOne', queryObj, this);

            if (typeof queryObj === 'number' || Array.isArray(queryObj)) throw new TypeError('.findOne() needs a queryObject or string');

            return query;
        }

        /**
         * export to json
         * @param {boolean} decrypted if true, all encrypted values will be decrypted
         */

    }, {
        key: 'dump',
        value: function () {
            var _ref12 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee12() {
                var decrypted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                var encrypted, json, query, docs;
                return _regenerator2['default'].wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                encrypted = !decrypted;
                                json = {
                                    name: this.name,
                                    schemaHash: this.schema.hash,
                                    encrypted: false,
                                    passwordHash: null,
                                    docs: []
                                };


                                if (this.database.password && encrypted) {
                                    json.passwordHash = util.hash(this.database.password);
                                    json.encrypted = true;
                                }

                                query = RxQuery.create('find', {}, this);
                                _context12.next = 6;
                                return this._pouchFind(query, null, encrypted);

                            case 6:
                                docs = _context12.sent;

                                json.docs = docs.map(function (docData) {
                                    delete docData._rev;
                                    return docData;
                                });
                                return _context12.abrupt('return', json);

                            case 9:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function dump() {
                return _ref12.apply(this, arguments);
            }

            return dump;
        }()

        /**
         * imports the json-data into the collection
         * @param {Array} exportedJSON should be an array of raw-data
         */

    }, {
        key: 'importDump',
        value: function () {
            var _ref13 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee13(exportedJSON) {
                var _this5 = this;

                var importFns;
                return _regenerator2['default'].wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                if (!(exportedJSON.schemaHash != this.schema.hash)) {
                                    _context13.next = 2;
                                    break;
                                }

                                throw new Error('the imported json relies on a different schema');

                            case 2:
                                if (!(exportedJSON.encrypted && exportedJSON.passwordHash != util.hash(this.database.password))) {
                                    _context13.next = 4;
                                    break;
                                }

                                throw new Error('json.passwordHash does not match the own');

                            case 4:
                                importFns = exportedJSON.docs
                                // decrypt
                                .map(function (doc) {
                                    return _this5._crypter.decrypt(doc);
                                })
                                // validate schema
                                .map(function (doc) {
                                    return _this5.schema.validate(doc);
                                })
                                // import
                                .map(function (doc) {
                                    return _this5._pouchPut(doc);
                                });
                                return _context13.abrupt('return', Promise.all(importFns));

                            case 6:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee13, this);
            }));

            function importDump(_x21) {
                return _ref13.apply(this, arguments);
            }

            return importDump;
        }()

        /**
         * waits for external changes to the database
         * and ensures they are emitted to the internal RxChangeEvent-Stream
         * TODO this can be removed by listening to the pull-change-events of the RxReplicationState
         */

    }, {
        key: 'watchForChanges',
        value: function watchForChanges() {
            var _this6 = this;

            if (this.synced) return;

            /**
             * this will grap the changes and publish them to the rx-stream
             * this is to ensure that changes from 'synced' dbs will be published
             */
            var sendChanges = {};
            var pouch$ = util.Rx.Observable.fromEvent(this.pouch.changes({
                since: 'now',
                live: true,
                include_docs: true
            }), 'change').filter(function (c) {
                return c.id.charAt(0) != '_';
            }).map(function (c) {
                return c.doc;
            }).map(function (doc) {
                doc._ext = true;
                return doc;
            }).filter(function (doc) {
                return !_this6._changeEventBuffer.buffer.map(function (cE) {
                    return cE.data.v._rev;
                }).includes(doc._rev);
            }).filter(function (doc) {
                return sendChanges[doc._rev] = 'YES';
            }).delay(10).map(function (doc) {
                var ret = null;
                if (sendChanges[doc._rev] == 'YES') ret = doc;
                delete sendChanges[doc._rev];
                return ret;
            }).filter(function (doc) {
                return doc != null;
            }).subscribe(function (doc) {
                _this6.$emit(RxChangeEvent.fromPouchChange(doc, _this6));
            });

            this._subs.push(pouch$);

            var ob2 = this.$.map(function (cE) {
                return cE.data.v;
            }).map(function (doc) {
                if (doc && sendChanges[doc._rev]) sendChanges[doc._rev] = 'NO';
            }).subscribe();
            this._subs.push(ob2);

            this.synced = true;
        }
    }, {
        key: 'createRxReplicationState',
        value: function createRxReplicationState() {
            return RxReplicationState.create(this);
        }

        /**
         * sync with another database
         */

    }, {
        key: 'sync',
        value: function sync(_ref14) {
            var _this7 = this;

            var remote = _ref14.remote,
                _ref14$waitForLeaders = _ref14.waitForLeadership,
                waitForLeadership = _ref14$waitForLeaders === undefined ? true : _ref14$waitForLeaders,
                _ref14$direction = _ref14.direction,
                direction = _ref14$direction === undefined ? {
                pull: true,
                push: true
            } : _ref14$direction,
                _ref14$options = _ref14.options,
                options = _ref14$options === undefined ? {
                live: true,
                retry: true
            } : _ref14$options,
                query = _ref14.query;

            options = (0, _clone2['default'])(options);
            if (typeof this.pouch.sync !== 'function') {
                throw new Error('RxCollection.sync needs \'pouchdb-replication\'. Code:\n                 RxDB.plugin(require(\'pouchdb-replication\')); ');
            }

            // if remote is RxCollection, get internal pouchdb
            if (isInstanceOf(remote)) remote = remote.pouch;

            if (query && this !== query.collection) throw new Error('RxCollection.sync() query must be from the same RxCollection');

            var syncFun = util.pouchReplicationFunction(this.pouch, direction);
            if (query) options.selector = query.keyCompress().selector;

            var repState = RxReplicationState.create(this);

            // run internal so .sync() does not have to be async
            (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee14() {
                var pouchSync;
                return _regenerator2['default'].wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                if (!waitForLeadership) {
                                    _context14.next = 5;
                                    break;
                                }

                                _context14.next = 3;
                                return _this7.database.waitForLeadership();

                            case 3:
                                _context14.next = 7;
                                break;

                            case 5:
                                _context14.next = 7;
                                return util.promiseWait(0);

                            case 7:
                                pouchSync = syncFun(remote, options);

                                _this7.watchForChanges();
                                repState.setPouchEventEmitter(pouchSync);
                                _this7._repStates.push(repState);

                            case 11:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, _callee14, _this7);
            }))();

            return repState;
        }

        /**
         * HOOKS
         */

    }, {
        key: 'addHook',
        value: function addHook(when, key, fun) {
            var parallel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            if (typeof fun != 'function') throw new TypeError(key + '-hook must be a function');

            if (!HOOKS_WHEN.includes(when)) throw new TypeError('hooks-when not known');

            if (!HOOKS_KEYS.includes(key)) throw new Error('hook-name ' + key + 'not known');

            if (when == 'post' && key == 'create' && parallel == true) throw new Error('.postCreate-hooks cannot be async');

            var runName = parallel ? 'parallel' : 'series';

            this.hooks[key] = this.hooks[key] || {};
            this.hooks[key][when] = this.hooks[key][when] || {
                series: [],
                parallel: []
            };
            this.hooks[key][when][runName].push(fun);
        }
    }, {
        key: 'getHooks',
        value: function getHooks(when, key) {
            try {
                return this.hooks[key][when];
            } catch (e) {
                return {
                    series: [],
                    parallel: []
                };
            }
        }
    }, {
        key: '_runHooks',
        value: function () {
            var _ref16 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee15(when, key, doc) {
                var hooks, i;
                return _regenerator2['default'].wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                hooks = this.getHooks(when, key);

                                if (hooks) {
                                    _context15.next = 3;
                                    break;
                                }

                                return _context15.abrupt('return');

                            case 3:
                                i = 0;

                            case 4:
                                if (!(i < hooks.series.length)) {
                                    _context15.next = 10;
                                    break;
                                }

                                _context15.next = 7;
                                return hooks.series[i](doc);

                            case 7:
                                i++;
                                _context15.next = 4;
                                break;

                            case 10:
                                _context15.next = 12;
                                return Promise.all(hooks.parallel.map(function (hook) {
                                    return hook(doc);
                                }));

                            case 12:
                            case 'end':
                                return _context15.stop();
                        }
                    }
                }, _callee15, this);
            }));

            function _runHooks(_x23, _x24, _x25) {
                return _ref16.apply(this, arguments);
            }

            return _runHooks;
        }()

        /**
         * does the same as ._runHooks() but with non-async-functions
         */

    }, {
        key: '_runHooksSync',
        value: function _runHooksSync(when, key, doc) {
            var hooks = this.getHooks(when, key);
            if (!hooks) return;
            hooks.series.forEach(function (hook) {
                return hook(doc);
            });
        }

        /**
         * creates a temporaryDocument which can be saved later
         * @param {Object} docData
         * @return {RxDocument}
         */

    }, {
        key: 'newDocument',
        value: function newDocument() {
            var docData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            docData = this.schema.fillObjectWithDefaults(docData);
            var doc = RxDocument.create(this, docData);
            doc._isTemporary = true;
            this._assignMethodsToDocument(doc);
            this._runHooksSync('post', 'create', doc);
            return doc;
        }
    }, {
        key: 'destroy',
        value: function () {
            var _ref17 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee16() {
                return _regenerator2['default'].wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                this._subs.forEach(function (sub) {
                                    return sub.unsubscribe();
                                });
                                this._changeEventBuffer && this._changeEventBuffer.destroy();
                                this._queryCache.destroy();
                                this._repStates.forEach(function (sync) {
                                    return sync.cancel();
                                });
                                delete this.database.collections[this.name];

                            case 5:
                            case 'end':
                                return _context16.stop();
                        }
                    }
                }, _callee16, this);
            }));

            function destroy() {
                return _ref17.apply(this, arguments);
            }

            return destroy;
        }()

        /**
         * remove all data
         * @return {Promise}
         */

    }, {
        key: 'remove',
        value: function () {
            var _ref18 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee17() {
                return _regenerator2['default'].wrap(function _callee17$(_context17) {
                    while (1) {
                        switch (_context17.prev = _context17.next) {
                            case 0:
                                _context17.next = 2;
                                return this.database.removeCollection(this.name);

                            case 2:
                            case 'end':
                                return _context17.stop();
                        }
                    }
                }, _callee17, this);
            }));

            function remove() {
                return _ref18.apply(this, arguments);
            }

            return remove;
        }()
    }, {
        key: '$',
        get: function get() {
            return this._observable$;
        }
    }]);
    return RxCollection;
}();

/**
 * checks if the migrationStrategies are ok, throws if not
 * @param  {RxSchema} schema
 * @param  {Object} migrationStrategies
 * @throws {Error|TypeError} if not ok
 * @return {boolean}
 */


var checkMigrationStrategies = function checkMigrationStrategies(schema, migrationStrategies) {
    // migrationStrategies must be object not array
    if ((typeof migrationStrategies === 'undefined' ? 'undefined' : (0, _typeof3['default'])(migrationStrategies)) !== 'object' || Array.isArray(migrationStrategies)) throw new TypeError('migrationStrategies must be an object');

    // for every previousVersion there must be strategy
    if (schema.previousVersions.length != Object.keys(migrationStrategies).length) {
        throw new Error('\n      a migrationStrategy is missing or too much\n      - have: ' + JSON.stringify(Object.keys(migrationStrategies).map(function (v) {
            return parseInt(v);
        })) + '\n      - should: ' + JSON.stringify(schema.previousVersions) + '\n      ');
    }

    // every strategy must have number as property and be a function
    schema.previousVersions.map(function (vNr) {
        return {
            v: vNr,
            s: migrationStrategies[vNr + 1 + '']
        };
    }).filter(function (strat) {
        return typeof strat.s !== 'function';
    }).forEach(function (strat) {
        throw new TypeError('migrationStrategy(v' + strat.v + ') must be a function; is : ' + (typeof strat === 'undefined' ? 'undefined' : (0, _typeof3['default'])(strat)));
    });

    return true;
};

/**
 * returns all possible properties of a RxCollection-instance
 * @return {string[]} property-names
 */
var _properties = null;
function properties() {
    if (!_properties) {
        var pseudoInstance = new RxCollection();
        var ownProperties = Object.getOwnPropertyNames(pseudoInstance);
        var prototypeProperties = Object.getOwnPropertyNames(Object.getPrototypeOf(pseudoInstance));
        _properties = [].concat((0, _toConsumableArray3['default'])(ownProperties), (0, _toConsumableArray3['default'])(prototypeProperties));
    }
    return _properties;
}

/**
 * checks if the given static methods are allowed
 * @param  {{}} statics [description]
 * @throws if not allowed
 */
var checkORMmethdods = function checkORMmethdods(statics) {
    Object.entries(statics).forEach(function (entry) {
        if (typeof entry[0] != 'string') throw new TypeError('given static method-name (' + entry[0] + ') is not a string');

        if (entry[0].startsWith('_')) throw new TypeError('static method-names cannot start with underscore _ (' + entry[0] + ')');

        if (typeof entry[1] != 'function') throw new TypeError('given static method (' + entry[0] + ') is not a function but ' + (0, _typeof3['default'])(entry[1]));

        if (properties().includes(entry[0]) || RxDocument.properties().includes(entry[0])) throw new Error('statics-name not allowed: ' + entry[0]);
    });
};function isInstanceOf(obj) {
    return obj instanceof RxCollection;
}
