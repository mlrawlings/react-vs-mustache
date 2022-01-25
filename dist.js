var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/benchmark/benchmark.js
var require_benchmark = __commonJS({
  "node_modules/benchmark/benchmark.js"(exports, module2) {
    (function() {
      "use strict";
      var undefined2;
      var objectTypes = {
        "function": true,
        "object": true
      };
      var root = objectTypes[typeof window] && window || this;
      var freeDefine = typeof define == "function" && typeof define.amd == "object" && define.amd && define;
      var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
      var freeModule = objectTypes[typeof module2] && module2 && !module2.nodeType && module2;
      var freeGlobal = freeExports && freeModule && typeof global == "object" && global;
      if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
        root = freeGlobal;
      }
      var freeRequire = typeof require == "function" && require;
      var counter = 0;
      var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
      var rePrimitive = /^(?:boolean|number|string|undefined)$/;
      var uidCounter = 0;
      var contextProps = [
        "Array",
        "Date",
        "Function",
        "Math",
        "Object",
        "RegExp",
        "String",
        "_",
        "clearTimeout",
        "chrome",
        "chromium",
        "document",
        "navigator",
        "phantom",
        "platform",
        "process",
        "runtime",
        "setTimeout"
      ];
      var divisors = {
        "1": 4096,
        "2": 512,
        "3": 64,
        "4": 8,
        "5": 0
      };
      var tTable = {
        "1": 12.706,
        "2": 4.303,
        "3": 3.182,
        "4": 2.776,
        "5": 2.571,
        "6": 2.447,
        "7": 2.365,
        "8": 2.306,
        "9": 2.262,
        "10": 2.228,
        "11": 2.201,
        "12": 2.179,
        "13": 2.16,
        "14": 2.145,
        "15": 2.131,
        "16": 2.12,
        "17": 2.11,
        "18": 2.101,
        "19": 2.093,
        "20": 2.086,
        "21": 2.08,
        "22": 2.074,
        "23": 2.069,
        "24": 2.064,
        "25": 2.06,
        "26": 2.056,
        "27": 2.052,
        "28": 2.048,
        "29": 2.045,
        "30": 2.042,
        "infinity": 1.96
      };
      var uTable = {
        "5": [0, 1, 2],
        "6": [1, 2, 3, 5],
        "7": [1, 3, 5, 6, 8],
        "8": [2, 4, 6, 8, 10, 13],
        "9": [2, 4, 7, 10, 12, 15, 17],
        "10": [3, 5, 8, 11, 14, 17, 20, 23],
        "11": [3, 6, 9, 13, 16, 19, 23, 26, 30],
        "12": [4, 7, 11, 14, 18, 22, 26, 29, 33, 37],
        "13": [4, 8, 12, 16, 20, 24, 28, 33, 37, 41, 45],
        "14": [5, 9, 13, 17, 22, 26, 31, 36, 40, 45, 50, 55],
        "15": [5, 10, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64],
        "16": [6, 11, 15, 21, 26, 31, 37, 42, 47, 53, 59, 64, 70, 75],
        "17": [6, 11, 17, 22, 28, 34, 39, 45, 51, 57, 63, 67, 75, 81, 87],
        "18": [7, 12, 18, 24, 30, 36, 42, 48, 55, 61, 67, 74, 80, 86, 93, 99],
        "19": [7, 13, 19, 25, 32, 38, 45, 52, 58, 65, 72, 78, 85, 92, 99, 106, 113],
        "20": [8, 14, 20, 27, 34, 41, 48, 55, 62, 69, 76, 83, 90, 98, 105, 112, 119, 127],
        "21": [8, 15, 22, 29, 36, 43, 50, 58, 65, 73, 80, 88, 96, 103, 111, 119, 126, 134, 142],
        "22": [9, 16, 23, 30, 38, 45, 53, 61, 69, 77, 85, 93, 101, 109, 117, 125, 133, 141, 150, 158],
        "23": [9, 17, 24, 32, 40, 48, 56, 64, 73, 81, 89, 98, 106, 115, 123, 132, 140, 149, 157, 166, 175],
        "24": [10, 17, 25, 33, 42, 50, 59, 67, 76, 85, 94, 102, 111, 120, 129, 138, 147, 156, 165, 174, 183, 192],
        "25": [10, 18, 27, 35, 44, 53, 62, 71, 80, 89, 98, 107, 117, 126, 135, 145, 154, 163, 173, 182, 192, 201, 211],
        "26": [11, 19, 28, 37, 46, 55, 64, 74, 83, 93, 102, 112, 122, 132, 141, 151, 161, 171, 181, 191, 200, 210, 220, 230],
        "27": [11, 20, 29, 38, 48, 57, 67, 77, 87, 97, 107, 118, 125, 138, 147, 158, 168, 178, 188, 199, 209, 219, 230, 240, 250],
        "28": [12, 21, 30, 40, 50, 60, 70, 80, 90, 101, 111, 122, 132, 143, 154, 164, 175, 186, 196, 207, 218, 228, 239, 250, 261, 272],
        "29": [13, 22, 32, 42, 52, 62, 73, 83, 94, 105, 116, 127, 138, 149, 160, 171, 182, 193, 204, 215, 226, 238, 249, 260, 271, 282, 294],
        "30": [13, 23, 33, 43, 54, 65, 76, 87, 98, 109, 120, 131, 143, 154, 166, 177, 189, 200, 212, 223, 235, 247, 258, 270, 282, 293, 305, 317]
      };
      function runInContext(context) {
        var _ = context && context._ || require2("lodash") || root._;
        if (!_) {
          Benchmark2.runInContext = runInContext;
          return Benchmark2;
        }
        context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
        var Array2 = context.Array, Date = context.Date, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String;
        var arrayRef = [], objectProto = Object2.prototype;
        var abs = Math2.abs, clearTimeout = context.clearTimeout, floor = Math2.floor, log = Math2.log, max = Math2.max, min = Math2.min, pow = Math2.pow, push = arrayRef.push, setTimeout = context.setTimeout, shift = arrayRef.shift, slice = arrayRef.slice, sqrt = Math2.sqrt, toString = objectProto.toString, unshift = arrayRef.unshift;
        var req = require2;
        var doc = isHostType(context, "document") && context.document;
        var microtimeObject = req("microtime");
        var processObject = isHostType(context, "process") && context.process;
        var trash = doc && doc.createElement("div");
        var uid = "uid" + _.now();
        var calledBy = {};
        var support = {};
        (function() {
          support.browser = doc && isHostType(context, "navigator") && !isHostType(context, "phantom");
          support.timeout = isHostType(context, "setTimeout") && isHostType(context, "clearTimeout");
          try {
            support.decompilation = Function2(("return (" + function(x) {
              return { "x": "" + (1 + x), "y": 0 };
            } + ")").replace(/__cov__[^;]+;/g, ""))()(0).x === "1";
          } catch (e) {
            support.decompilation = false;
          }
        })();
        var timer = {
          "ns": Date,
          "start": null,
          "stop": null
        };
        function Benchmark2(name, fn, options) {
          var bench = this;
          if (!(bench instanceof Benchmark2)) {
            return new Benchmark2(name, fn, options);
          }
          if (_.isPlainObject(name)) {
            options = name;
          } else if (_.isFunction(name)) {
            options = fn;
            fn = name;
          } else if (_.isPlainObject(fn)) {
            options = fn;
            fn = null;
            bench.name = name;
          } else {
            bench.name = name;
          }
          setOptions(bench, options);
          bench.id || (bench.id = ++counter);
          bench.fn == null && (bench.fn = fn);
          bench.stats = cloneDeep(bench.stats);
          bench.times = cloneDeep(bench.times);
        }
        function Deferred(clone2) {
          var deferred = this;
          if (!(deferred instanceof Deferred)) {
            return new Deferred(clone2);
          }
          deferred.benchmark = clone2;
          clock(deferred);
        }
        function Event(type) {
          var event = this;
          if (type instanceof Event) {
            return type;
          }
          return event instanceof Event ? _.assign(event, { "timeStamp": _.now() }, typeof type == "string" ? { "type": type } : type) : new Event(type);
        }
        function Suite(name, options) {
          var suite2 = this;
          if (!(suite2 instanceof Suite)) {
            return new Suite(name, options);
          }
          if (_.isPlainObject(name)) {
            options = name;
          } else {
            suite2.name = name;
          }
          setOptions(suite2, options);
        }
        var cloneDeep = _.partial(_.cloneDeepWith, _, function(value) {
          if (!_.isArray(value) && !_.isPlainObject(value)) {
            return value;
          }
        });
        function createFunction() {
          createFunction = function(args, body) {
            var result, anchor = freeDefine ? freeDefine.amd : Benchmark2, prop = uid + "createFunction";
            runScript((freeDefine ? "define.amd." : "Benchmark.") + prop + "=function(" + args + "){" + body + "}");
            result = anchor[prop];
            delete anchor[prop];
            return result;
          };
          createFunction = support.browser && (createFunction("", 'return"' + uid + '"') || _.noop)() == uid ? createFunction : Function2;
          return createFunction.apply(null, arguments);
        }
        function delay(bench, fn) {
          bench._timerId = _.delay(fn, bench.delay * 1e3);
        }
        function destroyElement(element) {
          trash.appendChild(element);
          trash.innerHTML = "";
        }
        function getFirstArgument(fn) {
          return !_.has(fn, "toString") && (/^[\s(]*function[^(]*\(([^\s,)]+)/.exec(fn) || 0)[1] || "";
        }
        function getMean(sample) {
          return _.reduce(sample, function(sum, x) {
            return sum + x;
          }) / sample.length || 0;
        }
        function getSource(fn) {
          var result = "";
          if (isStringable(fn)) {
            result = String2(fn);
          } else if (support.decompilation) {
            result = _.result(/^[^{]+\{([\s\S]*)\}\s*$/.exec(fn), 1);
          }
          result = (result || "").replace(/^\s+|\s+$/g, "");
          return /^(?:\/\*+[\w\W]*?\*\/|\/\/.*?[\n\r\u2028\u2029]|\s)*(["'])use strict\1;?$/.test(result) ? "" : result;
        }
        function isClassOf(value, name) {
          return value != null && toString.call(value) == "[object " + name + "]";
        }
        function isHostType(object, property) {
          if (object == null) {
            return false;
          }
          var type = typeof object[property];
          return !rePrimitive.test(type) && (type != "object" || !!object[property]);
        }
        function isStringable(value) {
          return _.isString(value) || _.has(value, "toString") && _.isFunction(value.toString);
        }
        function require2(id) {
          try {
            var result = freeExports && freeRequire(id);
          } catch (e) {
          }
          return result || null;
        }
        function runScript(code) {
          var anchor = freeDefine ? define.amd : Benchmark2, script = doc.createElement("script"), sibling = doc.getElementsByTagName("script")[0], parent = sibling.parentNode, prop = uid + "runScript", prefix = "(" + (freeDefine ? "define.amd." : "Benchmark.") + prop + "||function(){})();";
          try {
            script.appendChild(doc.createTextNode(prefix + code));
            anchor[prop] = function() {
              destroyElement(script);
            };
          } catch (e) {
            parent = parent.cloneNode(false);
            sibling = null;
            script.text = code;
          }
          parent.insertBefore(script, sibling);
          delete anchor[prop];
        }
        function setOptions(object, options) {
          options = object.options = _.assign({}, cloneDeep(object.constructor.options), cloneDeep(options));
          _.forOwn(options, function(value, key) {
            if (value != null) {
              if (/^on[A-Z]/.test(key)) {
                _.each(key.split(" "), function(key2) {
                  object.on(key2.slice(2).toLowerCase(), value);
                });
              } else if (!_.has(object, key)) {
                object[key] = cloneDeep(value);
              }
            }
          });
        }
        function resolve() {
          var deferred = this, clone2 = deferred.benchmark, bench = clone2._original;
          if (bench.aborted) {
            deferred.teardown();
            clone2.running = false;
            cycle(deferred);
          } else if (++deferred.cycles < clone2.count) {
            clone2.compiled.call(deferred, context, timer);
          } else {
            timer.stop(deferred);
            deferred.teardown();
            delay(clone2, function() {
              cycle(deferred);
            });
          }
        }
        function filter(array, callback) {
          if (callback === "successful") {
            callback = function(bench) {
              return bench.cycles && _.isFinite(bench.hz) && !bench.error;
            };
          } else if (callback === "fastest" || callback === "slowest") {
            var result = filter(array, "successful").sort(function(a, b) {
              a = a.stats;
              b = b.stats;
              return (a.mean + a.moe > b.mean + b.moe ? 1 : -1) * (callback === "fastest" ? 1 : -1);
            });
            return _.filter(result, function(bench) {
              return result[0].compare(bench) == 0;
            });
          }
          return _.filter(array, callback);
        }
        function formatNumber(number) {
          number = String2(number).split(".");
          return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ",") + (number[1] ? "." + number[1] : "");
        }
        function invoke(benches, name) {
          var args, bench, queued, index = -1, eventProps = { "currentTarget": benches }, options = { "onStart": _.noop, "onCycle": _.noop, "onComplete": _.noop }, result = _.toArray(benches);
          function execute() {
            var listeners2, async = isAsync(bench);
            if (async) {
              bench.on("complete", getNext);
              listeners2 = bench.events.complete;
              listeners2.splice(0, 0, listeners2.pop());
            }
            result[index] = _.isFunction(bench && bench[name]) ? bench[name].apply(bench, args) : undefined2;
            return !async && getNext();
          }
          function getNext(event) {
            var cycleEvent, last = bench, async = isAsync(last);
            if (async) {
              last.off("complete", getNext);
              last.emit("complete");
            }
            eventProps.type = "cycle";
            eventProps.target = last;
            cycleEvent = Event(eventProps);
            options.onCycle.call(benches, cycleEvent);
            if (!cycleEvent.aborted && raiseIndex() !== false) {
              bench = queued ? benches[0] : result[index];
              if (isAsync(bench)) {
                delay(bench, execute);
              } else if (async) {
                while (execute()) {
                }
              } else {
                return true;
              }
            } else {
              eventProps.type = "complete";
              options.onComplete.call(benches, Event(eventProps));
            }
            if (event) {
              event.aborted = true;
            } else {
              return false;
            }
          }
          function isAsync(object) {
            var async = args[0] && args[0].async;
            return name == "run" && object instanceof Benchmark2 && ((async == null ? object.options.async : async) && support.timeout || object.defer);
          }
          function raiseIndex() {
            index++;
            if (queued && index > 0) {
              shift.call(benches);
            }
            return (queued ? benches.length : index < result.length) ? index : index = false;
          }
          if (_.isString(name)) {
            args = slice.call(arguments, 2);
          } else {
            options = _.assign(options, name);
            name = options.name;
            args = _.isArray(args = "args" in options ? options.args : []) ? args : [args];
            queued = options.queued;
          }
          if (raiseIndex() !== false) {
            bench = result[index];
            eventProps.type = "start";
            eventProps.target = bench;
            options.onStart.call(benches, Event(eventProps));
            if (name == "run" && benches instanceof Suite && benches.aborted) {
              eventProps.type = "cycle";
              options.onCycle.call(benches, Event(eventProps));
              eventProps.type = "complete";
              options.onComplete.call(benches, Event(eventProps));
            } else {
              if (isAsync(bench)) {
                delay(bench, execute);
              } else {
                while (execute()) {
                }
              }
            }
          }
          return result;
        }
        function join(object, separator1, separator2) {
          var result = [], length = (object = Object2(object)).length, arrayLike = length === length >>> 0;
          separator2 || (separator2 = ": ");
          _.each(object, function(value, key) {
            result.push(arrayLike ? value : key + separator2 + value);
          });
          return result.join(separator1 || ",");
        }
        function abortSuite() {
          var event, suite2 = this, resetting = calledBy.resetSuite;
          if (suite2.running) {
            event = Event("abort");
            suite2.emit(event);
            if (!event.cancelled || resetting) {
              calledBy.abortSuite = true;
              suite2.reset();
              delete calledBy.abortSuite;
              if (!resetting) {
                suite2.aborted = true;
                invoke(suite2, "abort");
              }
            }
          }
          return suite2;
        }
        function add(name, fn, options) {
          var suite2 = this, bench = new Benchmark2(name, fn, options), event = Event({ "type": "add", "target": bench });
          if (suite2.emit(event), !event.cancelled) {
            suite2.push(bench);
          }
          return suite2;
        }
        function cloneSuite(options) {
          var suite2 = this, result = new suite2.constructor(_.assign({}, suite2.options, options));
          _.forOwn(suite2, function(value, key) {
            if (!_.has(result, key)) {
              result[key] = _.isFunction(_.get(value, "clone")) ? value.clone() : cloneDeep(value);
            }
          });
          return result;
        }
        function filterSuite(callback) {
          var suite2 = this, result = new suite2.constructor(suite2.options);
          result.push.apply(result, filter(suite2, callback));
          return result;
        }
        function resetSuite() {
          var event, suite2 = this, aborting = calledBy.abortSuite;
          if (suite2.running && !aborting) {
            calledBy.resetSuite = true;
            suite2.abort();
            delete calledBy.resetSuite;
          } else if ((suite2.aborted || suite2.running) && (suite2.emit(event = Event("reset")), !event.cancelled)) {
            suite2.aborted = suite2.running = false;
            if (!aborting) {
              invoke(suite2, "reset");
            }
          }
          return suite2;
        }
        function runSuite(options) {
          var suite2 = this;
          suite2.reset();
          suite2.running = true;
          options || (options = {});
          invoke(suite2, {
            "name": "run",
            "args": options,
            "queued": options.queued,
            "onStart": function(event) {
              suite2.emit(event);
            },
            "onCycle": function(event) {
              var bench = event.target;
              if (bench.error) {
                suite2.emit({ "type": "error", "target": bench });
              }
              suite2.emit(event);
              event.aborted = suite2.aborted;
            },
            "onComplete": function(event) {
              suite2.running = false;
              suite2.emit(event);
            }
          });
          return suite2;
        }
        function emit(type) {
          var listeners2, object = this, event = Event(type), events = object.events, args = (arguments[0] = event, arguments);
          event.currentTarget || (event.currentTarget = object);
          event.target || (event.target = object);
          delete event.result;
          if (events && (listeners2 = _.has(events, event.type) && events[event.type])) {
            _.each(listeners2.slice(), function(listener) {
              if ((event.result = listener.apply(object, args)) === false) {
                event.cancelled = true;
              }
              return !event.aborted;
            });
          }
          return event.result;
        }
        function listeners(type) {
          var object = this, events = object.events || (object.events = {});
          return _.has(events, type) ? events[type] : events[type] = [];
        }
        function off(type, listener) {
          var object = this, events = object.events;
          if (!events) {
            return object;
          }
          _.each(type ? type.split(" ") : events, function(listeners2, type2) {
            var index;
            if (typeof listeners2 == "string") {
              type2 = listeners2;
              listeners2 = _.has(events, type2) && events[type2];
            }
            if (listeners2) {
              if (listener) {
                index = _.indexOf(listeners2, listener);
                if (index > -1) {
                  listeners2.splice(index, 1);
                }
              } else {
                listeners2.length = 0;
              }
            }
          });
          return object;
        }
        function on(type, listener) {
          var object = this, events = object.events || (object.events = {});
          _.each(type.split(" "), function(type2) {
            (_.has(events, type2) ? events[type2] : events[type2] = []).push(listener);
          });
          return object;
        }
        function abort() {
          var event, bench = this, resetting = calledBy.reset;
          if (bench.running) {
            event = Event("abort");
            bench.emit(event);
            if (!event.cancelled || resetting) {
              calledBy.abort = true;
              bench.reset();
              delete calledBy.abort;
              if (support.timeout) {
                clearTimeout(bench._timerId);
                delete bench._timerId;
              }
              if (!resetting) {
                bench.aborted = true;
                bench.running = false;
              }
            }
          }
          return bench;
        }
        function clone(options) {
          var bench = this, result = new bench.constructor(_.assign({}, bench, options));
          result.options = _.assign({}, cloneDeep(bench.options), cloneDeep(options));
          _.forOwn(bench, function(value, key) {
            if (!_.has(result, key)) {
              result[key] = cloneDeep(value);
            }
          });
          return result;
        }
        function compare(other) {
          var bench = this;
          if (bench == other) {
            return 0;
          }
          var critical, zStat, sample1 = bench.stats.sample, sample2 = other.stats.sample, size1 = sample1.length, size2 = sample2.length, maxSize = max(size1, size2), minSize = min(size1, size2), u1 = getU(sample1, sample2), u2 = getU(sample2, sample1), u = min(u1, u2);
          function getScore(xA, sampleB) {
            return _.reduce(sampleB, function(total, xB) {
              return total + (xB > xA ? 0 : xB < xA ? 1 : 0.5);
            }, 0);
          }
          function getU(sampleA, sampleB) {
            return _.reduce(sampleA, function(total, xA) {
              return total + getScore(xA, sampleB);
            }, 0);
          }
          function getZ(u3) {
            return (u3 - size1 * size2 / 2) / sqrt(size1 * size2 * (size1 + size2 + 1) / 12);
          }
          if (size1 + size2 > 30) {
            zStat = getZ(u);
            return abs(zStat) > 1.96 ? u == u1 ? 1 : -1 : 0;
          }
          critical = maxSize < 5 || minSize < 3 ? 0 : uTable[maxSize][minSize - 3];
          return u <= critical ? u == u1 ? 1 : -1 : 0;
        }
        function reset() {
          var bench = this;
          if (bench.running && !calledBy.abort) {
            calledBy.reset = true;
            bench.abort();
            delete calledBy.reset;
            return bench;
          }
          var event, index = 0, changes = [], queue = [];
          var data = {
            "destination": bench,
            "source": _.assign({}, cloneDeep(bench.constructor.prototype), cloneDeep(bench.options))
          };
          do {
            _.forOwn(data.source, function(value, key) {
              var changed, destination = data.destination, currValue = destination[key];
              if (/^_|^events$|^on[A-Z]/.test(key)) {
                return;
              }
              if (_.isObjectLike(value)) {
                if (_.isArray(value)) {
                  if (!_.isArray(currValue)) {
                    changed = true;
                    currValue = [];
                  }
                  if (currValue.length != value.length) {
                    changed = true;
                    currValue = currValue.slice(0, value.length);
                    currValue.length = value.length;
                  }
                } else if (!_.isObjectLike(currValue)) {
                  changed = true;
                  currValue = {};
                }
                if (changed) {
                  changes.push({ "destination": destination, "key": key, "value": currValue });
                }
                queue.push({ "destination": currValue, "source": value });
              } else if (!_.eq(currValue, value) && value !== undefined2) {
                changes.push({ "destination": destination, "key": key, "value": value });
              }
            });
          } while (data = queue[index++]);
          if (changes.length && (bench.emit(event = Event("reset")), !event.cancelled)) {
            _.each(changes, function(data2) {
              data2.destination[data2.key] = data2.value;
            });
          }
          return bench;
        }
        function toStringBench() {
          var bench = this, error = bench.error, hz = bench.hz, id = bench.id, stats = bench.stats, size = stats.sample.length, pm = "\xB1", result = bench.name || (_.isNaN(id) ? id : "<Test #" + id + ">");
          if (error) {
            var errorStr;
            if (!_.isObject(error)) {
              errorStr = String2(error);
            } else if (!_.isError(Error)) {
              errorStr = join(error);
            } else {
              errorStr = join(_.assign({ "name": error.name, "message": error.message }, error));
            }
            result += ": " + errorStr;
          } else {
            result += " x " + formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) + " ops/sec " + pm + stats.rme.toFixed(2) + "% (" + size + " run" + (size == 1 ? "" : "s") + " sampled)";
          }
          return result;
        }
        function clock() {
          var options = Benchmark2.options, templateData = {}, timers = [{ "ns": timer.ns, "res": max(15e-4, getRes("ms")), "unit": "ms" }];
          clock = function(clone2) {
            var deferred;
            if (clone2 instanceof Deferred) {
              deferred = clone2;
              clone2 = deferred.benchmark;
            }
            var bench = clone2._original, stringable = isStringable(bench.fn), count = bench.count = clone2.count, decompilable = stringable || support.decompilation && (clone2.setup !== _.noop || clone2.teardown !== _.noop), id = bench.id, name = bench.name || (typeof id == "number" ? "<Test #" + id + ">" : id), result = 0;
            clone2.minTime = bench.minTime || (bench.minTime = bench.options.minTime = options.minTime);
            var funcBody = deferred ? 'var d#=this,${fnArg}=d#,m#=d#.benchmark._original,f#=m#.fn,su#=m#.setup,td#=m#.teardown;if(!d#.cycles){d#.fn=function(){var ${fnArg}=d#;if(typeof f#=="function"){try{${fn}\n}catch(e#){f#(d#)}}else{${fn}\n}};d#.teardown=function(){d#.cycles=0;if(typeof td#=="function"){try{${teardown}\n}catch(e#){td#()}}else{${teardown}\n}};if(typeof su#=="function"){try{${setup}\n}catch(e#){su#()}}else{${setup}\n};t#.start(d#);}d#.fn();return{uid:"${uid}"}' : 'var r#,s#,m#=this,f#=m#.fn,i#=m#.count,n#=t#.ns;${setup}\n${begin};while(i#--){${fn}\n}${end};${teardown}\nreturn{elapsed:r#,uid:"${uid}"}';
            var compiled = bench.compiled = clone2.compiled = createCompiled(bench, decompilable, deferred, funcBody), isEmpty = !(templateData.fn || stringable);
            try {
              if (isEmpty) {
                throw new Error('The test "' + name + '" is empty. This may be the result of dead code removal.');
              } else if (!deferred) {
                bench.count = 1;
                compiled = decompilable && (compiled.call(bench, context, timer) || {}).uid == templateData.uid && compiled;
                bench.count = count;
              }
            } catch (e) {
              compiled = null;
              clone2.error = e || new Error(String2(e));
              bench.count = count;
            }
            if (!compiled && !deferred && !isEmpty) {
              funcBody = (stringable || decompilable && !clone2.error ? "function f#(){${fn}\n}var r#,s#,m#=this,i#=m#.count" : "var r#,s#,m#=this,f#=m#.fn,i#=m#.count") + ",n#=t#.ns;${setup}\n${begin};m#.f#=f#;while(i#--){m#.f#()}${end};delete m#.f#;${teardown}\nreturn{elapsed:r#}";
              compiled = createCompiled(bench, decompilable, deferred, funcBody);
              try {
                bench.count = 1;
                compiled.call(bench, context, timer);
                bench.count = count;
                delete clone2.error;
              } catch (e) {
                bench.count = count;
                if (!clone2.error) {
                  clone2.error = e || new Error(String2(e));
                }
              }
            }
            if (!clone2.error) {
              compiled = bench.compiled = clone2.compiled = createCompiled(bench, decompilable, deferred, funcBody);
              result = compiled.call(deferred || bench, context, timer).elapsed;
            }
            return result;
          };
          function createCompiled(bench, decompilable, deferred, body) {
            var fn = bench.fn, fnArg = deferred ? getFirstArgument(fn) || "deferred" : "";
            templateData.uid = uid + uidCounter++;
            _.assign(templateData, {
              "setup": decompilable ? getSource(bench.setup) : interpolate("m#.setup()"),
              "fn": decompilable ? getSource(fn) : interpolate("m#.fn(" + fnArg + ")"),
              "fnArg": fnArg,
              "teardown": decompilable ? getSource(bench.teardown) : interpolate("m#.teardown()")
            });
            if (timer.unit == "ns") {
              _.assign(templateData, {
                "begin": interpolate("s#=n#()"),
                "end": interpolate("r#=n#(s#);r#=r#[0]+(r#[1]/1e9)")
              });
            } else if (timer.unit == "us") {
              if (timer.ns.stop) {
                _.assign(templateData, {
                  "begin": interpolate("s#=n#.start()"),
                  "end": interpolate("r#=n#.microseconds()/1e6")
                });
              } else {
                _.assign(templateData, {
                  "begin": interpolate("s#=n#()"),
                  "end": interpolate("r#=(n#()-s#)/1e6")
                });
              }
            } else if (timer.ns.now) {
              _.assign(templateData, {
                "begin": interpolate("s#=n#.now()"),
                "end": interpolate("r#=(n#.now()-s#)/1e3")
              });
            } else {
              _.assign(templateData, {
                "begin": interpolate("s#=new n#().getTime()"),
                "end": interpolate("r#=(new n#().getTime()-s#)/1e3")
              });
            }
            timer.start = createFunction(interpolate("o#"), interpolate("var n#=this.ns,${begin};o#.elapsed=0;o#.timeStamp=s#"));
            timer.stop = createFunction(interpolate("o#"), interpolate("var n#=this.ns,s#=o#.timeStamp,${end};o#.elapsed=r#"));
            return createFunction(interpolate("window,t#"), "var global = window, clearTimeout = global.clearTimeout, setTimeout = global.setTimeout;\n" + interpolate(body));
          }
          function getRes(unit) {
            var measured, begin, count = 30, divisor = 1e3, ns = timer.ns, sample = [];
            while (count--) {
              if (unit == "us") {
                divisor = 1e6;
                if (ns.stop) {
                  ns.start();
                  while (!(measured = ns.microseconds())) {
                  }
                } else {
                  begin = ns();
                  while (!(measured = ns() - begin)) {
                  }
                }
              } else if (unit == "ns") {
                divisor = 1e9;
                begin = (begin = ns())[0] + begin[1] / divisor;
                while (!(measured = (measured = ns())[0] + measured[1] / divisor - begin)) {
                }
                divisor = 1;
              } else if (ns.now) {
                begin = ns.now();
                while (!(measured = ns.now() - begin)) {
                }
              } else {
                begin = new ns().getTime();
                while (!(measured = new ns().getTime() - begin)) {
                }
              }
              if (measured > 0) {
                sample.push(measured);
              } else {
                sample.push(Infinity);
                break;
              }
            }
            return getMean(sample) / divisor;
          }
          function interpolate(string) {
            return _.template(string.replace(/\#/g, /\d+/.exec(templateData.uid)))(templateData);
          }
          try {
            if (timer.ns = new (context.chrome || context.chromium).Interval()) {
              timers.push({ "ns": timer.ns, "res": getRes("us"), "unit": "us" });
            }
          } catch (e) {
          }
          if (processObject && typeof (timer.ns = processObject.hrtime) == "function") {
            timers.push({ "ns": timer.ns, "res": getRes("ns"), "unit": "ns" });
          }
          if (microtimeObject && typeof (timer.ns = microtimeObject.now) == "function") {
            timers.push({ "ns": timer.ns, "res": getRes("us"), "unit": "us" });
          }
          timer = _.minBy(timers, "res");
          if (timer.res == Infinity) {
            throw new Error("Benchmark.js was unable to find a working timer.");
          }
          options.minTime || (options.minTime = max(timer.res / 2 / 0.01, 0.05));
          return clock.apply(null, arguments);
        }
        function compute(bench, options) {
          options || (options = {});
          var async = options.async, elapsed = 0, initCount = bench.initCount, minSamples = bench.minSamples, queue = [], sample = bench.stats.sample;
          function enqueue() {
            queue.push(_.assign(bench.clone(), {
              "_original": bench,
              "events": {
                "abort": [update],
                "cycle": [update],
                "error": [update],
                "start": [update]
              }
            }));
          }
          function update(event) {
            var clone2 = this, type = event.type;
            if (bench.running) {
              if (type == "start") {
                clone2.count = bench.initCount;
              } else {
                if (type == "error") {
                  bench.error = clone2.error;
                }
                if (type == "abort") {
                  bench.abort();
                  bench.emit("cycle");
                } else {
                  event.currentTarget = event.target = bench;
                  bench.emit(event);
                }
              }
            } else if (bench.aborted) {
              clone2.events.abort.length = 0;
              clone2.abort();
            }
          }
          function evaluate(event) {
            var critical, df, mean, moe, rme, sd, sem, variance, clone2 = event.target, done = bench.aborted, now = _.now(), size = sample.push(clone2.times.period), maxedOut = size >= minSamples && (elapsed += now - clone2.times.timeStamp) / 1e3 > bench.maxTime, times = bench.times, varOf = function(sum, x) {
              return sum + pow(x - mean, 2);
            };
            if (done || clone2.hz == Infinity) {
              maxedOut = !(size = sample.length = queue.length = 0);
            }
            if (!done) {
              mean = getMean(sample);
              variance = _.reduce(sample, varOf, 0) / (size - 1) || 0;
              sd = sqrt(variance);
              sem = sd / sqrt(size);
              df = size - 1;
              critical = tTable[Math2.round(df) || 1] || tTable.infinity;
              moe = sem * critical;
              rme = moe / mean * 100 || 0;
              _.assign(bench.stats, {
                "deviation": sd,
                "mean": mean,
                "moe": moe,
                "rme": rme,
                "sem": sem,
                "variance": variance
              });
              if (maxedOut) {
                bench.initCount = initCount;
                bench.running = false;
                done = true;
                times.elapsed = (now - times.timeStamp) / 1e3;
              }
              if (bench.hz != Infinity) {
                bench.hz = 1 / mean;
                times.cycle = mean * bench.count;
                times.period = mean;
              }
            }
            if (queue.length < 2 && !maxedOut) {
              enqueue();
            }
            event.aborted = done;
          }
          enqueue();
          invoke(queue, {
            "name": "run",
            "args": { "async": async },
            "queued": true,
            "onCycle": evaluate,
            "onComplete": function() {
              bench.emit("complete");
            }
          });
        }
        function cycle(clone2, options) {
          options || (options = {});
          var deferred;
          if (clone2 instanceof Deferred) {
            deferred = clone2;
            clone2 = clone2.benchmark;
          }
          var clocked, cycles, divisor, event, minTime, period, async = options.async, bench = clone2._original, count = clone2.count, times = clone2.times;
          if (clone2.running) {
            cycles = ++clone2.cycles;
            clocked = deferred ? deferred.elapsed : clock(clone2);
            minTime = clone2.minTime;
            if (cycles > bench.cycles) {
              bench.cycles = cycles;
            }
            if (clone2.error) {
              event = Event("error");
              event.message = clone2.error;
              clone2.emit(event);
              if (!event.cancelled) {
                clone2.abort();
              }
            }
          }
          if (clone2.running) {
            bench.times.cycle = times.cycle = clocked;
            period = bench.times.period = times.period = clocked / count;
            bench.hz = clone2.hz = 1 / period;
            bench.initCount = clone2.initCount = count;
            clone2.running = clocked < minTime;
            if (clone2.running) {
              if (!clocked && (divisor = divisors[clone2.cycles]) != null) {
                count = floor(4e6 / divisor);
              }
              if (count <= clone2.count) {
                count += Math2.ceil((minTime - clocked) / period);
              }
              clone2.running = count != Infinity;
            }
          }
          event = Event("cycle");
          clone2.emit(event);
          if (event.aborted) {
            clone2.abort();
          }
          if (clone2.running) {
            clone2.count = count;
            if (deferred) {
              clone2.compiled.call(deferred, context, timer);
            } else if (async) {
              delay(clone2, function() {
                cycle(clone2, options);
              });
            } else {
              cycle(clone2);
            }
          } else {
            if (support.browser) {
              runScript(uid + "=1;delete " + uid);
            }
            clone2.emit("complete");
          }
        }
        function run(options) {
          var bench = this, event = Event("start");
          bench.running = false;
          bench.reset();
          bench.running = true;
          bench.count = bench.initCount;
          bench.times.timeStamp = _.now();
          bench.emit(event);
          if (!event.cancelled) {
            options = { "async": ((options = options && options.async) == null ? bench.async : options) && support.timeout };
            if (bench._original) {
              if (bench.defer) {
                Deferred(bench);
              } else {
                cycle(bench, options);
              }
            } else {
              compute(bench, options);
            }
          }
          return bench;
        }
        _.assign(Benchmark2, {
          "options": {
            "async": false,
            "defer": false,
            "delay": 5e-3,
            "id": undefined2,
            "initCount": 1,
            "maxTime": 5,
            "minSamples": 5,
            "minTime": 0,
            "name": undefined2,
            "onAbort": undefined2,
            "onComplete": undefined2,
            "onCycle": undefined2,
            "onError": undefined2,
            "onReset": undefined2,
            "onStart": undefined2
          },
          "platform": context.platform || require2("platform") || {
            "description": context.navigator && context.navigator.userAgent || null,
            "layout": null,
            "product": null,
            "name": null,
            "manufacturer": null,
            "os": null,
            "prerelease": null,
            "version": null,
            "toString": function() {
              return this.description || "";
            }
          },
          "version": "2.1.4"
        });
        _.assign(Benchmark2, {
          "filter": filter,
          "formatNumber": formatNumber,
          "invoke": invoke,
          "join": join,
          "runInContext": runInContext,
          "support": support
        });
        _.each(["each", "forEach", "forOwn", "has", "indexOf", "map", "reduce"], function(methodName) {
          Benchmark2[methodName] = _[methodName];
        });
        _.assign(Benchmark2.prototype, {
          "count": 0,
          "cycles": 0,
          "hz": 0,
          "compiled": undefined2,
          "error": undefined2,
          "fn": undefined2,
          "aborted": false,
          "running": false,
          "setup": _.noop,
          "teardown": _.noop,
          "stats": {
            "moe": 0,
            "rme": 0,
            "sem": 0,
            "deviation": 0,
            "mean": 0,
            "sample": [],
            "variance": 0
          },
          "times": {
            "cycle": 0,
            "elapsed": 0,
            "period": 0,
            "timeStamp": 0
          }
        });
        _.assign(Benchmark2.prototype, {
          "abort": abort,
          "clone": clone,
          "compare": compare,
          "emit": emit,
          "listeners": listeners,
          "off": off,
          "on": on,
          "reset": reset,
          "run": run,
          "toString": toStringBench
        });
        _.assign(Deferred.prototype, {
          "benchmark": null,
          "cycles": 0,
          "elapsed": 0,
          "timeStamp": 0
        });
        _.assign(Deferred.prototype, {
          "resolve": resolve
        });
        _.assign(Event.prototype, {
          "aborted": false,
          "cancelled": false,
          "currentTarget": undefined2,
          "result": undefined2,
          "target": undefined2,
          "timeStamp": 0,
          "type": ""
        });
        Suite.options = {
          "name": undefined2
        };
        _.assign(Suite.prototype, {
          "length": 0,
          "aborted": false,
          "running": false
        });
        _.assign(Suite.prototype, {
          "abort": abortSuite,
          "add": add,
          "clone": cloneSuite,
          "emit": emit,
          "filter": filterSuite,
          "join": arrayRef.join,
          "listeners": listeners,
          "off": off,
          "on": on,
          "pop": arrayRef.pop,
          "push": push,
          "reset": resetSuite,
          "run": runSuite,
          "reverse": arrayRef.reverse,
          "shift": shift,
          "slice": slice,
          "sort": arrayRef.sort,
          "splice": arrayRef.splice,
          "unshift": unshift
        });
        _.assign(Benchmark2, {
          "Deferred": Deferred,
          "Event": Event,
          "Suite": Suite
        });
        _.each(["each", "forEach", "indexOf", "map", "reduce"], function(methodName) {
          var func = _[methodName];
          Suite.prototype[methodName] = function() {
            var args = [this];
            push.apply(args, arguments);
            return func.apply(_, args);
          };
        });
        _.each(["pop", "shift", "splice"], function(methodName) {
          var func = arrayRef[methodName];
          Suite.prototype[methodName] = function() {
            var value = this, result = func.apply(value, arguments);
            if (value.length === 0) {
              delete value[0];
            }
            return result;
          };
        });
        Suite.prototype.unshift = function() {
          var value = this;
          unshift.apply(value, arguments);
          return value.length;
        };
        return Benchmark2;
      }
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        define(["lodash", "platform"], function(_, platform) {
          return runInContext({
            "_": _,
            "platform": platform
          });
        });
      } else {
        var Benchmark = runInContext();
        if (freeExports && freeModule) {
          if (moduleExports) {
            (freeModule.exports = Benchmark).Benchmark = Benchmark;
          }
          freeExports.Benchmark = Benchmark;
        } else {
          root.Benchmark = Benchmark;
        }
      }
    }).call(exports);
  }
});

// node_modules/mustache/mustache.js
var require_mustache = __commonJS({
  "node_modules/mustache/mustache.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = global2 || self, global2.Mustache = factory());
    })(exports, function() {
      "use strict";
      var objectToString = Object.prototype.toString;
      var isArray = Array.isArray || function isArrayPolyfill(object) {
        return objectToString.call(object) === "[object Array]";
      };
      function isFunction(object) {
        return typeof object === "function";
      }
      function typeStr(obj) {
        return isArray(obj) ? "array" : typeof obj;
      }
      function escapeRegExp(string) {
        return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      }
      function hasProperty(obj, propName) {
        return obj != null && typeof obj === "object" && propName in obj;
      }
      function primitiveHasOwnProperty(primitive, propName) {
        return primitive != null && typeof primitive !== "object" && primitive.hasOwnProperty && primitive.hasOwnProperty(propName);
      }
      var regExpTest = RegExp.prototype.test;
      function testRegExp(re, string) {
        return regExpTest.call(re, string);
      }
      var nonSpaceRe = /\S/;
      function isWhitespace(string) {
        return !testRegExp(nonSpaceRe, string);
      }
      var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;"
      };
      function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
          return entityMap[s];
        });
      }
      var whiteRe = /\s*/;
      var spaceRe = /\s+/;
      var equalsRe = /\s*=/;
      var curlyRe = /\s*\}/;
      var tagRe = /#|\^|\/|>|\{|&|=|!/;
      function parseTemplate(template, tags) {
        if (!template)
          return [];
        var lineHasNonSpace = false;
        var sections = [];
        var tokens = [];
        var spaces = [];
        var hasTag = false;
        var nonSpace = false;
        var indentation = "";
        var tagIndex = 0;
        function stripSpace() {
          if (hasTag && !nonSpace) {
            while (spaces.length)
              delete tokens[spaces.pop()];
          } else {
            spaces = [];
          }
          hasTag = false;
          nonSpace = false;
        }
        var openingTagRe, closingTagRe, closingCurlyRe;
        function compileTags(tagsToCompile) {
          if (typeof tagsToCompile === "string")
            tagsToCompile = tagsToCompile.split(spaceRe, 2);
          if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
            throw new Error("Invalid tags: " + tagsToCompile);
          openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + "\\s*");
          closingTagRe = new RegExp("\\s*" + escapeRegExp(tagsToCompile[1]));
          closingCurlyRe = new RegExp("\\s*" + escapeRegExp("}" + tagsToCompile[1]));
        }
        compileTags(tags || mustache2.tags);
        var scanner = new Scanner(template);
        var start, type, value, chr, token, openSection;
        while (!scanner.eos()) {
          start = scanner.pos;
          value = scanner.scanUntil(openingTagRe);
          if (value) {
            for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
              chr = value.charAt(i);
              if (isWhitespace(chr)) {
                spaces.push(tokens.length);
                indentation += chr;
              } else {
                nonSpace = true;
                lineHasNonSpace = true;
                indentation += " ";
              }
              tokens.push(["text", chr, start, start + 1]);
              start += 1;
              if (chr === "\n") {
                stripSpace();
                indentation = "";
                tagIndex = 0;
                lineHasNonSpace = false;
              }
            }
          }
          if (!scanner.scan(openingTagRe))
            break;
          hasTag = true;
          type = scanner.scan(tagRe) || "name";
          scanner.scan(whiteRe);
          if (type === "=") {
            value = scanner.scanUntil(equalsRe);
            scanner.scan(equalsRe);
            scanner.scanUntil(closingTagRe);
          } else if (type === "{") {
            value = scanner.scanUntil(closingCurlyRe);
            scanner.scan(curlyRe);
            scanner.scanUntil(closingTagRe);
            type = "&";
          } else {
            value = scanner.scanUntil(closingTagRe);
          }
          if (!scanner.scan(closingTagRe))
            throw new Error("Unclosed tag at " + scanner.pos);
          if (type == ">") {
            token = [type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace];
          } else {
            token = [type, value, start, scanner.pos];
          }
          tagIndex++;
          tokens.push(token);
          if (type === "#" || type === "^") {
            sections.push(token);
          } else if (type === "/") {
            openSection = sections.pop();
            if (!openSection)
              throw new Error('Unopened section "' + value + '" at ' + start);
            if (openSection[1] !== value)
              throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
          } else if (type === "name" || type === "{" || type === "&") {
            nonSpace = true;
          } else if (type === "=") {
            compileTags(value);
          }
        }
        stripSpace();
        openSection = sections.pop();
        if (openSection)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
        return nestTokens(squashTokens(tokens));
      }
      function squashTokens(tokens) {
        var squashedTokens = [];
        var token, lastToken;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
          token = tokens[i];
          if (token) {
            if (token[0] === "text" && lastToken && lastToken[0] === "text") {
              lastToken[1] += token[1];
              lastToken[3] = token[3];
            } else {
              squashedTokens.push(token);
              lastToken = token;
            }
          }
        }
        return squashedTokens;
      }
      function nestTokens(tokens) {
        var nestedTokens = [];
        var collector = nestedTokens;
        var sections = [];
        var token, section;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
          token = tokens[i];
          switch (token[0]) {
            case "#":
            case "^":
              collector.push(token);
              sections.push(token);
              collector = token[4] = [];
              break;
            case "/":
              section = sections.pop();
              section[5] = token[2];
              collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
              break;
            default:
              collector.push(token);
          }
        }
        return nestedTokens;
      }
      function Scanner(string) {
        this.string = string;
        this.tail = string;
        this.pos = 0;
      }
      Scanner.prototype.eos = function eos() {
        return this.tail === "";
      };
      Scanner.prototype.scan = function scan(re) {
        var match = this.tail.match(re);
        if (!match || match.index !== 0)
          return "";
        var string = match[0];
        this.tail = this.tail.substring(string.length);
        this.pos += string.length;
        return string;
      };
      Scanner.prototype.scanUntil = function scanUntil(re) {
        var index = this.tail.search(re), match;
        switch (index) {
          case -1:
            match = this.tail;
            this.tail = "";
            break;
          case 0:
            match = "";
            break;
          default:
            match = this.tail.substring(0, index);
            this.tail = this.tail.substring(index);
        }
        this.pos += match.length;
        return match;
      };
      function Context(view, parentContext) {
        this.view = view;
        this.cache = { ".": this.view };
        this.parent = parentContext;
      }
      Context.prototype.push = function push(view) {
        return new Context(view, this);
      };
      Context.prototype.lookup = function lookup(name) {
        var cache = this.cache;
        var value;
        if (cache.hasOwnProperty(name)) {
          value = cache[name];
        } else {
          var context = this, intermediateValue, names, index, lookupHit = false;
          while (context) {
            if (name.indexOf(".") > 0) {
              intermediateValue = context.view;
              names = name.split(".");
              index = 0;
              while (intermediateValue != null && index < names.length) {
                if (index === names.length - 1)
                  lookupHit = hasProperty(intermediateValue, names[index]) || primitiveHasOwnProperty(intermediateValue, names[index]);
                intermediateValue = intermediateValue[names[index++]];
              }
            } else {
              intermediateValue = context.view[name];
              lookupHit = hasProperty(context.view, name);
            }
            if (lookupHit) {
              value = intermediateValue;
              break;
            }
            context = context.parent;
          }
          cache[name] = value;
        }
        if (isFunction(value))
          value = value.call(this.view);
        return value;
      };
      function Writer() {
        this.templateCache = {
          _cache: {},
          set: function set(key, value) {
            this._cache[key] = value;
          },
          get: function get(key) {
            return this._cache[key];
          },
          clear: function clear() {
            this._cache = {};
          }
        };
      }
      Writer.prototype.clearCache = function clearCache() {
        if (typeof this.templateCache !== "undefined") {
          this.templateCache.clear();
        }
      };
      Writer.prototype.parse = function parse(template, tags) {
        var cache = this.templateCache;
        var cacheKey = template + ":" + (tags || mustache2.tags).join(":");
        var isCacheEnabled = typeof cache !== "undefined";
        var tokens = isCacheEnabled ? cache.get(cacheKey) : void 0;
        if (tokens == void 0) {
          tokens = parseTemplate(template, tags);
          isCacheEnabled && cache.set(cacheKey, tokens);
        }
        return tokens;
      };
      Writer.prototype.render = function render(template, view, partials, config) {
        var tags = this.getConfigTags(config);
        var tokens = this.parse(template, tags);
        var context = view instanceof Context ? view : new Context(view, void 0);
        return this.renderTokens(tokens, context, partials, template, config);
      };
      Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, config) {
        var buffer = "";
        var token, symbol, value;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
          value = void 0;
          token = tokens[i];
          symbol = token[0];
          if (symbol === "#")
            value = this.renderSection(token, context, partials, originalTemplate, config);
          else if (symbol === "^")
            value = this.renderInverted(token, context, partials, originalTemplate, config);
          else if (symbol === ">")
            value = this.renderPartial(token, context, partials, config);
          else if (symbol === "&")
            value = this.unescapedValue(token, context);
          else if (symbol === "name")
            value = this.escapedValue(token, context, config);
          else if (symbol === "text")
            value = this.rawValue(token);
          if (value !== void 0)
            buffer += value;
        }
        return buffer;
      };
      Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate, config) {
        var self2 = this;
        var buffer = "";
        var value = context.lookup(token[1]);
        function subRender(template) {
          return self2.render(template, context, partials, config);
        }
        if (!value)
          return;
        if (isArray(value)) {
          for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
            buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
          }
        } else if (typeof value === "object" || typeof value === "string" || typeof value === "number") {
          buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
        } else if (isFunction(value)) {
          if (typeof originalTemplate !== "string")
            throw new Error("Cannot use higher-order sections without the original template");
          value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
          if (value != null)
            buffer += value;
        } else {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
        }
        return buffer;
      };
      Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate, config) {
        var value = context.lookup(token[1]);
        if (!value || isArray(value) && value.length === 0)
          return this.renderTokens(token[4], context, partials, originalTemplate, config);
      };
      Writer.prototype.indentPartial = function indentPartial(partial, indentation, lineHasNonSpace) {
        var filteredIndentation = indentation.replace(/[^ \t]/g, "");
        var partialByNl = partial.split("\n");
        for (var i = 0; i < partialByNl.length; i++) {
          if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
            partialByNl[i] = filteredIndentation + partialByNl[i];
          }
        }
        return partialByNl.join("\n");
      };
      Writer.prototype.renderPartial = function renderPartial(token, context, partials, config) {
        if (!partials)
          return;
        var tags = this.getConfigTags(config);
        var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null) {
          var lineHasNonSpace = token[6];
          var tagIndex = token[5];
          var indentation = token[4];
          var indentedValue = value;
          if (tagIndex == 0 && indentation) {
            indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
          }
          var tokens = this.parse(indentedValue, tags);
          return this.renderTokens(tokens, context, partials, indentedValue, config);
        }
      };
      Writer.prototype.unescapedValue = function unescapedValue(token, context) {
        var value = context.lookup(token[1]);
        if (value != null)
          return value;
      };
      Writer.prototype.escapedValue = function escapedValue(token, context, config) {
        var escape = this.getConfigEscape(config) || mustache2.escape;
        var value = context.lookup(token[1]);
        if (value != null)
          return typeof value === "number" && escape === mustache2.escape ? String(value) : escape(value);
      };
      Writer.prototype.rawValue = function rawValue(token) {
        return token[1];
      };
      Writer.prototype.getConfigTags = function getConfigTags(config) {
        if (isArray(config)) {
          return config;
        } else if (config && typeof config === "object") {
          return config.tags;
        } else {
          return void 0;
        }
      };
      Writer.prototype.getConfigEscape = function getConfigEscape(config) {
        if (config && typeof config === "object" && !isArray(config)) {
          return config.escape;
        } else {
          return void 0;
        }
      };
      var mustache2 = {
        name: "mustache.js",
        version: "4.2.0",
        tags: ["{{", "}}"],
        clearCache: void 0,
        escape: void 0,
        parse: void 0,
        render: void 0,
        Scanner: void 0,
        Context: void 0,
        Writer: void 0,
        set templateCache(cache) {
          defaultWriter.templateCache = cache;
        },
        get templateCache() {
          return defaultWriter.templateCache;
        }
      };
      var defaultWriter = new Writer();
      mustache2.clearCache = function clearCache() {
        return defaultWriter.clearCache();
      };
      mustache2.parse = function parse(template, tags) {
        return defaultWriter.parse(template, tags);
      };
      mustache2.render = function render(template, view, partials, config) {
        if (typeof template !== "string") {
          throw new TypeError('Invalid template! Template should be a "string" but "' + typeStr(template) + '" was given as the first argument for mustache#render(template, view, partials)');
        }
        return defaultWriter.render(template, view, partials, config);
      };
      mustache2.escape = escapeHtml;
      mustache2.Scanner = Scanner;
      mustache2.Context = Context;
      mustache2.Writer = Writer;
      return mustache2;
    });
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module2) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    var l = require_object_assign();
    var n = 60103;
    var p = 60106;
    exports.Fragment = 60107;
    exports.StrictMode = 60108;
    exports.Profiler = 60114;
    var q = 60109;
    var r = 60110;
    var t = 60112;
    exports.Suspense = 60113;
    var u = 60115;
    var v = 60116;
    if (typeof Symbol === "function" && Symbol.for) {
      w = Symbol.for;
      n = w("react.element");
      p = w("react.portal");
      exports.Fragment = w("react.fragment");
      exports.StrictMode = w("react.strict_mode");
      exports.Profiler = w("react.profiler");
      q = w("react.provider");
      r = w("react.context");
      t = w("react.forward_ref");
      exports.Suspense = w("react.suspense");
      u = w("react.memo");
      v = w("react.lazy");
    }
    var w;
    var x = typeof Symbol === "function" && Symbol.iterator;
    function y(a) {
      if (a === null || typeof a !== "object")
        return null;
      a = x && a[x] || a["@@iterator"];
      return typeof a === "function" ? a : null;
    }
    function z(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var A = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } };
    var B = {};
    function C(a, b, c) {
      this.props = a;
      this.context = b;
      this.refs = B;
      this.updater = c || A;
    }
    C.prototype.isReactComponent = {};
    C.prototype.setState = function(a, b) {
      if (typeof a !== "object" && typeof a !== "function" && a != null)
        throw Error(z(85));
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    C.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function D() {
    }
    D.prototype = C.prototype;
    function E(a, b, c) {
      this.props = a;
      this.context = b;
      this.refs = B;
      this.updater = c || A;
    }
    var F = E.prototype = new D();
    F.constructor = E;
    l(F, C.prototype);
    F.isPureReactComponent = true;
    var G = { current: null };
    var H = Object.prototype.hasOwnProperty;
    var I = { key: true, ref: true, __self: true, __source: true };
    function J(a, b, c) {
      var e, d = {}, k = null, h = null;
      if (b != null)
        for (e in b.ref !== void 0 && (h = b.ref), b.key !== void 0 && (k = "" + b.key), b)
          H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
      var g = arguments.length - 2;
      if (g === 1)
        d.children = c;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++)
          f[m] = arguments[m + 2];
        d.children = f;
      }
      if (a && a.defaultProps)
        for (e in g = a.defaultProps, g)
          d[e] === void 0 && (d[e] = g[e]);
      return { $$typeof: n, type: a, key: k, ref: h, props: d, _owner: G.current };
    }
    function K(a, b) {
      return { $$typeof: n, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function L(a) {
      return typeof a === "object" && a !== null && a.$$typeof === n;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var M = /\/+/g;
    function N(a, b) {
      return typeof a === "object" && a !== null && a.key != null ? escape("" + a.key) : b.toString(36);
    }
    function O(a, b, c, e, d) {
      var k = typeof a;
      if (k === "undefined" || k === "boolean")
        a = null;
      var h = false;
      if (a === null)
        h = true;
      else
        switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case n:
              case p:
                h = true;
            }
        }
      if (h)
        return h = a, d = d(h), a = e === "" ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", a != null && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function(a2) {
          return a2;
        })) : d != null && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
      h = 0;
      e = e === "" ? "." : e + ":";
      if (Array.isArray(a))
        for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = e + N(k, g);
          h += O(k, b, c, f, d);
        }
      else if (f = y(a), typeof f === "function")
        for (a = f.call(a), g = 0; !(k = a.next()).done; )
          k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);
      else if (k === "object")
        throw b = "" + a, Error(z(31, b === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
      return h;
    }
    function P(a, b, c) {
      if (a == null)
        return a;
      var e = [], d = 0;
      O(a, e, "", "", function(a2) {
        return b.call(c, a2, d++);
      });
      return e;
    }
    function Q(a) {
      if (a._status === -1) {
        var b = a._result;
        b = b();
        a._status = 0;
        a._result = b;
        b.then(function(b2) {
          a._status === 0 && (b2 = b2.default, a._status = 1, a._result = b2);
        }, function(b2) {
          a._status === 0 && (a._status = 2, a._result = b2);
        });
      }
      if (a._status === 1)
        return a._result;
      throw a._result;
    }
    var R = { current: null };
    function S() {
      var a = R.current;
      if (a === null)
        throw Error(z(321));
      return a;
    }
    var T = { ReactCurrentDispatcher: R, ReactCurrentBatchConfig: { transition: 0 }, ReactCurrentOwner: G, IsSomeRendererActing: { current: false }, assign: l };
    exports.Children = { map: P, forEach: function(a, b, c) {
      P(a, function() {
        b.apply(this, arguments);
      }, c);
    }, count: function(a) {
      var b = 0;
      P(a, function() {
        b++;
      });
      return b;
    }, toArray: function(a) {
      return P(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!L(a))
        throw Error(z(143));
      return a;
    } };
    exports.Component = C;
    exports.PureComponent = E;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
    exports.cloneElement = function(a, b, c) {
      if (a === null || a === void 0)
        throw Error(z(267, a));
      var e = l({}, a.props), d = a.key, k = a.ref, h = a._owner;
      if (b != null) {
        b.ref !== void 0 && (k = b.ref, h = G.current);
        b.key !== void 0 && (d = "" + b.key);
        if (a.type && a.type.defaultProps)
          var g = a.type.defaultProps;
        for (f in b)
          H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = b[f] === void 0 && g !== void 0 ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (f === 1)
        e.children = c;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++)
          g[m] = arguments[m + 2];
        e.children = g;
      }
      return {
        $$typeof: n,
        type: a.type,
        key: d,
        ref: k,
        props: e,
        _owner: h
      };
    };
    exports.createContext = function(a, b) {
      b === void 0 && (b = null);
      a = { $$typeof: r, _calculateChangedBits: b, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null };
      a.Provider = { $$typeof: q, _context: a };
      return a.Consumer = a;
    };
    exports.createElement = J;
    exports.createFactory = function(a) {
      var b = J.bind(null, a);
      b.type = a;
      return b;
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(a) {
      return { $$typeof: t, render: a };
    };
    exports.isValidElement = L;
    exports.lazy = function(a) {
      return { $$typeof: v, _payload: { _status: -1, _result: a }, _init: Q };
    };
    exports.memo = function(a, b) {
      return { $$typeof: u, type: a, compare: b === void 0 ? null : b };
    };
    exports.useCallback = function(a, b) {
      return S().useCallback(a, b);
    };
    exports.useContext = function(a, b) {
      return S().useContext(a, b);
    };
    exports.useDebugValue = function() {
    };
    exports.useEffect = function(a, b) {
      return S().useEffect(a, b);
    };
    exports.useImperativeHandle = function(a, b, c) {
      return S().useImperativeHandle(a, b, c);
    };
    exports.useLayoutEffect = function(a, b) {
      return S().useLayoutEffect(a, b);
    };
    exports.useMemo = function(a, b) {
      return S().useMemo(a, b);
    };
    exports.useReducer = function(a, b, c) {
      return S().useReducer(a, b, c);
    };
    exports.useRef = function(a) {
      return S().useRef(a);
    };
    exports.useState = function(a) {
      return S().useState(a);
    };
    exports.version = "17.0.2";
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var _assign = require_object_assign();
        var ReactVersion = "17.0.2";
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        exports.Fragment = 60107;
        exports.StrictMode = 60108;
        exports.Profiler = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        exports.Suspense = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          exports.Fragment = symbolFor("react.fragment");
          exports.StrictMode = symbolFor("react.strict_mode");
          exports.Profiler = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          exports.Suspense = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactCurrentDispatcher = {
          current: null
        };
        var ReactCurrentBatchConfig = {
          transition: 0
        };
        var ReactCurrentOwner = {
          current: null
        };
        var ReactDebugCurrentFrame = {};
        var currentExtraStackFrame = null;
        function setExtraStackFrame(stack) {
          {
            currentExtraStackFrame = stack;
          }
        }
        {
          ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
            {
              currentExtraStackFrame = stack;
            }
          };
          ReactDebugCurrentFrame.getCurrentStack = null;
          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = "";
            if (currentExtraStackFrame) {
              stack += currentExtraStackFrame;
            }
            var impl = ReactDebugCurrentFrame.getCurrentStack;
            if (impl) {
              stack += impl() || "";
            }
            return stack;
          };
        }
        var IsSomeRendererActing = {
          current: false
        };
        var ReactSharedInternals = {
          ReactCurrentDispatcher,
          ReactCurrentBatchConfig,
          ReactCurrentOwner,
          IsSomeRendererActing,
          assign: _assign
        };
        {
          ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
        }
        function warn(format) {
          {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            printWarning("warn", format, args);
          }
        }
        function error(format) {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return "" + item;
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
              return;
            }
            error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
            didWarnStateUpdateForUnmountedComponent[warningKey] = true;
          }
        }
        var ReactNoopUpdateQueue = {
          isMounted: function(publicInstance) {
            return false;
          },
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, "setState");
          }
        };
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if (!(typeof partialState === "object" || typeof partialState === "function" || partialState == null)) {
            {
              throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
          }
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        {
          var deprecatedAPIs = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          };
          var defineDeprecationWarning = function(methodName, info) {
            Object.defineProperty(Component.prototype, methodName, {
              get: function() {
                warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                return void 0;
              }
            });
          };
          for (var fnName in deprecatedAPIs) {
            if (deprecatedAPIs.hasOwnProperty(fnName)) {
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
            }
          }
        }
        function ComponentDummy() {
        }
        ComponentDummy.prototype = Component.prototype;
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
        pureComponentPrototype.constructor = PureComponent;
        _assign(pureComponentPrototype, Component.prototype);
        pureComponentPrototype.isPureReactComponent = true;
        function createRef() {
          var refObject = {
            current: null
          };
          {
            Object.seal(refObject);
          }
          return refObject;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var functionName = innerType.displayName || innerType.name || "";
          return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentName(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case exports.Fragment:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case exports.Profiler:
              return "Profiler";
            case exports.StrictMode:
              return "StrictMode";
            case exports.Suspense:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                return getComponentName(type.type);
              case REACT_BLOCK_TYPE:
                return getComponentName(type._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentName(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          var warnAboutAccessingKey = function() {
            {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function defineRefPropWarningGetter(props, displayName) {
          var warnAboutAccessingRef = function() {
            {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
        function warnIfStringRefCannotBeAutoConverted(config) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
              var componentName = getComponentName(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        var ReactElement = function(type, key, ref, self2, source, owner, props) {
          var element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            ref,
            props,
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self2
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function createElement(type, config, children) {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          var self2 = null;
          var source = null;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              {
                warnIfStringRefCannotBeAutoConverted(config);
              }
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }
            self2 = config.__self === void 0 ? null : config.__self;
            source = config.__source === void 0 ? null : config.__source;
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            {
              if (Object.freeze) {
                Object.freeze(childArray);
              }
            }
            props.children = childArray;
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          {
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
          return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
          return newElement;
        }
        function cloneElement(element, config, children) {
          if (!!(element === null || element === void 0)) {
            {
              throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
          }
          var propName;
          var props = _assign({}, element.props);
          var key = element.key;
          var ref = element.ref;
          var self2 = element._self;
          var source = element._source;
          var owner = element._owner;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }
            var defaultProps;
            if (element.type && element.type.defaultProps) {
              defaultProps = element.type.defaultProps;
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === void 0 && defaultProps !== void 0) {
                  props[propName] = defaultProps[propName];
                } else {
                  props[propName] = config[propName];
                }
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
          }
          return ReactElement(element.type, key, ref, self2, source, owner, props);
        }
        function isValidElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var SEPARATOR = ".";
        var SUBSEPARATOR = ":";
        function escape(key) {
          var escapeRegex = /[=:]/g;
          var escaperLookup = {
            "=": "=0",
            ":": "=2"
          };
          var escapedString = key.replace(escapeRegex, function(match) {
            return escaperLookup[match];
          });
          return "$" + escapedString;
        }
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
          return text.replace(userProvidedKeyEscapeRegex, "$&/");
        }
        function getElementKey(element, index) {
          if (typeof element === "object" && element !== null && element.key != null) {
            return escape("" + element.key);
          }
          return index.toString(36);
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if (type === "undefined" || type === "boolean") {
            children = null;
          }
          var invokeCallback = false;
          if (children === null) {
            invokeCallback = true;
          } else {
            switch (type) {
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                }
            }
          }
          if (invokeCallback) {
            var _child = children;
            var mappedChild = callback(_child);
            var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
            if (Array.isArray(mappedChild)) {
              var escapedChildKey = "";
              if (childKey != null) {
                escapedChildKey = escapeUserProvidedKey(childKey) + "/";
              }
              mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                return c;
              });
            } else if (mappedChild != null) {
              if (isValidElement(mappedChild)) {
                mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
              }
              array.push(mappedChild);
            }
            return 1;
          }
          var child;
          var nextName;
          var subtreeCount = 0;
          var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              nextName = nextNamePrefix + getElementKey(child, i);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else {
            var iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === "function") {
              var iterableChildren = children;
              {
                if (iteratorFn === iterableChildren.entries) {
                  if (!didWarnAboutMaps) {
                    warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
              var iterator = iteratorFn.call(iterableChildren);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getElementKey(child, ii++);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else if (type === "object") {
              var childrenString = "" + children;
              {
                {
                  throw Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
                }
              }
            }
          }
          return subtreeCount;
        }
        function mapChildren(children, func, context) {
          if (children == null) {
            return children;
          }
          var result = [];
          var count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function countChildren(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        }
        function forEachChildren(children, forEachFunc, forEachContext) {
          mapChildren(children, function() {
            forEachFunc.apply(this, arguments);
          }, forEachContext);
        }
        function toArray(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        }
        function onlyChild(children) {
          if (!isValidElement(children)) {
            {
              throw Error("React.Children.only expected to receive a single React element child.");
            }
          }
          return children;
        }
        function createContext(defaultValue, calculateChangedBits) {
          if (calculateChangedBits === void 0) {
            calculateChangedBits = null;
          } else {
            {
              if (calculateChangedBits !== null && typeof calculateChangedBits !== "function") {
                error("createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
              }
            }
          }
          var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            _calculateChangedBits: calculateChangedBits,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          var hasWarnedAboutUsingNestedContextConsumers = false;
          var hasWarnedAboutUsingConsumerProvider = false;
          var hasWarnedAboutDisplayNameOnConsumer = false;
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context,
              _calculateChangedBits: context._calculateChangedBits
            };
            Object.defineProperties(Consumer, {
              Provider: {
                get: function() {
                  if (!hasWarnedAboutUsingConsumerProvider) {
                    hasWarnedAboutUsingConsumerProvider = true;
                    error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                  }
                  return context.Provider;
                },
                set: function(_Provider) {
                  context.Provider = _Provider;
                }
              },
              _currentValue: {
                get: function() {
                  return context._currentValue;
                },
                set: function(_currentValue) {
                  context._currentValue = _currentValue;
                }
              },
              _currentValue2: {
                get: function() {
                  return context._currentValue2;
                },
                set: function(_currentValue2) {
                  context._currentValue2 = _currentValue2;
                }
              },
              _threadCount: {
                get: function() {
                  return context._threadCount;
                },
                set: function(_threadCount) {
                  context._threadCount = _threadCount;
                }
              },
              Consumer: {
                get: function() {
                  if (!hasWarnedAboutUsingNestedContextConsumers) {
                    hasWarnedAboutUsingNestedContextConsumers = true;
                    error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                  return context.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return context.displayName;
                },
                set: function(displayName) {
                  if (!hasWarnedAboutDisplayNameOnConsumer) {
                    warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                    hasWarnedAboutDisplayNameOnConsumer = true;
                  }
                }
              }
            });
            context.Consumer = Consumer;
          }
          {
            context._currentRenderer = null;
            context._currentRenderer2 = null;
          }
          return context;
        }
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function lazyInitializer(payload) {
          if (payload._status === Uninitialized) {
            var ctor = payload._result;
            var thenable = ctor();
            var pending = payload;
            pending._status = Pending;
            pending._result = thenable;
            thenable.then(function(moduleObject) {
              if (payload._status === Pending) {
                var defaultExport = moduleObject.default;
                {
                  if (defaultExport === void 0) {
                    error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                  }
                }
                var resolved = payload;
                resolved._status = Resolved;
                resolved._result = defaultExport;
              }
            }, function(error2) {
              if (payload._status === Pending) {
                var rejected = payload;
                rejected._status = Rejected;
                rejected._result = error2;
              }
            });
          }
          if (payload._status === Resolved) {
            return payload._result;
          } else {
            throw payload._result;
          }
        }
        function lazy(ctor) {
          var payload = {
            _status: -1,
            _result: ctor
          };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: payload,
            _init: lazyInitializer
          };
          {
            var defaultProps;
            var propTypes;
            Object.defineProperties(lazyType, {
              defaultProps: {
                configurable: true,
                get: function() {
                  return defaultProps;
                },
                set: function(newDefaultProps) {
                  error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  defaultProps = newDefaultProps;
                  Object.defineProperty(lazyType, "defaultProps", {
                    enumerable: true
                  });
                }
              },
              propTypes: {
                configurable: true,
                get: function() {
                  return propTypes;
                },
                set: function(newPropTypes) {
                  error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  propTypes = newPropTypes;
                  Object.defineProperty(lazyType, "propTypes", {
                    enumerable: true
                  });
                }
              }
            });
          }
          return lazyType;
        }
        function forwardRef(render) {
          {
            if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
              error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
            } else if (typeof render !== "function") {
              error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
            } else {
              if (render.length !== 0 && render.length !== 2) {
                error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              }
            }
            if (render != null) {
              if (render.defaultProps != null || render.propTypes != null) {
                error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
              }
            }
          }
          var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (render.displayName == null) {
                  render.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        var enableScopeAPI = false;
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function memo(type, compare) {
          {
            if (!isValidElementType(type)) {
              error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
            }
          }
          var elementType = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: compare === void 0 ? null : compare
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (type.displayName == null) {
                  type.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        function resolveDispatcher() {
          var dispatcher = ReactCurrentDispatcher.current;
          if (!(dispatcher !== null)) {
            {
              throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          return dispatcher;
        }
        function useContext(Context, unstable_observedBits) {
          var dispatcher = resolveDispatcher();
          {
            if (unstable_observedBits !== void 0) {
              error("useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s", unstable_observedBits, typeof unstable_observedBits === "number" && Array.isArray(arguments[2]) ? "\n\nDid you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://reactjs.org/link/rules-of-hooks" : "");
            }
            if (Context._context !== void 0) {
              var realContext = Context._context;
              if (realContext.Consumer === Context) {
                error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
              } else if (realContext.Provider === Context) {
                error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
              }
            }
          }
          return dispatcher.useContext(Context, unstable_observedBits);
        }
        function useState(initialState) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useState(initialState);
        }
        function useReducer(reducer, initialArg, init) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useReducer(reducer, initialArg, init);
        }
        function useRef(initialValue) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useRef(initialValue);
        }
        function useEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create, deps);
        }
        function useLayoutEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create, deps);
        }
        function useCallback(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create, deps);
        }
        function useImperativeHandle(ref, create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create, deps);
        }
        function useDebugValue(value, formatterFn) {
          {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDebugValue(value, formatterFn);
          }
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: _assign({}, props, {
                  value: prevLog
                }),
                info: _assign({}, props, {
                  value: prevInfo
                }),
                warn: _assign({}, props, {
                  value: prevWarn
                }),
                error: _assign({}, props, {
                  value: prevError
                }),
                group: _assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: _assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: _assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher$1.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component2) {
          var prototype = Component2.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case exports.Suspense:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_BLOCK_TYPE:
                return describeFunctionComponentFrame(type._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(Object.prototype.hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              setExtraStackFrame(stack);
            } else {
              setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentName(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
        function getSourceInfoErrorAddendum(source) {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
        function getSourceInfoErrorAddendumForProps(elementProps) {
          if (elementProps !== null && elementProps !== void 0) {
            return getSourceInfoErrorAddendum(elementProps.__source);
          }
          return "";
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
        function validateExplicitKey(element, parentType) {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
          }
          {
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          if (typeof node !== "object") {
            return;
          }
          if (Array.isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentName(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentName(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function createElementWithValidation(type, props, children) {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendumForProps(props);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (Array.isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentName(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            {
              error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
          }
          var element = createElement.apply(this, arguments);
          if (element == null) {
            return element;
          }
          if (validType) {
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }
          if (type === exports.Fragment) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
        var didWarnAboutDeprecatedCreateFactory = false;
        function createFactoryWithValidation(type) {
          var validatedFactory = createElementWithValidation.bind(null, type);
          validatedFactory.type = type;
          {
            if (!didWarnAboutDeprecatedCreateFactory) {
              didWarnAboutDeprecatedCreateFactory = true;
              warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
            }
            Object.defineProperty(validatedFactory, "type", {
              enumerable: false,
              get: function() {
                warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                Object.defineProperty(this, "type", {
                  value: type
                });
                return type;
              }
            });
          }
          return validatedFactory;
        }
        function cloneElementWithValidation(element, props, children) {
          var newElement = cloneElement.apply(this, arguments);
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], newElement.type);
          }
          validatePropTypes(newElement);
          return newElement;
        }
        {
          try {
            var frozenObject = Object.freeze({});
            /* @__PURE__ */ new Map([[frozenObject, null]]);
            /* @__PURE__ */ new Set([frozenObject]);
          } catch (e) {
          }
        }
        var createElement$1 = createElementWithValidation;
        var cloneElement$1 = cloneElementWithValidation;
        var createFactory = createFactoryWithValidation;
        var Children = {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray,
          only: onlyChild
        };
        exports.Children = Children;
        exports.Component = Component;
        exports.PureComponent = PureComponent;
        exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
        exports.cloneElement = cloneElement$1;
        exports.createContext = createContext;
        exports.createElement = createElement$1;
        exports.createFactory = createFactory;
        exports.createRef = createRef;
        exports.forwardRef = forwardRef;
        exports.isValidElement = isValidElement;
        exports.lazy = lazy;
        exports.memo = memo;
        exports.useCallback = useCallback;
        exports.useContext = useContext;
        exports.useDebugValue = useDebugValue;
        exports.useEffect = useEffect;
        exports.useImperativeHandle = useImperativeHandle;
        exports.useLayoutEffect = useLayoutEffect;
        exports.useMemo = useMemo;
        exports.useReducer = useReducer;
        exports.useRef = useRef;
        exports.useState = useState;
        exports.version = ReactVersion;
      })();
    }
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_production_min();
    } else {
      module2.exports = require_react_development();
    }
  }
});

// node_modules/react-dom/cjs/react-dom-server.node.production.min.js
var require_react_dom_server_node_production_min = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server.node.production.min.js"(exports) {
    "use strict";
    var l = require_object_assign();
    var n = require_react();
    var aa = require("stream");
    function p(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var q = 60106;
    var r = 60107;
    var u = 60108;
    var z = 60114;
    var B = 60109;
    var ba = 60110;
    var ca = 60112;
    var D = 60113;
    var da = 60120;
    var ea = 60115;
    var fa = 60116;
    var ha = 60121;
    var ia = 60117;
    var ja = 60119;
    var ka = 60129;
    var la = 60131;
    if (typeof Symbol === "function" && Symbol.for) {
      E = Symbol.for;
      q = E("react.portal");
      r = E("react.fragment");
      u = E("react.strict_mode");
      z = E("react.profiler");
      B = E("react.provider");
      ba = E("react.context");
      ca = E("react.forward_ref");
      D = E("react.suspense");
      da = E("react.suspense_list");
      ea = E("react.memo");
      fa = E("react.lazy");
      ha = E("react.block");
      ia = E("react.fundamental");
      ja = E("react.scope");
      ka = E("react.debug_trace_mode");
      la = E("react.legacy_hidden");
    }
    var E;
    function F(a) {
      if (a == null)
        return null;
      if (typeof a === "function")
        return a.displayName || a.name || null;
      if (typeof a === "string")
        return a;
      switch (a) {
        case r:
          return "Fragment";
        case q:
          return "Portal";
        case z:
          return "Profiler";
        case u:
          return "StrictMode";
        case D:
          return "Suspense";
        case da:
          return "SuspenseList";
      }
      if (typeof a === "object")
        switch (a.$$typeof) {
          case ba:
            return (a.displayName || "Context") + ".Consumer";
          case B:
            return (a._context.displayName || "Context") + ".Provider";
          case ca:
            var b = a.render;
            b = b.displayName || b.name || "";
            return a.displayName || (b !== "" ? "ForwardRef(" + b + ")" : "ForwardRef");
          case ea:
            return F(a.type);
          case ha:
            return F(a._render);
          case fa:
            b = a._payload;
            a = a._init;
            try {
              return F(a(b));
            } catch (c) {
            }
        }
      return null;
    }
    var ma = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    var na = {};
    function I(a, b) {
      for (var c = a._threadCount | 0; c <= b; c++)
        a[c] = a._currentValue2, a._threadCount = c + 1;
    }
    function oa(a, b, c, d) {
      if (d && (d = a.contextType, typeof d === "object" && d !== null))
        return I(d, c), d[c];
      if (a = a.contextTypes) {
        c = {};
        for (var f in a)
          c[f] = b[f];
        b = c;
      } else
        b = na;
      return b;
    }
    for (J = new Uint16Array(16), K = 0; 15 > K; K++)
      J[K] = K + 1;
    var J;
    var K;
    J[15] = 0;
    var pa = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
    var qa = Object.prototype.hasOwnProperty;
    var ra = {};
    var sa = {};
    function ta(a) {
      if (qa.call(sa, a))
        return true;
      if (qa.call(ra, a))
        return false;
      if (pa.test(a))
        return sa[a] = true;
      ra[a] = true;
      return false;
    }
    function ua(a, b, c, d) {
      if (c !== null && c.type === 0)
        return false;
      switch (typeof b) {
        case "function":
        case "symbol":
          return true;
        case "boolean":
          if (d)
            return false;
          if (c !== null)
            return !c.acceptsBooleans;
          a = a.toLowerCase().slice(0, 5);
          return a !== "data-" && a !== "aria-";
        default:
          return false;
      }
    }
    function va(a, b, c, d) {
      if (b === null || typeof b === "undefined" || ua(a, b, c, d))
        return true;
      if (d)
        return false;
      if (c !== null)
        switch (c.type) {
          case 3:
            return !b;
          case 4:
            return b === false;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
      return false;
    }
    function M(a, b, c, d, f, h, t) {
      this.acceptsBooleans = b === 2 || b === 3 || b === 4;
      this.attributeName = d;
      this.attributeNamespace = f;
      this.mustUseProperty = c;
      this.propertyName = a;
      this.type = b;
      this.sanitizeURL = h;
      this.removeEmptyString = t;
    }
    var N = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      N[a] = new M(a, 0, false, a, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      N[b] = new M(b, 1, false, a[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      N[a] = new M(a, 2, false, a.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      N[a] = new M(a, 2, false, a, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      N[a] = new M(a, 3, false, a.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      N[a] = new M(a, 3, true, a, null, false, false);
    });
    ["capture", "download"].forEach(function(a) {
      N[a] = new M(a, 4, false, a, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      N[a] = new M(a, 6, false, a, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a) {
      N[a] = new M(a, 5, false, a.toLowerCase(), null, false, false);
    });
    var wa = /[\-:]([a-z])/g;
    function xa(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(wa, xa);
      N[b] = new M(b, 1, false, a, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(wa, xa);
      N[b] = new M(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(wa, xa);
      N[b] = new M(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      N[a] = new M(a, 1, false, a.toLowerCase(), null, false, false);
    });
    N.xlinkHref = new M("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      N[a] = new M(a, 1, false, a.toLowerCase(), null, true, true);
    });
    var ya = /["'&<>]/;
    function O(a) {
      if (typeof a === "boolean" || typeof a === "number")
        return "" + a;
      a = "" + a;
      var b = ya.exec(a);
      if (b) {
        var c = "", d, f = 0;
        for (d = b.index; d < a.length; d++) {
          switch (a.charCodeAt(d)) {
            case 34:
              b = "&quot;";
              break;
            case 38:
              b = "&amp;";
              break;
            case 39:
              b = "&#x27;";
              break;
            case 60:
              b = "&lt;";
              break;
            case 62:
              b = "&gt;";
              break;
            default:
              continue;
          }
          f !== d && (c += a.substring(f, d));
          f = d + 1;
          c += b;
        }
        a = f !== d ? c + a.substring(f, d) : c;
      }
      return a;
    }
    function za(a, b) {
      var c = N.hasOwnProperty(a) ? N[a] : null;
      var d;
      if (d = a !== "style")
        d = c !== null ? c.type === 0 : !(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N" ? false : true;
      if (d || va(a, b, c, false))
        return "";
      if (c !== null) {
        a = c.attributeName;
        d = c.type;
        if (d === 3 || d === 4 && b === true)
          return a + '=""';
        c.sanitizeURL && (b = "" + b);
        return a + '="' + (O(b) + '"');
      }
      return ta(a) ? a + '="' + (O(b) + '"') : "";
    }
    function Aa(a, b) {
      return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var Ba = typeof Object.is === "function" ? Object.is : Aa;
    var P = null;
    var Q = null;
    var R = null;
    var S = false;
    var T = false;
    var U = null;
    var V = 0;
    function W() {
      if (P === null)
        throw Error(p(321));
      return P;
    }
    function Ca() {
      if (0 < V)
        throw Error(p(312));
      return { memoizedState: null, queue: null, next: null };
    }
    function Da() {
      R === null ? Q === null ? (S = false, Q = R = Ca()) : (S = true, R = Q) : R.next === null ? (S = false, R = R.next = Ca()) : (S = true, R = R.next);
      return R;
    }
    function Ea(a, b, c, d) {
      for (; T; )
        T = false, V += 1, R = null, c = a(b, d);
      Fa();
      return c;
    }
    function Fa() {
      P = null;
      T = false;
      Q = null;
      V = 0;
      R = U = null;
    }
    function Ga(a, b) {
      return typeof b === "function" ? b(a) : b;
    }
    function Ha(a, b, c) {
      P = W();
      R = Da();
      if (S) {
        var d = R.queue;
        b = d.dispatch;
        if (U !== null && (c = U.get(d), c !== void 0)) {
          U.delete(d);
          d = R.memoizedState;
          do
            d = a(d, c.action), c = c.next;
          while (c !== null);
          R.memoizedState = d;
          return [d, b];
        }
        return [R.memoizedState, b];
      }
      a = a === Ga ? typeof b === "function" ? b() : b : c !== void 0 ? c(b) : b;
      R.memoizedState = a;
      a = R.queue = { last: null, dispatch: null };
      a = a.dispatch = Ia.bind(null, P, a);
      return [R.memoizedState, a];
    }
    function Ja(a, b) {
      P = W();
      R = Da();
      b = b === void 0 ? null : b;
      if (R !== null) {
        var c = R.memoizedState;
        if (c !== null && b !== null) {
          var d = c[1];
          a:
            if (d === null)
              d = false;
            else {
              for (var f = 0; f < d.length && f < b.length; f++)
                if (!Ba(b[f], d[f])) {
                  d = false;
                  break a;
                }
              d = true;
            }
          if (d)
            return c[0];
        }
      }
      a = a();
      R.memoizedState = [a, b];
      return a;
    }
    function Ia(a, b, c) {
      if (!(25 > V))
        throw Error(p(301));
      if (a === P)
        if (T = true, a = { action: c, next: null }, U === null && (U = /* @__PURE__ */ new Map()), c = U.get(b), c === void 0)
          U.set(b, a);
        else {
          for (b = c; b.next !== null; )
            b = b.next;
          b.next = a;
        }
    }
    function Ka() {
    }
    var X = null;
    var La = { readContext: function(a) {
      var b = X.threadID;
      I(a, b);
      return a[b];
    }, useContext: function(a) {
      W();
      var b = X.threadID;
      I(a, b);
      return a[b];
    }, useMemo: Ja, useReducer: Ha, useRef: function(a) {
      P = W();
      R = Da();
      var b = R.memoizedState;
      return b === null ? (a = { current: a }, R.memoizedState = a) : b;
    }, useState: function(a) {
      return Ha(Ga, a);
    }, useLayoutEffect: function() {
    }, useCallback: function(a, b) {
      return Ja(function() {
        return a;
      }, b);
    }, useImperativeHandle: Ka, useEffect: Ka, useDebugValue: Ka, useDeferredValue: function(a) {
      W();
      return a;
    }, useTransition: function() {
      W();
      return [function(a) {
        a();
      }, false];
    }, useOpaqueIdentifier: function() {
      return (X.identifierPrefix || "") + "R:" + (X.uniqueID++).toString(36);
    }, useMutableSource: function(a, b) {
      W();
      return b(a._source);
    } };
    var Ma = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };
    function Na(a) {
      switch (a) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    var Oa = { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true };
    var Pa = l({ menuitem: true }, Oa);
    var Y = {
      animationIterationCount: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    var Qa = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Y).forEach(function(a) {
      Qa.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1);
        Y[b] = Y[a];
      });
    });
    var Ra = /([A-Z])/g;
    var Sa = /^ms-/;
    var Z = n.Children.toArray;
    var Ta = ma.ReactCurrentDispatcher;
    var Ua = { listing: true, pre: true, textarea: true };
    var Va = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var Wa = {};
    var Xa = {};
    function Ya(a) {
      if (a === void 0 || a === null)
        return a;
      var b = "";
      n.Children.forEach(a, function(a2) {
        a2 != null && (b += a2);
      });
      return b;
    }
    var Za = Object.prototype.hasOwnProperty;
    var $a = { children: null, dangerouslySetInnerHTML: null, suppressContentEditableWarning: null, suppressHydrationWarning: null };
    function ab(a, b) {
      if (a === void 0)
        throw Error(p(152, F(b) || "Component"));
    }
    function bb(a, b, c) {
      function d(d2, h2) {
        var e = h2.prototype && h2.prototype.isReactComponent, f2 = oa(h2, b, c, e), t = [], g = false, m = { isMounted: function() {
          return false;
        }, enqueueForceUpdate: function() {
          if (t === null)
            return null;
        }, enqueueReplaceState: function(a2, b2) {
          g = true;
          t = [b2];
        }, enqueueSetState: function(a2, b2) {
          if (t === null)
            return null;
          t.push(b2);
        } };
        if (e) {
          if (e = new h2(d2.props, f2, m), typeof h2.getDerivedStateFromProps === "function") {
            var k = h2.getDerivedStateFromProps.call(null, d2.props, e.state);
            k != null && (e.state = l({}, e.state, k));
          }
        } else if (P = {}, e = h2(d2.props, f2, m), e = Ea(h2, d2.props, e, f2), e == null || e.render == null) {
          a = e;
          ab(a, h2);
          return;
        }
        e.props = d2.props;
        e.context = f2;
        e.updater = m;
        m = e.state;
        m === void 0 && (e.state = m = null);
        if (typeof e.UNSAFE_componentWillMount === "function" || typeof e.componentWillMount === "function")
          if (typeof e.componentWillMount === "function" && typeof h2.getDerivedStateFromProps !== "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount === "function" && typeof h2.getDerivedStateFromProps !== "function" && e.UNSAFE_componentWillMount(), t.length) {
            m = t;
            var v = g;
            t = null;
            g = false;
            if (v && m.length === 1)
              e.state = m[0];
            else {
              k = v ? m[0] : e.state;
              var H = true;
              for (v = v ? 1 : 0; v < m.length; v++) {
                var x = m[v];
                x = typeof x === "function" ? x.call(e, k, d2.props, f2) : x;
                x != null && (H ? (H = false, k = l({}, k, x)) : l(k, x));
              }
              e.state = k;
            }
          } else
            t = null;
        a = e.render();
        ab(a, h2);
        if (typeof e.getChildContext === "function" && (d2 = h2.childContextTypes, typeof d2 === "object")) {
          var y = e.getChildContext();
          for (var A in y)
            if (!(A in d2))
              throw Error(p(108, F(h2) || "Unknown", A));
        }
        y && (b = l({}, b, y));
      }
      for (; n.isValidElement(a); ) {
        var f = a, h = f.type;
        if (typeof h !== "function")
          break;
        d(f, h);
      }
      return { child: a, context: b };
    }
    var cb = function() {
      function a(a2, b2, f) {
        n.isValidElement(a2) ? a2.type !== r ? a2 = [a2] : (a2 = a2.props.children, a2 = n.isValidElement(a2) ? [a2] : Z(a2)) : a2 = Z(a2);
        a2 = { type: null, domNamespace: Ma.html, children: a2, childIndex: 0, context: na, footer: "" };
        var c = J[0];
        if (c === 0) {
          var d = J;
          c = d.length;
          var g = 2 * c;
          if (!(65536 >= g))
            throw Error(p(304));
          var e = new Uint16Array(g);
          e.set(d);
          J = e;
          J[0] = c + 1;
          for (d = c; d < g - 1; d++)
            J[d] = d + 1;
          J[g - 1] = 0;
        } else
          J[0] = J[c];
        this.threadID = c;
        this.stack = [a2];
        this.exhausted = false;
        this.currentSelectValue = null;
        this.previousWasTextNode = false;
        this.makeStaticMarkup = b2;
        this.suspenseDepth = 0;
        this.contextIndex = -1;
        this.contextStack = [];
        this.contextValueStack = [];
        this.uniqueID = 0;
        this.identifierPrefix = f && f.identifierPrefix || "";
      }
      var b = a.prototype;
      b.destroy = function() {
        if (!this.exhausted) {
          this.exhausted = true;
          this.clearProviders();
          var a2 = this.threadID;
          J[a2] = J[0];
          J[0] = a2;
        }
      };
      b.pushProvider = function(a2) {
        var b2 = ++this.contextIndex, c = a2.type._context, h = this.threadID;
        I(c, h);
        var t = c[h];
        this.contextStack[b2] = c;
        this.contextValueStack[b2] = t;
        c[h] = a2.props.value;
      };
      b.popProvider = function() {
        var a2 = this.contextIndex, b2 = this.contextStack[a2], f = this.contextValueStack[a2];
        this.contextStack[a2] = null;
        this.contextValueStack[a2] = null;
        this.contextIndex--;
        b2[this.threadID] = f;
      };
      b.clearProviders = function() {
        for (var a2 = this.contextIndex; 0 <= a2; a2--)
          this.contextStack[a2][this.threadID] = this.contextValueStack[a2];
      };
      b.read = function(a2) {
        if (this.exhausted)
          return null;
        var b2 = X;
        X = this;
        var c = Ta.current;
        Ta.current = La;
        try {
          for (var h = [""], t = false; h[0].length < a2; ) {
            if (this.stack.length === 0) {
              this.exhausted = true;
              var g = this.threadID;
              J[g] = J[0];
              J[0] = g;
              break;
            }
            var e = this.stack[this.stack.length - 1];
            if (t || e.childIndex >= e.children.length) {
              var L = e.footer;
              L !== "" && (this.previousWasTextNode = false);
              this.stack.pop();
              if (e.type === "select")
                this.currentSelectValue = null;
              else if (e.type != null && e.type.type != null && e.type.type.$$typeof === B)
                this.popProvider(e.type);
              else if (e.type === D) {
                this.suspenseDepth--;
                var G = h.pop();
                if (t) {
                  t = false;
                  var C = e.fallbackFrame;
                  if (!C)
                    throw Error(p(303));
                  this.stack.push(C);
                  h[this.suspenseDepth] += "<!--$!-->";
                  continue;
                } else
                  h[this.suspenseDepth] += G;
              }
              h[this.suspenseDepth] += L;
            } else {
              var m = e.children[e.childIndex++], k = "";
              try {
                k += this.render(m, e.context, e.domNamespace);
              } catch (v) {
                if (v != null && typeof v.then === "function")
                  throw Error(p(294));
                throw v;
              } finally {
              }
              h.length <= this.suspenseDepth && h.push("");
              h[this.suspenseDepth] += k;
            }
          }
          return h[0];
        } finally {
          Ta.current = c, X = b2, Fa();
        }
      };
      b.render = function(a2, b2, f) {
        if (typeof a2 === "string" || typeof a2 === "number") {
          f = "" + a2;
          if (f === "")
            return "";
          if (this.makeStaticMarkup)
            return O(f);
          if (this.previousWasTextNode)
            return "<!-- -->" + O(f);
          this.previousWasTextNode = true;
          return O(f);
        }
        b2 = bb(a2, b2, this.threadID);
        a2 = b2.child;
        b2 = b2.context;
        if (a2 === null || a2 === false)
          return "";
        if (!n.isValidElement(a2)) {
          if (a2 != null && a2.$$typeof != null) {
            f = a2.$$typeof;
            if (f === q)
              throw Error(p(257));
            throw Error(p(258, f.toString()));
          }
          a2 = Z(a2);
          this.stack.push({ type: null, domNamespace: f, children: a2, childIndex: 0, context: b2, footer: "" });
          return "";
        }
        var c = a2.type;
        if (typeof c === "string")
          return this.renderDOM(a2, b2, f);
        switch (c) {
          case la:
          case ka:
          case u:
          case z:
          case da:
          case r:
            return a2 = Z(a2.props.children), this.stack.push({
              type: null,
              domNamespace: f,
              children: a2,
              childIndex: 0,
              context: b2,
              footer: ""
            }), "";
          case D:
            throw Error(p(294));
          case ja:
            throw Error(p(343));
        }
        if (typeof c === "object" && c !== null)
          switch (c.$$typeof) {
            case ca:
              P = {};
              var d = c.render(a2.props, a2.ref);
              d = Ea(c.render, a2.props, d, a2.ref);
              d = Z(d);
              this.stack.push({ type: null, domNamespace: f, children: d, childIndex: 0, context: b2, footer: "" });
              return "";
            case ea:
              return a2 = [n.createElement(c.type, l({ ref: a2.ref }, a2.props))], this.stack.push({ type: null, domNamespace: f, children: a2, childIndex: 0, context: b2, footer: "" }), "";
            case B:
              return c = Z(a2.props.children), f = { type: a2, domNamespace: f, children: c, childIndex: 0, context: b2, footer: "" }, this.pushProvider(a2), this.stack.push(f), "";
            case ba:
              c = a2.type;
              d = a2.props;
              var g = this.threadID;
              I(c, g);
              c = Z(d.children(c[g]));
              this.stack.push({ type: a2, domNamespace: f, children: c, childIndex: 0, context: b2, footer: "" });
              return "";
            case ia:
              throw Error(p(338));
            case fa:
              return c = a2.type, d = c._init, c = d(c._payload), a2 = [n.createElement(c, l({ ref: a2.ref }, a2.props))], this.stack.push({
                type: null,
                domNamespace: f,
                children: a2,
                childIndex: 0,
                context: b2,
                footer: ""
              }), "";
          }
        throw Error(p(130, c == null ? c : typeof c, ""));
      };
      b.renderDOM = function(a2, b2, f) {
        var c = a2.type.toLowerCase();
        f === Ma.html && Na(c);
        if (!Wa.hasOwnProperty(c)) {
          if (!Va.test(c))
            throw Error(p(65, c));
          Wa[c] = true;
        }
        var d = a2.props;
        if (c === "input")
          d = l({ type: void 0 }, d, { defaultChecked: void 0, defaultValue: void 0, value: d.value != null ? d.value : d.defaultValue, checked: d.checked != null ? d.checked : d.defaultChecked });
        else if (c === "textarea") {
          var g = d.value;
          if (g == null) {
            g = d.defaultValue;
            var e = d.children;
            if (e != null) {
              if (g != null)
                throw Error(p(92));
              if (Array.isArray(e)) {
                if (!(1 >= e.length))
                  throw Error(p(93));
                e = e[0];
              }
              g = "" + e;
            }
            g == null && (g = "");
          }
          d = l({}, d, { value: void 0, children: "" + g });
        } else if (c === "select")
          this.currentSelectValue = d.value != null ? d.value : d.defaultValue, d = l({}, d, { value: void 0 });
        else if (c === "option") {
          e = this.currentSelectValue;
          var L = Ya(d.children);
          if (e != null) {
            var G = d.value != null ? d.value + "" : L;
            g = false;
            if (Array.isArray(e))
              for (var C = 0; C < e.length; C++) {
                if ("" + e[C] === G) {
                  g = true;
                  break;
                }
              }
            else
              g = "" + e === G;
            d = l({ selected: void 0, children: void 0 }, d, { selected: g, children: L });
          }
        }
        if (g = d) {
          if (Pa[c] && (g.children != null || g.dangerouslySetInnerHTML != null))
            throw Error(p(137, c));
          if (g.dangerouslySetInnerHTML != null) {
            if (g.children != null)
              throw Error(p(60));
            if (!(typeof g.dangerouslySetInnerHTML === "object" && "__html" in g.dangerouslySetInnerHTML))
              throw Error(p(61));
          }
          if (g.style != null && typeof g.style !== "object")
            throw Error(p(62));
        }
        g = d;
        e = this.makeStaticMarkup;
        L = this.stack.length === 1;
        G = "<" + a2.type;
        b:
          if (c.indexOf("-") === -1)
            C = typeof g.is === "string";
          else
            switch (c) {
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph":
                C = false;
                break b;
              default:
                C = true;
            }
        for (w in g)
          if (Za.call(g, w)) {
            var m = g[w];
            if (m != null) {
              if (w === "style") {
                var k = void 0, v = "", H = "";
                for (k in m)
                  if (m.hasOwnProperty(k)) {
                    var x = k.indexOf("--") === 0, y = m[k];
                    if (y != null) {
                      if (x)
                        var A = k;
                      else if (A = k, Xa.hasOwnProperty(A))
                        A = Xa[A];
                      else {
                        var eb = A.replace(Ra, "-$1").toLowerCase().replace(Sa, "-ms-");
                        A = Xa[A] = eb;
                      }
                      v += H + A + ":";
                      H = k;
                      x = y == null || typeof y === "boolean" || y === "" ? "" : x || typeof y !== "number" || y === 0 || Y.hasOwnProperty(H) && Y[H] ? ("" + y).trim() : y + "px";
                      v += x;
                      H = ";";
                    }
                  }
                m = v || null;
              }
              k = null;
              C ? $a.hasOwnProperty(w) || (k = w, k = ta(k) && m != null ? k + '="' + (O(m) + '"') : "") : k = za(w, m);
              k && (G += " " + k);
            }
          }
        e || L && (G += ' data-reactroot=""');
        var w = G;
        g = "";
        Oa.hasOwnProperty(c) ? w += "/>" : (w += ">", g = "</" + a2.type + ">");
        a: {
          e = d.dangerouslySetInnerHTML;
          if (e != null) {
            if (e.__html != null) {
              e = e.__html;
              break a;
            }
          } else if (e = d.children, typeof e === "string" || typeof e === "number") {
            e = O(e);
            break a;
          }
          e = null;
        }
        e != null ? (d = [], Ua.hasOwnProperty(c) && e.charAt(0) === "\n" && (w += "\n"), w += e) : d = Z(d.children);
        a2 = a2.type;
        f = f == null || f === "http://www.w3.org/1999/xhtml" ? Na(a2) : f === "http://www.w3.org/2000/svg" && a2 === "foreignObject" ? "http://www.w3.org/1999/xhtml" : f;
        this.stack.push({ domNamespace: f, type: c, children: d, childIndex: 0, context: b2, footer: g });
        this.previousWasTextNode = false;
        return w;
      };
      return a;
    }();
    function db(a, b) {
      a.prototype = Object.create(b.prototype);
      a.prototype.constructor = a;
      a.__proto__ = b;
    }
    var fb = function(a) {
      function b(b2, c2, h) {
        var d = a.call(this, {}) || this;
        d.partialRenderer = new cb(b2, c2, h);
        return d;
      }
      db(b, a);
      var c = b.prototype;
      c._destroy = function(a2, b2) {
        this.partialRenderer.destroy();
        b2(a2);
      };
      c._read = function(a2) {
        try {
          this.push(this.partialRenderer.read(a2));
        } catch (f) {
          this.destroy(f);
        }
      };
      return b;
    }(aa.Readable);
    exports.renderToNodeStream = function(a, b) {
      return new fb(a, false, b);
    };
    exports.renderToStaticMarkup = function(a, b) {
      a = new cb(a, true, b);
      try {
        return a.read(Infinity);
      } finally {
        a.destroy();
      }
    };
    exports.renderToStaticNodeStream = function(a, b) {
      return new fb(a, true, b);
    };
    exports.renderToString = function(a, b) {
      a = new cb(a, false, b);
      try {
        return a.read(Infinity);
      } finally {
        a.destroy();
      }
    };
    exports.version = "17.0.2";
  }
});

// node_modules/react-dom/cjs/react-dom-server.node.development.js
var require_react_dom_server_node_development = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server.node.development.js"(exports) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var React = require_react();
        var _assign = require_object_assign();
        var stream = require("stream");
        var ReactVersion = "17.0.2";
        function formatProdErrorMessage(code) {
          var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code;
          for (var i2 = 1; i2 < arguments.length; i2++) {
            url += "&args[]=" + encodeURIComponent(arguments[i2]);
          }
          return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
        }
        var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function warn(format) {
          {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            printWarning("warn", format, args);
          }
        }
        function error(format) {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return "" + item;
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        var REACT_FRAGMENT_TYPE = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var functionName = innerType.displayName || innerType.name || "";
          return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentName(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                return getComponentName(type.type);
              case REACT_BLOCK_TYPE:
                return getComponentName(type._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentName(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var enableSuspenseServerRenderer = false;
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: _assign({}, props, {
                  value: prevLog
                }),
                info: _assign({}, props, {
                  value: prevInfo
                }),
                warn: _assign({}, props, {
                  value: prevWarn
                }),
                error: _assign({}, props, {
                  value: prevError
                }),
                group: _assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: _assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: _assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_BLOCK_TYPE:
                return describeFunctionComponentFrame(type._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(Object.prototype.hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var didWarnAboutInvalidateContextType;
        {
          didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
        }
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function maskContext(type, context) {
          var contextTypes = type.contextTypes;
          if (!contextTypes) {
            return emptyObject;
          }
          var maskedContext = {};
          for (var contextName in contextTypes) {
            maskedContext[contextName] = context[contextName];
          }
          return maskedContext;
        }
        function checkContextTypes(typeSpecs, values, location) {
          {
            checkPropTypes(typeSpecs, values, location, "Component");
          }
        }
        function validateContextBounds(context, threadID) {
          for (var i2 = context._threadCount | 0; i2 <= threadID; i2++) {
            context[i2] = context._currentValue2;
            context._threadCount = i2 + 1;
          }
        }
        function processContext(type, context, threadID, isClass) {
          if (isClass) {
            var contextType = type.contextType;
            {
              if ("contextType" in type) {
                var isValid = contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0;
                if (!isValid && !didWarnAboutInvalidateContextType.has(type)) {
                  didWarnAboutInvalidateContextType.add(type);
                  var addendum = "";
                  if (contextType === void 0) {
                    addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                  } else if (typeof contextType !== "object") {
                    addendum = " However, it is set to a " + typeof contextType + ".";
                  } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                    addendum = " Did you accidentally pass the Context.Provider instead?";
                  } else if (contextType._context !== void 0) {
                    addendum = " Did you accidentally pass the Context.Consumer instead?";
                  } else {
                    addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                  }
                  error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentName(type) || "Component", addendum);
                }
              }
            }
            if (typeof contextType === "object" && contextType !== null) {
              validateContextBounds(contextType, threadID);
              return contextType[threadID];
            }
            {
              var maskedContext = maskContext(type, context);
              {
                if (type.contextTypes) {
                  checkContextTypes(type.contextTypes, maskedContext, "context");
                }
              }
              return maskedContext;
            }
          } else {
            {
              var _maskedContext = maskContext(type, context);
              {
                if (type.contextTypes) {
                  checkContextTypes(type.contextTypes, _maskedContext, "context");
                }
              }
              return _maskedContext;
            }
          }
        }
        var nextAvailableThreadIDs = new Uint16Array(16);
        for (var i = 0; i < 15; i++) {
          nextAvailableThreadIDs[i] = i + 1;
        }
        nextAvailableThreadIDs[15] = 0;
        function growThreadCountAndReturnNextAvailable() {
          var oldArray = nextAvailableThreadIDs;
          var oldSize = oldArray.length;
          var newSize = oldSize * 2;
          if (!(newSize <= 65536)) {
            {
              throw Error("Maximum number of concurrent React renderers exceeded. This can happen if you are not properly destroying the Readable provided by React. Ensure that you call .destroy() on it if you no longer want to read from it, and did not read to the end. If you use .pipe() this should be automatic.");
            }
          }
          var newArray = new Uint16Array(newSize);
          newArray.set(oldArray);
          nextAvailableThreadIDs = newArray;
          nextAvailableThreadIDs[0] = oldSize + 1;
          for (var _i = oldSize; _i < newSize - 1; _i++) {
            nextAvailableThreadIDs[_i] = _i + 1;
          }
          nextAvailableThreadIDs[newSize - 1] = 0;
          return oldSize;
        }
        function allocThreadID() {
          var nextID = nextAvailableThreadIDs[0];
          if (nextID === 0) {
            return growThreadCountAndReturnNextAvailable();
          }
          nextAvailableThreadIDs[0] = nextAvailableThreadIDs[nextID];
          return nextID;
        }
        function freeThreadID(id) {
          nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0];
          nextAvailableThreadIDs[0] = id;
        }
        var RESERVED = 0;
        var STRING = 1;
        var BOOLEANISH_STRING = 2;
        var BOOLEAN = 3;
        var OVERLOADED_BOOLEAN = 4;
        var NUMERIC = 5;
        var POSITIVE_NUMERIC = 6;
        var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
        var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
        var ROOT_ATTRIBUTE_NAME = "data-reactroot";
        var VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$");
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var illegalAttributeNameCache = {};
        var validatedAttributeNameCache = {};
        function isAttributeNameSafe(attributeName) {
          if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
            return true;
          }
          if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
            return false;
          }
          if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
            validatedAttributeNameCache[attributeName] = true;
            return true;
          }
          illegalAttributeNameCache[attributeName] = true;
          {
            error("Invalid attribute name: `%s`", attributeName);
          }
          return false;
        }
        function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
          if (propertyInfo !== null) {
            return propertyInfo.type === RESERVED;
          }
          if (isCustomComponentTag) {
            return false;
          }
          if (name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")) {
            return true;
          }
          return false;
        }
        function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
          if (propertyInfo !== null && propertyInfo.type === RESERVED) {
            return false;
          }
          switch (typeof value) {
            case "function":
            case "symbol":
              return true;
            case "boolean": {
              if (isCustomComponentTag) {
                return false;
              }
              if (propertyInfo !== null) {
                return !propertyInfo.acceptsBooleans;
              } else {
                var prefix2 = name.toLowerCase().slice(0, 5);
                return prefix2 !== "data-" && prefix2 !== "aria-";
              }
            }
            default:
              return false;
          }
        }
        function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
          if (value === null || typeof value === "undefined") {
            return true;
          }
          if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) {
            return true;
          }
          if (isCustomComponentTag) {
            return false;
          }
          if (propertyInfo !== null) {
            switch (propertyInfo.type) {
              case BOOLEAN:
                return !value;
              case OVERLOADED_BOOLEAN:
                return value === false;
              case NUMERIC:
                return isNaN(value);
              case POSITIVE_NUMERIC:
                return isNaN(value) || value < 1;
            }
          }
          return false;
        }
        function getPropertyInfo(name) {
          return properties.hasOwnProperty(name) ? properties[name] : null;
        }
        function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
          this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
          this.attributeName = attributeName;
          this.attributeNamespace = attributeNamespace;
          this.mustUseProperty = mustUseProperty;
          this.propertyName = name;
          this.type = type;
          this.sanitizeURL = sanitizeURL2;
          this.removeEmptyString = removeEmptyString;
        }
        var properties = {};
        var reservedProps = [
          "children",
          "dangerouslySetInnerHTML",
          "defaultValue",
          "defaultChecked",
          "innerHTML",
          "suppressContentEditableWarning",
          "suppressHydrationWarning",
          "style"
        ];
        reservedProps.forEach(function(name) {
          properties[name] = new PropertyInfoRecord(name, RESERVED, false, name, null, false, false);
        });
        [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
          var name = _ref[0], attributeName = _ref[1];
          properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
        });
        ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name.toLowerCase(), null, false, false);
        });
        ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name, null, false, false);
        });
        [
          "allowFullScreen",
          "async",
          "autoFocus",
          "autoPlay",
          "controls",
          "default",
          "defer",
          "disabled",
          "disablePictureInPicture",
          "disableRemotePlayback",
          "formNoValidate",
          "hidden",
          "loop",
          "noModule",
          "noValidate",
          "open",
          "playsInline",
          "readOnly",
          "required",
          "reversed",
          "scoped",
          "seamless",
          "itemScope"
        ].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, name.toLowerCase(), null, false, false);
        });
        [
          "checked",
          "multiple",
          "muted",
          "selected"
        ].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, name, null, false, false);
        });
        [
          "capture",
          "download"
        ].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, name, null, false, false);
        });
        [
          "cols",
          "rows",
          "size",
          "span"
        ].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, name, null, false, false);
        });
        ["rowSpan", "start"].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(name, NUMERIC, false, name.toLowerCase(), null, false, false);
        });
        var CAMELIZE = /[\-\:]([a-z])/g;
        var capitalize = function(token) {
          return token[1].toUpperCase();
        };
        [
          "accent-height",
          "alignment-baseline",
          "arabic-form",
          "baseline-shift",
          "cap-height",
          "clip-path",
          "clip-rule",
          "color-interpolation",
          "color-interpolation-filters",
          "color-profile",
          "color-rendering",
          "dominant-baseline",
          "enable-background",
          "fill-opacity",
          "fill-rule",
          "flood-color",
          "flood-opacity",
          "font-family",
          "font-size",
          "font-size-adjust",
          "font-stretch",
          "font-style",
          "font-variant",
          "font-weight",
          "glyph-name",
          "glyph-orientation-horizontal",
          "glyph-orientation-vertical",
          "horiz-adv-x",
          "horiz-origin-x",
          "image-rendering",
          "letter-spacing",
          "lighting-color",
          "marker-end",
          "marker-mid",
          "marker-start",
          "overline-position",
          "overline-thickness",
          "paint-order",
          "panose-1",
          "pointer-events",
          "rendering-intent",
          "shape-rendering",
          "stop-color",
          "stop-opacity",
          "strikethrough-position",
          "strikethrough-thickness",
          "stroke-dasharray",
          "stroke-dashoffset",
          "stroke-linecap",
          "stroke-linejoin",
          "stroke-miterlimit",
          "stroke-opacity",
          "stroke-width",
          "text-anchor",
          "text-decoration",
          "text-rendering",
          "underline-position",
          "underline-thickness",
          "unicode-bidi",
          "unicode-range",
          "units-per-em",
          "v-alphabetic",
          "v-hanging",
          "v-ideographic",
          "v-mathematical",
          "vector-effect",
          "vert-adv-y",
          "vert-origin-x",
          "vert-origin-y",
          "word-spacing",
          "writing-mode",
          "xmlns:xlink",
          "x-height"
        ].forEach(function(attributeName) {
          var name = attributeName.replace(CAMELIZE, capitalize);
          properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
        });
        [
          "xlink:actuate",
          "xlink:arcrole",
          "xlink:role",
          "xlink:show",
          "xlink:title",
          "xlink:type"
        ].forEach(function(attributeName) {
          var name = attributeName.replace(CAMELIZE, capitalize);
          properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/1999/xlink", false, false);
        });
        [
          "xml:base",
          "xml:lang",
          "xml:space"
        ].forEach(function(attributeName) {
          var name = attributeName.replace(CAMELIZE, capitalize);
          properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/XML/1998/namespace", false, false);
        });
        ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
          properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, false, false);
        });
        var xlinkHref = "xlinkHref";
        properties[xlinkHref] = new PropertyInfoRecord("xlinkHref", STRING, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
        ["src", "href", "action", "formAction"].forEach(function(attributeName) {
          properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, true, true);
        });
        var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
        var didWarn = false;
        function sanitizeURL(url) {
          {
            if (!didWarn && isJavaScriptProtocol.test(url)) {
              didWarn = true;
              error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url));
            }
          }
        }
        var matchHtmlRegExp = /["'&<>]/;
        function escapeHtml(string) {
          var str = "" + string;
          var match = matchHtmlRegExp.exec(str);
          if (!match) {
            return str;
          }
          var escape;
          var html2 = "";
          var index;
          var lastIndex = 0;
          for (index = match.index; index < str.length; index++) {
            switch (str.charCodeAt(index)) {
              case 34:
                escape = "&quot;";
                break;
              case 38:
                escape = "&amp;";
                break;
              case 39:
                escape = "&#x27;";
                break;
              case 60:
                escape = "&lt;";
                break;
              case 62:
                escape = "&gt;";
                break;
              default:
                continue;
            }
            if (lastIndex !== index) {
              html2 += str.substring(lastIndex, index);
            }
            lastIndex = index + 1;
            html2 += escape;
          }
          return lastIndex !== index ? html2 + str.substring(lastIndex, index) : html2;
        }
        function escapeTextForBrowser(text) {
          if (typeof text === "boolean" || typeof text === "number") {
            return "" + text;
          }
          return escapeHtml(text);
        }
        function quoteAttributeValueForBrowser(value) {
          return '"' + escapeTextForBrowser(value) + '"';
        }
        function createMarkupForRoot() {
          return ROOT_ATTRIBUTE_NAME + '=""';
        }
        function createMarkupForProperty(name, value) {
          var propertyInfo = getPropertyInfo(name);
          if (name !== "style" && shouldIgnoreAttribute(name, propertyInfo, false)) {
            return "";
          }
          if (shouldRemoveAttribute(name, value, propertyInfo, false)) {
            return "";
          }
          if (propertyInfo !== null) {
            var attributeName = propertyInfo.attributeName;
            var type = propertyInfo.type;
            if (type === BOOLEAN || type === OVERLOADED_BOOLEAN && value === true) {
              return attributeName + '=""';
            } else {
              if (propertyInfo.sanitizeURL) {
                value = "" + value;
                sanitizeURL(value);
              }
              return attributeName + "=" + quoteAttributeValueForBrowser(value);
            }
          } else if (isAttributeNameSafe(name)) {
            return name + "=" + quoteAttributeValueForBrowser(value);
          }
          return "";
        }
        function createMarkupForCustomAttribute(name, value) {
          if (!isAttributeNameSafe(name) || value == null) {
            return "";
          }
          return name + "=" + quoteAttributeValueForBrowser(value);
        }
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var currentlyRenderingComponent = null;
        var firstWorkInProgressHook = null;
        var workInProgressHook = null;
        var isReRender = false;
        var didScheduleRenderPhaseUpdate = false;
        var renderPhaseUpdates = null;
        var numberOfReRenders = 0;
        var RE_RENDER_LIMIT = 25;
        var isInHookUserCodeInDev = false;
        var currentHookNameInDev;
        function resolveCurrentlyRenderingComponent() {
          if (!(currentlyRenderingComponent !== null)) {
            {
              throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          {
            if (isInHookUserCodeInDev) {
              error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
            }
          }
          return currentlyRenderingComponent;
        }
        function areHookInputsEqual(nextDeps, prevDeps) {
          if (prevDeps === null) {
            {
              error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
            }
            return false;
          }
          {
            if (nextDeps.length !== prevDeps.length) {
              error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
            }
          }
          for (var i2 = 0; i2 < prevDeps.length && i2 < nextDeps.length; i2++) {
            if (objectIs(nextDeps[i2], prevDeps[i2])) {
              continue;
            }
            return false;
          }
          return true;
        }
        function createHook() {
          if (numberOfReRenders > 0) {
            {
              {
                throw Error("Rendered more hooks than during the previous render");
              }
            }
          }
          return {
            memoizedState: null,
            queue: null,
            next: null
          };
        }
        function createWorkInProgressHook() {
          if (workInProgressHook === null) {
            if (firstWorkInProgressHook === null) {
              isReRender = false;
              firstWorkInProgressHook = workInProgressHook = createHook();
            } else {
              isReRender = true;
              workInProgressHook = firstWorkInProgressHook;
            }
          } else {
            if (workInProgressHook.next === null) {
              isReRender = false;
              workInProgressHook = workInProgressHook.next = createHook();
            } else {
              isReRender = true;
              workInProgressHook = workInProgressHook.next;
            }
          }
          return workInProgressHook;
        }
        function prepareToUseHooks(componentIdentity) {
          currentlyRenderingComponent = componentIdentity;
          {
            isInHookUserCodeInDev = false;
          }
        }
        function finishHooks(Component, props, children, refOrContext) {
          while (didScheduleRenderPhaseUpdate) {
            didScheduleRenderPhaseUpdate = false;
            numberOfReRenders += 1;
            workInProgressHook = null;
            children = Component(props, refOrContext);
          }
          resetHooksState();
          return children;
        }
        function resetHooksState() {
          {
            isInHookUserCodeInDev = false;
          }
          currentlyRenderingComponent = null;
          didScheduleRenderPhaseUpdate = false;
          firstWorkInProgressHook = null;
          numberOfReRenders = 0;
          renderPhaseUpdates = null;
          workInProgressHook = null;
        }
        function readContext(context, observedBits) {
          var threadID = currentPartialRenderer.threadID;
          validateContextBounds(context, threadID);
          {
            if (isInHookUserCodeInDev) {
              error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
            }
          }
          return context[threadID];
        }
        function useContext(context, observedBits) {
          {
            currentHookNameInDev = "useContext";
          }
          resolveCurrentlyRenderingComponent();
          var threadID = currentPartialRenderer.threadID;
          validateContextBounds(context, threadID);
          return context[threadID];
        }
        function basicStateReducer(state, action) {
          return typeof action === "function" ? action(state) : action;
        }
        function useState(initialState) {
          {
            currentHookNameInDev = "useState";
          }
          return useReducer(basicStateReducer, initialState);
        }
        function useReducer(reducer, initialArg, init) {
          {
            if (reducer !== basicStateReducer) {
              currentHookNameInDev = "useReducer";
            }
          }
          currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
          workInProgressHook = createWorkInProgressHook();
          if (isReRender) {
            var queue = workInProgressHook.queue;
            var dispatch = queue.dispatch;
            if (renderPhaseUpdates !== null) {
              var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
              if (firstRenderPhaseUpdate !== void 0) {
                renderPhaseUpdates.delete(queue);
                var newState = workInProgressHook.memoizedState;
                var update = firstRenderPhaseUpdate;
                do {
                  var action = update.action;
                  {
                    isInHookUserCodeInDev = true;
                  }
                  newState = reducer(newState, action);
                  {
                    isInHookUserCodeInDev = false;
                  }
                  update = update.next;
                } while (update !== null);
                workInProgressHook.memoizedState = newState;
                return [newState, dispatch];
              }
            }
            return [workInProgressHook.memoizedState, dispatch];
          } else {
            {
              isInHookUserCodeInDev = true;
            }
            var initialState;
            if (reducer === basicStateReducer) {
              initialState = typeof initialArg === "function" ? initialArg() : initialArg;
            } else {
              initialState = init !== void 0 ? init(initialArg) : initialArg;
            }
            {
              isInHookUserCodeInDev = false;
            }
            workInProgressHook.memoizedState = initialState;
            var _queue = workInProgressHook.queue = {
              last: null,
              dispatch: null
            };
            var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
            return [workInProgressHook.memoizedState, _dispatch];
          }
        }
        function useMemo(nextCreate, deps) {
          currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
          workInProgressHook = createWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          if (workInProgressHook !== null) {
            var prevState = workInProgressHook.memoizedState;
            if (prevState !== null) {
              if (nextDeps !== null) {
                var prevDeps = prevState[1];
                if (areHookInputsEqual(nextDeps, prevDeps)) {
                  return prevState[0];
                }
              }
            }
          }
          {
            isInHookUserCodeInDev = true;
          }
          var nextValue = nextCreate();
          {
            isInHookUserCodeInDev = false;
          }
          workInProgressHook.memoizedState = [nextValue, nextDeps];
          return nextValue;
        }
        function useRef(initialValue) {
          currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
          workInProgressHook = createWorkInProgressHook();
          var previousRef = workInProgressHook.memoizedState;
          if (previousRef === null) {
            var ref = {
              current: initialValue
            };
            {
              Object.seal(ref);
            }
            workInProgressHook.memoizedState = ref;
            return ref;
          } else {
            return previousRef;
          }
        }
        function useLayoutEffect(create, inputs) {
          {
            currentHookNameInDev = "useLayoutEffect";
            error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
          }
        }
        function dispatchAction(componentIdentity, queue, action) {
          if (!(numberOfReRenders < RE_RENDER_LIMIT)) {
            {
              throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
            }
          }
          if (componentIdentity === currentlyRenderingComponent) {
            didScheduleRenderPhaseUpdate = true;
            var update = {
              action,
              next: null
            };
            if (renderPhaseUpdates === null) {
              renderPhaseUpdates = /* @__PURE__ */ new Map();
            }
            var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
            if (firstRenderPhaseUpdate === void 0) {
              renderPhaseUpdates.set(queue, update);
            } else {
              var lastRenderPhaseUpdate = firstRenderPhaseUpdate;
              while (lastRenderPhaseUpdate.next !== null) {
                lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
              }
              lastRenderPhaseUpdate.next = update;
            }
          }
        }
        function useCallback(callback, deps) {
          return useMemo(function() {
            return callback;
          }, deps);
        }
        function useMutableSource(source, getSnapshot, subscribe) {
          resolveCurrentlyRenderingComponent();
          return getSnapshot(source._source);
        }
        function useDeferredValue(value) {
          resolveCurrentlyRenderingComponent();
          return value;
        }
        function useTransition() {
          resolveCurrentlyRenderingComponent();
          var startTransition = function(callback) {
            callback();
          };
          return [startTransition, false];
        }
        function useOpaqueIdentifier() {
          return (currentPartialRenderer.identifierPrefix || "") + "R:" + (currentPartialRenderer.uniqueID++).toString(36);
        }
        function noop() {
        }
        var currentPartialRenderer = null;
        function setCurrentPartialRenderer(renderer) {
          currentPartialRenderer = renderer;
        }
        var Dispatcher = {
          readContext,
          useContext,
          useMemo,
          useReducer,
          useRef,
          useState,
          useLayoutEffect,
          useCallback,
          useImperativeHandle: noop,
          useEffect: noop,
          useDebugValue: noop,
          useDeferredValue,
          useTransition,
          useOpaqueIdentifier,
          useMutableSource
        };
        var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
        var MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
        var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
        var Namespaces = {
          html: HTML_NAMESPACE,
          mathml: MATH_NAMESPACE,
          svg: SVG_NAMESPACE
        };
        function getIntrinsicNamespace(type) {
          switch (type) {
            case "svg":
              return SVG_NAMESPACE;
            case "math":
              return MATH_NAMESPACE;
            default:
              return HTML_NAMESPACE;
          }
        }
        function getChildNamespace(parentNamespace, type) {
          if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
            return getIntrinsicNamespace(type);
          }
          if (parentNamespace === SVG_NAMESPACE && type === "foreignObject") {
            return HTML_NAMESPACE;
          }
          return parentNamespace;
        }
        var hasReadOnlyValue = {
          button: true,
          checkbox: true,
          image: true,
          hidden: true,
          radio: true,
          reset: true,
          submit: true
        };
        function checkControlledValueProps(tagName, props) {
          {
            if (!(hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null)) {
              error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
            }
            if (!(props.onChange || props.readOnly || props.disabled || props.checked == null)) {
              error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
            }
          }
        }
        var omittedCloseTags = {
          area: true,
          base: true,
          br: true,
          col: true,
          embed: true,
          hr: true,
          img: true,
          input: true,
          keygen: true,
          link: true,
          meta: true,
          param: true,
          source: true,
          track: true,
          wbr: true
        };
        var voidElementTags = _assign({
          menuitem: true
        }, omittedCloseTags);
        var HTML = "__html";
        function assertValidProps(tag, props) {
          if (!props) {
            return;
          }
          if (voidElementTags[tag]) {
            if (!(props.children == null && props.dangerouslySetInnerHTML == null)) {
              {
                throw Error(tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
              }
            }
          }
          if (props.dangerouslySetInnerHTML != null) {
            if (!(props.children == null)) {
              {
                throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
              }
            }
            if (!(typeof props.dangerouslySetInnerHTML === "object" && HTML in props.dangerouslySetInnerHTML)) {
              {
                throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
              }
            }
          }
          {
            if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
              error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
            }
          }
          if (!(props.style == null || typeof props.style === "object")) {
            {
              throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
            }
          }
        }
        var isUnitlessNumber = {
          animationIterationCount: true,
          borderImageOutset: true,
          borderImageSlice: true,
          borderImageWidth: true,
          boxFlex: true,
          boxFlexGroup: true,
          boxOrdinalGroup: true,
          columnCount: true,
          columns: true,
          flex: true,
          flexGrow: true,
          flexPositive: true,
          flexShrink: true,
          flexNegative: true,
          flexOrder: true,
          gridArea: true,
          gridRow: true,
          gridRowEnd: true,
          gridRowSpan: true,
          gridRowStart: true,
          gridColumn: true,
          gridColumnEnd: true,
          gridColumnSpan: true,
          gridColumnStart: true,
          fontWeight: true,
          lineClamp: true,
          lineHeight: true,
          opacity: true,
          order: true,
          orphans: true,
          tabSize: true,
          widows: true,
          zIndex: true,
          zoom: true,
          fillOpacity: true,
          floodOpacity: true,
          stopOpacity: true,
          strokeDasharray: true,
          strokeDashoffset: true,
          strokeMiterlimit: true,
          strokeOpacity: true,
          strokeWidth: true
        };
        function prefixKey(prefix2, key) {
          return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
        }
        var prefixes = ["Webkit", "ms", "Moz", "O"];
        Object.keys(isUnitlessNumber).forEach(function(prop) {
          prefixes.forEach(function(prefix2) {
            isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
          });
        });
        function dangerousStyleValue(name, value, isCustomProperty) {
          var isEmpty = value == null || typeof value === "boolean" || value === "";
          if (isEmpty) {
            return "";
          }
          if (!isCustomProperty && typeof value === "number" && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
            return value + "px";
          }
          return ("" + value).trim();
        }
        var uppercasePattern = /([A-Z])/g;
        var msPattern = /^ms-/;
        function hyphenateStyleName(name) {
          return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-");
        }
        function isCustomComponent(tagName, props) {
          if (tagName.indexOf("-") === -1) {
            return typeof props.is === "string";
          }
          switch (tagName) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
              return false;
            default:
              return true;
          }
        }
        var warnValidStyle = function() {
        };
        {
          var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
          var msPattern$1 = /^-ms-/;
          var hyphenPattern = /-(.)/g;
          var badStyleValueWithSemicolonPattern = /;\s*$/;
          var warnedStyleNames = {};
          var warnedStyleValues = {};
          var warnedForNaNValue = false;
          var warnedForInfinityValue = false;
          var camelize = function(string) {
            return string.replace(hyphenPattern, function(_, character) {
              return character.toUpperCase();
            });
          };
          var warnHyphenatedStyleName = function(name) {
            if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
              return;
            }
            warnedStyleNames[name] = true;
            error("Unsupported style property %s. Did you mean %s?", name, camelize(name.replace(msPattern$1, "ms-")));
          };
          var warnBadVendoredStyleName = function(name) {
            if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
              return;
            }
            warnedStyleNames[name] = true;
            error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1));
          };
          var warnStyleValueWithSemicolon = function(name, value) {
            if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
              return;
            }
            warnedStyleValues[value] = true;
            error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, ""));
          };
          var warnStyleValueIsNaN = function(name, value) {
            if (warnedForNaNValue) {
              return;
            }
            warnedForNaNValue = true;
            error("`NaN` is an invalid value for the `%s` css style property.", name);
          };
          var warnStyleValueIsInfinity = function(name, value) {
            if (warnedForInfinityValue) {
              return;
            }
            warnedForInfinityValue = true;
            error("`Infinity` is an invalid value for the `%s` css style property.", name);
          };
          warnValidStyle = function(name, value) {
            if (name.indexOf("-") > -1) {
              warnHyphenatedStyleName(name);
            } else if (badVendoredStyleNamePattern.test(name)) {
              warnBadVendoredStyleName(name);
            } else if (badStyleValueWithSemicolonPattern.test(value)) {
              warnStyleValueWithSemicolon(name, value);
            }
            if (typeof value === "number") {
              if (isNaN(value)) {
                warnStyleValueIsNaN(name, value);
              } else if (!isFinite(value)) {
                warnStyleValueIsInfinity(name, value);
              }
            }
          };
        }
        var warnValidStyle$1 = warnValidStyle;
        var ariaProperties = {
          "aria-current": 0,
          "aria-details": 0,
          "aria-disabled": 0,
          "aria-hidden": 0,
          "aria-invalid": 0,
          "aria-keyshortcuts": 0,
          "aria-label": 0,
          "aria-roledescription": 0,
          "aria-autocomplete": 0,
          "aria-checked": 0,
          "aria-expanded": 0,
          "aria-haspopup": 0,
          "aria-level": 0,
          "aria-modal": 0,
          "aria-multiline": 0,
          "aria-multiselectable": 0,
          "aria-orientation": 0,
          "aria-placeholder": 0,
          "aria-pressed": 0,
          "aria-readonly": 0,
          "aria-required": 0,
          "aria-selected": 0,
          "aria-sort": 0,
          "aria-valuemax": 0,
          "aria-valuemin": 0,
          "aria-valuenow": 0,
          "aria-valuetext": 0,
          "aria-atomic": 0,
          "aria-busy": 0,
          "aria-live": 0,
          "aria-relevant": 0,
          "aria-dropeffect": 0,
          "aria-grabbed": 0,
          "aria-activedescendant": 0,
          "aria-colcount": 0,
          "aria-colindex": 0,
          "aria-colspan": 0,
          "aria-controls": 0,
          "aria-describedby": 0,
          "aria-errormessage": 0,
          "aria-flowto": 0,
          "aria-labelledby": 0,
          "aria-owns": 0,
          "aria-posinset": 0,
          "aria-rowcount": 0,
          "aria-rowindex": 0,
          "aria-rowspan": 0,
          "aria-setsize": 0
        };
        var warnedProperties = {};
        var rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
        var rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
        var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
        function validateProperty(tagName, name) {
          {
            if (hasOwnProperty$1.call(warnedProperties, name) && warnedProperties[name]) {
              return true;
            }
            if (rARIACamel.test(name)) {
              var ariaName = "aria-" + name.slice(4).toLowerCase();
              var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
              if (correctName == null) {
                error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name);
                warnedProperties[name] = true;
                return true;
              }
              if (name !== correctName) {
                error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName);
                warnedProperties[name] = true;
                return true;
              }
            }
            if (rARIA.test(name)) {
              var lowerCasedName = name.toLowerCase();
              var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
              if (standardName == null) {
                warnedProperties[name] = true;
                return false;
              }
              if (name !== standardName) {
                error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName);
                warnedProperties[name] = true;
                return true;
              }
            }
          }
          return true;
        }
        function warnInvalidARIAProps(type, props) {
          {
            var invalidProps = [];
            for (var key in props) {
              var isValid = validateProperty(type, key);
              if (!isValid) {
                invalidProps.push(key);
              }
            }
            var unknownPropString = invalidProps.map(function(prop) {
              return "`" + prop + "`";
            }).join(", ");
            if (invalidProps.length === 1) {
              error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
            } else if (invalidProps.length > 1) {
              error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
            }
          }
        }
        function validateProperties(type, props) {
          if (isCustomComponent(type, props)) {
            return;
          }
          warnInvalidARIAProps(type, props);
        }
        var didWarnValueNull = false;
        function validateProperties$1(type, props) {
          {
            if (type !== "input" && type !== "textarea" && type !== "select") {
              return;
            }
            if (props != null && props.value === null && !didWarnValueNull) {
              didWarnValueNull = true;
              if (type === "select" && props.multiple) {
                error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type);
              } else {
                error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type);
              }
            }
          }
        }
        var possibleStandardNames = {
          accept: "accept",
          acceptcharset: "acceptCharset",
          "accept-charset": "acceptCharset",
          accesskey: "accessKey",
          action: "action",
          allowfullscreen: "allowFullScreen",
          alt: "alt",
          as: "as",
          async: "async",
          autocapitalize: "autoCapitalize",
          autocomplete: "autoComplete",
          autocorrect: "autoCorrect",
          autofocus: "autoFocus",
          autoplay: "autoPlay",
          autosave: "autoSave",
          capture: "capture",
          cellpadding: "cellPadding",
          cellspacing: "cellSpacing",
          challenge: "challenge",
          charset: "charSet",
          checked: "checked",
          children: "children",
          cite: "cite",
          class: "className",
          classid: "classID",
          classname: "className",
          cols: "cols",
          colspan: "colSpan",
          content: "content",
          contenteditable: "contentEditable",
          contextmenu: "contextMenu",
          controls: "controls",
          controlslist: "controlsList",
          coords: "coords",
          crossorigin: "crossOrigin",
          dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
          data: "data",
          datetime: "dateTime",
          default: "default",
          defaultchecked: "defaultChecked",
          defaultvalue: "defaultValue",
          defer: "defer",
          dir: "dir",
          disabled: "disabled",
          disablepictureinpicture: "disablePictureInPicture",
          disableremoteplayback: "disableRemotePlayback",
          download: "download",
          draggable: "draggable",
          enctype: "encType",
          enterkeyhint: "enterKeyHint",
          for: "htmlFor",
          form: "form",
          formmethod: "formMethod",
          formaction: "formAction",
          formenctype: "formEncType",
          formnovalidate: "formNoValidate",
          formtarget: "formTarget",
          frameborder: "frameBorder",
          headers: "headers",
          height: "height",
          hidden: "hidden",
          high: "high",
          href: "href",
          hreflang: "hrefLang",
          htmlfor: "htmlFor",
          httpequiv: "httpEquiv",
          "http-equiv": "httpEquiv",
          icon: "icon",
          id: "id",
          innerhtml: "innerHTML",
          inputmode: "inputMode",
          integrity: "integrity",
          is: "is",
          itemid: "itemID",
          itemprop: "itemProp",
          itemref: "itemRef",
          itemscope: "itemScope",
          itemtype: "itemType",
          keyparams: "keyParams",
          keytype: "keyType",
          kind: "kind",
          label: "label",
          lang: "lang",
          list: "list",
          loop: "loop",
          low: "low",
          manifest: "manifest",
          marginwidth: "marginWidth",
          marginheight: "marginHeight",
          max: "max",
          maxlength: "maxLength",
          media: "media",
          mediagroup: "mediaGroup",
          method: "method",
          min: "min",
          minlength: "minLength",
          multiple: "multiple",
          muted: "muted",
          name: "name",
          nomodule: "noModule",
          nonce: "nonce",
          novalidate: "noValidate",
          open: "open",
          optimum: "optimum",
          pattern: "pattern",
          placeholder: "placeholder",
          playsinline: "playsInline",
          poster: "poster",
          preload: "preload",
          profile: "profile",
          radiogroup: "radioGroup",
          readonly: "readOnly",
          referrerpolicy: "referrerPolicy",
          rel: "rel",
          required: "required",
          reversed: "reversed",
          role: "role",
          rows: "rows",
          rowspan: "rowSpan",
          sandbox: "sandbox",
          scope: "scope",
          scoped: "scoped",
          scrolling: "scrolling",
          seamless: "seamless",
          selected: "selected",
          shape: "shape",
          size: "size",
          sizes: "sizes",
          span: "span",
          spellcheck: "spellCheck",
          src: "src",
          srcdoc: "srcDoc",
          srclang: "srcLang",
          srcset: "srcSet",
          start: "start",
          step: "step",
          style: "style",
          summary: "summary",
          tabindex: "tabIndex",
          target: "target",
          title: "title",
          type: "type",
          usemap: "useMap",
          value: "value",
          width: "width",
          wmode: "wmode",
          wrap: "wrap",
          about: "about",
          accentheight: "accentHeight",
          "accent-height": "accentHeight",
          accumulate: "accumulate",
          additive: "additive",
          alignmentbaseline: "alignmentBaseline",
          "alignment-baseline": "alignmentBaseline",
          allowreorder: "allowReorder",
          alphabetic: "alphabetic",
          amplitude: "amplitude",
          arabicform: "arabicForm",
          "arabic-form": "arabicForm",
          ascent: "ascent",
          attributename: "attributeName",
          attributetype: "attributeType",
          autoreverse: "autoReverse",
          azimuth: "azimuth",
          basefrequency: "baseFrequency",
          baselineshift: "baselineShift",
          "baseline-shift": "baselineShift",
          baseprofile: "baseProfile",
          bbox: "bbox",
          begin: "begin",
          bias: "bias",
          by: "by",
          calcmode: "calcMode",
          capheight: "capHeight",
          "cap-height": "capHeight",
          clip: "clip",
          clippath: "clipPath",
          "clip-path": "clipPath",
          clippathunits: "clipPathUnits",
          cliprule: "clipRule",
          "clip-rule": "clipRule",
          color: "color",
          colorinterpolation: "colorInterpolation",
          "color-interpolation": "colorInterpolation",
          colorinterpolationfilters: "colorInterpolationFilters",
          "color-interpolation-filters": "colorInterpolationFilters",
          colorprofile: "colorProfile",
          "color-profile": "colorProfile",
          colorrendering: "colorRendering",
          "color-rendering": "colorRendering",
          contentscripttype: "contentScriptType",
          contentstyletype: "contentStyleType",
          cursor: "cursor",
          cx: "cx",
          cy: "cy",
          d: "d",
          datatype: "datatype",
          decelerate: "decelerate",
          descent: "descent",
          diffuseconstant: "diffuseConstant",
          direction: "direction",
          display: "display",
          divisor: "divisor",
          dominantbaseline: "dominantBaseline",
          "dominant-baseline": "dominantBaseline",
          dur: "dur",
          dx: "dx",
          dy: "dy",
          edgemode: "edgeMode",
          elevation: "elevation",
          enablebackground: "enableBackground",
          "enable-background": "enableBackground",
          end: "end",
          exponent: "exponent",
          externalresourcesrequired: "externalResourcesRequired",
          fill: "fill",
          fillopacity: "fillOpacity",
          "fill-opacity": "fillOpacity",
          fillrule: "fillRule",
          "fill-rule": "fillRule",
          filter: "filter",
          filterres: "filterRes",
          filterunits: "filterUnits",
          floodopacity: "floodOpacity",
          "flood-opacity": "floodOpacity",
          floodcolor: "floodColor",
          "flood-color": "floodColor",
          focusable: "focusable",
          fontfamily: "fontFamily",
          "font-family": "fontFamily",
          fontsize: "fontSize",
          "font-size": "fontSize",
          fontsizeadjust: "fontSizeAdjust",
          "font-size-adjust": "fontSizeAdjust",
          fontstretch: "fontStretch",
          "font-stretch": "fontStretch",
          fontstyle: "fontStyle",
          "font-style": "fontStyle",
          fontvariant: "fontVariant",
          "font-variant": "fontVariant",
          fontweight: "fontWeight",
          "font-weight": "fontWeight",
          format: "format",
          from: "from",
          fx: "fx",
          fy: "fy",
          g1: "g1",
          g2: "g2",
          glyphname: "glyphName",
          "glyph-name": "glyphName",
          glyphorientationhorizontal: "glyphOrientationHorizontal",
          "glyph-orientation-horizontal": "glyphOrientationHorizontal",
          glyphorientationvertical: "glyphOrientationVertical",
          "glyph-orientation-vertical": "glyphOrientationVertical",
          glyphref: "glyphRef",
          gradienttransform: "gradientTransform",
          gradientunits: "gradientUnits",
          hanging: "hanging",
          horizadvx: "horizAdvX",
          "horiz-adv-x": "horizAdvX",
          horizoriginx: "horizOriginX",
          "horiz-origin-x": "horizOriginX",
          ideographic: "ideographic",
          imagerendering: "imageRendering",
          "image-rendering": "imageRendering",
          in2: "in2",
          in: "in",
          inlist: "inlist",
          intercept: "intercept",
          k1: "k1",
          k2: "k2",
          k3: "k3",
          k4: "k4",
          k: "k",
          kernelmatrix: "kernelMatrix",
          kernelunitlength: "kernelUnitLength",
          kerning: "kerning",
          keypoints: "keyPoints",
          keysplines: "keySplines",
          keytimes: "keyTimes",
          lengthadjust: "lengthAdjust",
          letterspacing: "letterSpacing",
          "letter-spacing": "letterSpacing",
          lightingcolor: "lightingColor",
          "lighting-color": "lightingColor",
          limitingconeangle: "limitingConeAngle",
          local: "local",
          markerend: "markerEnd",
          "marker-end": "markerEnd",
          markerheight: "markerHeight",
          markermid: "markerMid",
          "marker-mid": "markerMid",
          markerstart: "markerStart",
          "marker-start": "markerStart",
          markerunits: "markerUnits",
          markerwidth: "markerWidth",
          mask: "mask",
          maskcontentunits: "maskContentUnits",
          maskunits: "maskUnits",
          mathematical: "mathematical",
          mode: "mode",
          numoctaves: "numOctaves",
          offset: "offset",
          opacity: "opacity",
          operator: "operator",
          order: "order",
          orient: "orient",
          orientation: "orientation",
          origin: "origin",
          overflow: "overflow",
          overlineposition: "overlinePosition",
          "overline-position": "overlinePosition",
          overlinethickness: "overlineThickness",
          "overline-thickness": "overlineThickness",
          paintorder: "paintOrder",
          "paint-order": "paintOrder",
          panose1: "panose1",
          "panose-1": "panose1",
          pathlength: "pathLength",
          patterncontentunits: "patternContentUnits",
          patterntransform: "patternTransform",
          patternunits: "patternUnits",
          pointerevents: "pointerEvents",
          "pointer-events": "pointerEvents",
          points: "points",
          pointsatx: "pointsAtX",
          pointsaty: "pointsAtY",
          pointsatz: "pointsAtZ",
          prefix: "prefix",
          preservealpha: "preserveAlpha",
          preserveaspectratio: "preserveAspectRatio",
          primitiveunits: "primitiveUnits",
          property: "property",
          r: "r",
          radius: "radius",
          refx: "refX",
          refy: "refY",
          renderingintent: "renderingIntent",
          "rendering-intent": "renderingIntent",
          repeatcount: "repeatCount",
          repeatdur: "repeatDur",
          requiredextensions: "requiredExtensions",
          requiredfeatures: "requiredFeatures",
          resource: "resource",
          restart: "restart",
          result: "result",
          results: "results",
          rotate: "rotate",
          rx: "rx",
          ry: "ry",
          scale: "scale",
          security: "security",
          seed: "seed",
          shaperendering: "shapeRendering",
          "shape-rendering": "shapeRendering",
          slope: "slope",
          spacing: "spacing",
          specularconstant: "specularConstant",
          specularexponent: "specularExponent",
          speed: "speed",
          spreadmethod: "spreadMethod",
          startoffset: "startOffset",
          stddeviation: "stdDeviation",
          stemh: "stemh",
          stemv: "stemv",
          stitchtiles: "stitchTiles",
          stopcolor: "stopColor",
          "stop-color": "stopColor",
          stopopacity: "stopOpacity",
          "stop-opacity": "stopOpacity",
          strikethroughposition: "strikethroughPosition",
          "strikethrough-position": "strikethroughPosition",
          strikethroughthickness: "strikethroughThickness",
          "strikethrough-thickness": "strikethroughThickness",
          string: "string",
          stroke: "stroke",
          strokedasharray: "strokeDasharray",
          "stroke-dasharray": "strokeDasharray",
          strokedashoffset: "strokeDashoffset",
          "stroke-dashoffset": "strokeDashoffset",
          strokelinecap: "strokeLinecap",
          "stroke-linecap": "strokeLinecap",
          strokelinejoin: "strokeLinejoin",
          "stroke-linejoin": "strokeLinejoin",
          strokemiterlimit: "strokeMiterlimit",
          "stroke-miterlimit": "strokeMiterlimit",
          strokewidth: "strokeWidth",
          "stroke-width": "strokeWidth",
          strokeopacity: "strokeOpacity",
          "stroke-opacity": "strokeOpacity",
          suppresscontenteditablewarning: "suppressContentEditableWarning",
          suppresshydrationwarning: "suppressHydrationWarning",
          surfacescale: "surfaceScale",
          systemlanguage: "systemLanguage",
          tablevalues: "tableValues",
          targetx: "targetX",
          targety: "targetY",
          textanchor: "textAnchor",
          "text-anchor": "textAnchor",
          textdecoration: "textDecoration",
          "text-decoration": "textDecoration",
          textlength: "textLength",
          textrendering: "textRendering",
          "text-rendering": "textRendering",
          to: "to",
          transform: "transform",
          typeof: "typeof",
          u1: "u1",
          u2: "u2",
          underlineposition: "underlinePosition",
          "underline-position": "underlinePosition",
          underlinethickness: "underlineThickness",
          "underline-thickness": "underlineThickness",
          unicode: "unicode",
          unicodebidi: "unicodeBidi",
          "unicode-bidi": "unicodeBidi",
          unicoderange: "unicodeRange",
          "unicode-range": "unicodeRange",
          unitsperem: "unitsPerEm",
          "units-per-em": "unitsPerEm",
          unselectable: "unselectable",
          valphabetic: "vAlphabetic",
          "v-alphabetic": "vAlphabetic",
          values: "values",
          vectoreffect: "vectorEffect",
          "vector-effect": "vectorEffect",
          version: "version",
          vertadvy: "vertAdvY",
          "vert-adv-y": "vertAdvY",
          vertoriginx: "vertOriginX",
          "vert-origin-x": "vertOriginX",
          vertoriginy: "vertOriginY",
          "vert-origin-y": "vertOriginY",
          vhanging: "vHanging",
          "v-hanging": "vHanging",
          videographic: "vIdeographic",
          "v-ideographic": "vIdeographic",
          viewbox: "viewBox",
          viewtarget: "viewTarget",
          visibility: "visibility",
          vmathematical: "vMathematical",
          "v-mathematical": "vMathematical",
          vocab: "vocab",
          widths: "widths",
          wordspacing: "wordSpacing",
          "word-spacing": "wordSpacing",
          writingmode: "writingMode",
          "writing-mode": "writingMode",
          x1: "x1",
          x2: "x2",
          x: "x",
          xchannelselector: "xChannelSelector",
          xheight: "xHeight",
          "x-height": "xHeight",
          xlinkactuate: "xlinkActuate",
          "xlink:actuate": "xlinkActuate",
          xlinkarcrole: "xlinkArcrole",
          "xlink:arcrole": "xlinkArcrole",
          xlinkhref: "xlinkHref",
          "xlink:href": "xlinkHref",
          xlinkrole: "xlinkRole",
          "xlink:role": "xlinkRole",
          xlinkshow: "xlinkShow",
          "xlink:show": "xlinkShow",
          xlinktitle: "xlinkTitle",
          "xlink:title": "xlinkTitle",
          xlinktype: "xlinkType",
          "xlink:type": "xlinkType",
          xmlbase: "xmlBase",
          "xml:base": "xmlBase",
          xmllang: "xmlLang",
          "xml:lang": "xmlLang",
          xmlns: "xmlns",
          "xml:space": "xmlSpace",
          xmlnsxlink: "xmlnsXlink",
          "xmlns:xlink": "xmlnsXlink",
          xmlspace: "xmlSpace",
          y1: "y1",
          y2: "y2",
          y: "y",
          ychannelselector: "yChannelSelector",
          z: "z",
          zoomandpan: "zoomAndPan"
        };
        var validateProperty$1 = function() {
        };
        {
          var warnedProperties$1 = {};
          var _hasOwnProperty = Object.prototype.hasOwnProperty;
          var EVENT_NAME_REGEX = /^on./;
          var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
          var rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
          var rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
          validateProperty$1 = function(tagName, name, value, eventRegistry) {
            if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
              return true;
            }
            var lowerCasedName = name.toLowerCase();
            if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout") {
              error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React.");
              warnedProperties$1[name] = true;
              return true;
            }
            if (eventRegistry != null) {
              var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
              if (registrationNameDependencies.hasOwnProperty(name)) {
                return true;
              }
              var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
              if (registrationName != null) {
                error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName);
                warnedProperties$1[name] = true;
                return true;
              }
              if (EVENT_NAME_REGEX.test(name)) {
                error("Unknown event handler property `%s`. It will be ignored.", name);
                warnedProperties$1[name] = true;
                return true;
              }
            } else if (EVENT_NAME_REGEX.test(name)) {
              if (INVALID_EVENT_NAME_REGEX.test(name)) {
                error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name);
              }
              warnedProperties$1[name] = true;
              return true;
            }
            if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
              return true;
            }
            if (lowerCasedName === "innerhtml") {
              error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`.");
              warnedProperties$1[name] = true;
              return true;
            }
            if (lowerCasedName === "aria") {
              error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead.");
              warnedProperties$1[name] = true;
              return true;
            }
            if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value !== "string") {
              error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value);
              warnedProperties$1[name] = true;
              return true;
            }
            if (typeof value === "number" && isNaN(value)) {
              error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name);
              warnedProperties$1[name] = true;
              return true;
            }
            var propertyInfo = getPropertyInfo(name);
            var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
            if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
              var standardName = possibleStandardNames[lowerCasedName];
              if (standardName !== name) {
                error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName);
                warnedProperties$1[name] = true;
                return true;
              }
            } else if (!isReserved && name !== lowerCasedName) {
              error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName);
              warnedProperties$1[name] = true;
              return true;
            }
            if (typeof value === "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
              if (value) {
                error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name);
              } else {
                error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
              }
              warnedProperties$1[name] = true;
              return true;
            }
            if (isReserved) {
              return true;
            }
            if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
              warnedProperties$1[name] = true;
              return false;
            }
            if ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
              error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value);
              warnedProperties$1[name] = true;
              return true;
            }
            return true;
          };
        }
        var warnUnknownProperties = function(type, props, eventRegistry) {
          {
            var unknownProps = [];
            for (var key in props) {
              var isValid = validateProperty$1(type, key, props[key], eventRegistry);
              if (!isValid) {
                unknownProps.push(key);
              }
            }
            var unknownPropString = unknownProps.map(function(prop) {
              return "`" + prop + "`";
            }).join(", ");
            if (unknownProps.length === 1) {
              error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
            } else if (unknownProps.length > 1) {
              error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
            }
          }
        };
        function validateProperties$2(type, props, eventRegistry) {
          if (isCustomComponent(type, props)) {
            return;
          }
          warnUnknownProperties(type, props, eventRegistry);
        }
        var toArray = React.Children.toArray;
        var currentDebugStacks = [];
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var ReactDebugCurrentFrame$1;
        var prevGetCurrentStackImpl = null;
        var getCurrentServerStackImpl = function() {
          return "";
        };
        var describeStackFrame = function(element) {
          return "";
        };
        var validatePropertiesInDevelopment = function(type, props) {
        };
        var pushCurrentDebugStack = function(stack) {
        };
        var pushElementToDebugStack = function(element) {
        };
        var popCurrentDebugStack = function() {
        };
        var hasWarnedAboutUsingContextAsConsumer = false;
        {
          ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          validatePropertiesInDevelopment = function(type, props) {
            validateProperties(type, props);
            validateProperties$1(type, props);
            validateProperties$2(type, props, null);
          };
          describeStackFrame = function(element) {
            return describeUnknownElementTypeFrameInDEV(element.type, element._source, null);
          };
          pushCurrentDebugStack = function(stack) {
            currentDebugStacks.push(stack);
            if (currentDebugStacks.length === 1) {
              prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
              ReactDebugCurrentFrame$1.getCurrentStack = getCurrentServerStackImpl;
            }
          };
          pushElementToDebugStack = function(element) {
            var stack = currentDebugStacks[currentDebugStacks.length - 1];
            var frame = stack[stack.length - 1];
            frame.debugElementStack.push(element);
          };
          popCurrentDebugStack = function() {
            currentDebugStacks.pop();
            if (currentDebugStacks.length === 0) {
              ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
              prevGetCurrentStackImpl = null;
            }
          };
          getCurrentServerStackImpl = function() {
            if (currentDebugStacks.length === 0) {
              return "";
            }
            var frames = currentDebugStacks[currentDebugStacks.length - 1];
            var stack = "";
            for (var i2 = frames.length - 1; i2 >= 0; i2--) {
              var frame = frames[i2];
              var debugElementStack = frame.debugElementStack;
              for (var ii = debugElementStack.length - 1; ii >= 0; ii--) {
                stack += describeStackFrame(debugElementStack[ii]);
              }
            }
            return stack;
          };
        }
        var didWarnDefaultInputValue = false;
        var didWarnDefaultChecked = false;
        var didWarnDefaultSelectValue = false;
        var didWarnDefaultTextareaValue = false;
        var didWarnInvalidOptionChildren = false;
        var didWarnAboutNoopUpdateForComponent = {};
        var didWarnAboutBadClass = {};
        var didWarnAboutModulePatternComponent = {};
        var didWarnAboutDeprecatedWillMount = {};
        var didWarnAboutUndefinedDerivedState = {};
        var didWarnAboutUninitializedState = {};
        var valuePropNames = ["value", "defaultValue"];
        var newlineEatingTags = {
          listing: true,
          pre: true,
          textarea: true
        };
        var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
        var validatedTagCache = {};
        function validateDangerousTag(tag) {
          if (!validatedTagCache.hasOwnProperty(tag)) {
            if (!VALID_TAG_REGEX.test(tag)) {
              {
                throw Error("Invalid tag: " + tag);
              }
            }
            validatedTagCache[tag] = true;
          }
        }
        var styleNameCache = {};
        var processStyleName = function(styleName) {
          if (styleNameCache.hasOwnProperty(styleName)) {
            return styleNameCache[styleName];
          }
          var result = hyphenateStyleName(styleName);
          styleNameCache[styleName] = result;
          return result;
        };
        function createMarkupForStyles(styles) {
          var serialized = "";
          var delimiter = "";
          for (var styleName in styles) {
            if (!styles.hasOwnProperty(styleName)) {
              continue;
            }
            var isCustomProperty = styleName.indexOf("--") === 0;
            var styleValue = styles[styleName];
            {
              if (!isCustomProperty) {
                warnValidStyle$1(styleName, styleValue);
              }
            }
            if (styleValue != null) {
              serialized += delimiter + (isCustomProperty ? styleName : processStyleName(styleName)) + ":";
              serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);
              delimiter = ";";
            }
          }
          return serialized || null;
        }
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && getComponentName(_constructor) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnAboutNoopUpdateForComponent[warningKey]) {
              return;
            }
            error("%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.", callerName, callerName, componentName);
            didWarnAboutNoopUpdateForComponent[warningKey] = true;
          }
        }
        function shouldConstruct$1(Component) {
          return Component.prototype && Component.prototype.isReactComponent;
        }
        function getNonChildrenInnerMarkup(props) {
          var innerHTML = props.dangerouslySetInnerHTML;
          if (innerHTML != null) {
            if (innerHTML.__html != null) {
              return innerHTML.__html;
            }
          } else {
            var content = props.children;
            if (typeof content === "string" || typeof content === "number") {
              return escapeTextForBrowser(content);
            }
          }
          return null;
        }
        function flattenTopLevelChildren(children) {
          if (!React.isValidElement(children)) {
            return toArray(children);
          }
          var element = children;
          if (element.type !== REACT_FRAGMENT_TYPE) {
            return [element];
          }
          var fragmentChildren = element.props.children;
          if (!React.isValidElement(fragmentChildren)) {
            return toArray(fragmentChildren);
          }
          var fragmentChildElement = fragmentChildren;
          return [fragmentChildElement];
        }
        function flattenOptionChildren(children) {
          if (children === void 0 || children === null) {
            return children;
          }
          var content = "";
          React.Children.forEach(children, function(child) {
            if (child == null) {
              return;
            }
            content += child;
            {
              if (!didWarnInvalidOptionChildren && typeof child !== "string" && typeof child !== "number") {
                didWarnInvalidOptionChildren = true;
                error("Only strings and numbers are supported as <option> children.");
              }
            }
          });
          return content;
        }
        var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
        var STYLE = "style";
        var RESERVED_PROPS = {
          children: null,
          dangerouslySetInnerHTML: null,
          suppressContentEditableWarning: null,
          suppressHydrationWarning: null
        };
        function createOpenTagMarkup(tagVerbatim, tagLowercase, props, namespace, makeStaticMarkup, isRootElement) {
          var ret = "<" + tagVerbatim;
          var isCustomComponent$1 = isCustomComponent(tagLowercase, props);
          for (var propKey in props) {
            if (!hasOwnProperty$2.call(props, propKey)) {
              continue;
            }
            var propValue = props[propKey];
            if (propValue == null) {
              continue;
            }
            if (propKey === STYLE) {
              propValue = createMarkupForStyles(propValue);
            }
            var markup = null;
            if (isCustomComponent$1) {
              if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
                markup = createMarkupForCustomAttribute(propKey, propValue);
              }
            } else {
              markup = createMarkupForProperty(propKey, propValue);
            }
            if (markup) {
              ret += " " + markup;
            }
          }
          if (makeStaticMarkup) {
            return ret;
          }
          if (isRootElement) {
            ret += " " + createMarkupForRoot();
          }
          return ret;
        }
        function validateRenderResult(child, type) {
          if (child === void 0) {
            {
              {
                throw Error((getComponentName(type) || "Component") + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.");
              }
            }
          }
        }
        function resolve(child, context, threadID) {
          while (React.isValidElement(child)) {
            var element = child;
            var Component = element.type;
            {
              pushElementToDebugStack(element);
            }
            if (typeof Component !== "function") {
              break;
            }
            processChild(element, Component);
          }
          function processChild(element2, Component2) {
            var isClass = shouldConstruct$1(Component2);
            var publicContext = processContext(Component2, context, threadID, isClass);
            var queue = [];
            var replace = false;
            var updater = {
              isMounted: function(publicInstance) {
                return false;
              },
              enqueueForceUpdate: function(publicInstance) {
                if (queue === null) {
                  warnNoop(publicInstance, "forceUpdate");
                  return null;
                }
              },
              enqueueReplaceState: function(publicInstance, completeState) {
                replace = true;
                queue = [completeState];
              },
              enqueueSetState: function(publicInstance, currentPartialState) {
                if (queue === null) {
                  warnNoop(publicInstance, "setState");
                  return null;
                }
                queue.push(currentPartialState);
              }
            };
            var inst;
            if (isClass) {
              inst = new Component2(element2.props, publicContext, updater);
              if (typeof Component2.getDerivedStateFromProps === "function") {
                {
                  if (inst.state === null || inst.state === void 0) {
                    var componentName = getComponentName(Component2) || "Unknown";
                    if (!didWarnAboutUninitializedState[componentName]) {
                      error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, inst.state === null ? "null" : "undefined", componentName);
                      didWarnAboutUninitializedState[componentName] = true;
                    }
                  }
                }
                var partialState = Component2.getDerivedStateFromProps.call(null, element2.props, inst.state);
                {
                  if (partialState === void 0) {
                    var _componentName = getComponentName(Component2) || "Unknown";
                    if (!didWarnAboutUndefinedDerivedState[_componentName]) {
                      error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", _componentName);
                      didWarnAboutUndefinedDerivedState[_componentName] = true;
                    }
                  }
                }
                if (partialState != null) {
                  inst.state = _assign({}, inst.state, partialState);
                }
              }
            } else {
              {
                if (Component2.prototype && typeof Component2.prototype.render === "function") {
                  var _componentName2 = getComponentName(Component2) || "Unknown";
                  if (!didWarnAboutBadClass[_componentName2]) {
                    error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", _componentName2, _componentName2);
                    didWarnAboutBadClass[_componentName2] = true;
                  }
                }
              }
              var componentIdentity = {};
              prepareToUseHooks(componentIdentity);
              inst = Component2(element2.props, publicContext, updater);
              inst = finishHooks(Component2, element2.props, inst, publicContext);
              {
                if (inst != null && inst.render != null) {
                  var _componentName3 = getComponentName(Component2) || "Unknown";
                  if (!didWarnAboutModulePatternComponent[_componentName3]) {
                    error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName3, _componentName3, _componentName3);
                    didWarnAboutModulePatternComponent[_componentName3] = true;
                  }
                }
              }
              if (inst == null || inst.render == null) {
                child = inst;
                validateRenderResult(child, Component2);
                return;
              }
            }
            inst.props = element2.props;
            inst.context = publicContext;
            inst.updater = updater;
            var initialState = inst.state;
            if (initialState === void 0) {
              inst.state = initialState = null;
            }
            if (typeof inst.UNSAFE_componentWillMount === "function" || typeof inst.componentWillMount === "function") {
              if (typeof inst.componentWillMount === "function") {
                {
                  if (inst.componentWillMount.__suppressDeprecationWarning !== true) {
                    var _componentName4 = getComponentName(Component2) || "Unknown";
                    if (!didWarnAboutDeprecatedWillMount[_componentName4]) {
                      warn("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s", _componentName4);
                      didWarnAboutDeprecatedWillMount[_componentName4] = true;
                    }
                  }
                }
                if (typeof Component2.getDerivedStateFromProps !== "function") {
                  inst.componentWillMount();
                }
              }
              if (typeof inst.UNSAFE_componentWillMount === "function" && typeof Component2.getDerivedStateFromProps !== "function") {
                inst.UNSAFE_componentWillMount();
              }
              if (queue.length) {
                var oldQueue = queue;
                var oldReplace = replace;
                queue = null;
                replace = false;
                if (oldReplace && oldQueue.length === 1) {
                  inst.state = oldQueue[0];
                } else {
                  var nextState = oldReplace ? oldQueue[0] : inst.state;
                  var dontMutate = true;
                  for (var i2 = oldReplace ? 1 : 0; i2 < oldQueue.length; i2++) {
                    var partial = oldQueue[i2];
                    var _partialState = typeof partial === "function" ? partial.call(inst, nextState, element2.props, publicContext) : partial;
                    if (_partialState != null) {
                      if (dontMutate) {
                        dontMutate = false;
                        nextState = _assign({}, nextState, _partialState);
                      } else {
                        _assign(nextState, _partialState);
                      }
                    }
                  }
                  inst.state = nextState;
                }
              } else {
                queue = null;
              }
            }
            child = inst.render();
            {
              if (child === void 0 && inst.render._isMockFunction) {
                child = null;
              }
            }
            validateRenderResult(child, Component2);
            var childContext;
            {
              if (typeof inst.getChildContext === "function") {
                var _childContextTypes = Component2.childContextTypes;
                if (typeof _childContextTypes === "object") {
                  childContext = inst.getChildContext();
                  for (var contextKey in childContext) {
                    if (!(contextKey in _childContextTypes)) {
                      {
                        throw Error((getComponentName(Component2) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
                      }
                    }
                  }
                } else {
                  {
                    error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", getComponentName(Component2) || "Unknown");
                  }
                }
              }
              if (childContext) {
                context = _assign({}, context, childContext);
              }
            }
          }
          return {
            child,
            context
          };
        }
        var ReactDOMServerRenderer = /* @__PURE__ */ function() {
          function ReactDOMServerRenderer2(children, makeStaticMarkup, options) {
            var flatChildren = flattenTopLevelChildren(children);
            var topFrame = {
              type: null,
              domNamespace: Namespaces.html,
              children: flatChildren,
              childIndex: 0,
              context: emptyObject,
              footer: ""
            };
            {
              topFrame.debugElementStack = [];
            }
            this.threadID = allocThreadID();
            this.stack = [topFrame];
            this.exhausted = false;
            this.currentSelectValue = null;
            this.previousWasTextNode = false;
            this.makeStaticMarkup = makeStaticMarkup;
            this.suspenseDepth = 0;
            this.contextIndex = -1;
            this.contextStack = [];
            this.contextValueStack = [];
            this.uniqueID = 0;
            this.identifierPrefix = options && options.identifierPrefix || "";
            {
              this.contextProviderStack = [];
            }
          }
          var _proto = ReactDOMServerRenderer2.prototype;
          _proto.destroy = function destroy() {
            if (!this.exhausted) {
              this.exhausted = true;
              this.clearProviders();
              freeThreadID(this.threadID);
            }
          };
          _proto.pushProvider = function pushProvider(provider) {
            var index = ++this.contextIndex;
            var context = provider.type._context;
            var threadID = this.threadID;
            validateContextBounds(context, threadID);
            var previousValue = context[threadID];
            this.contextStack[index] = context;
            this.contextValueStack[index] = previousValue;
            {
              this.contextProviderStack[index] = provider;
            }
            context[threadID] = provider.props.value;
          };
          _proto.popProvider = function popProvider(provider) {
            var index = this.contextIndex;
            {
              if (index < 0 || provider !== this.contextProviderStack[index]) {
                error("Unexpected pop.");
              }
            }
            var context = this.contextStack[index];
            var previousValue = this.contextValueStack[index];
            this.contextStack[index] = null;
            this.contextValueStack[index] = null;
            {
              this.contextProviderStack[index] = null;
            }
            this.contextIndex--;
            context[this.threadID] = previousValue;
          };
          _proto.clearProviders = function clearProviders() {
            for (var index = this.contextIndex; index >= 0; index--) {
              var context = this.contextStack[index];
              var previousValue = this.contextValueStack[index];
              context[this.threadID] = previousValue;
            }
          };
          _proto.read = function read(bytes) {
            if (this.exhausted) {
              return null;
            }
            var prevPartialRenderer = currentPartialRenderer;
            setCurrentPartialRenderer(this);
            var prevDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = Dispatcher;
            try {
              var out = [""];
              var suspended = false;
              while (out[0].length < bytes) {
                if (this.stack.length === 0) {
                  this.exhausted = true;
                  freeThreadID(this.threadID);
                  break;
                }
                var frame = this.stack[this.stack.length - 1];
                if (suspended || frame.childIndex >= frame.children.length) {
                  var footer = frame.footer;
                  if (footer !== "") {
                    this.previousWasTextNode = false;
                  }
                  this.stack.pop();
                  if (frame.type === "select") {
                    this.currentSelectValue = null;
                  } else if (frame.type != null && frame.type.type != null && frame.type.type.$$typeof === REACT_PROVIDER_TYPE) {
                    var provider = frame.type;
                    this.popProvider(provider);
                  } else if (frame.type === REACT_SUSPENSE_TYPE) {
                    this.suspenseDepth--;
                    var buffered = out.pop();
                    if (suspended) {
                      suspended = false;
                      var fallbackFrame = frame.fallbackFrame;
                      if (!fallbackFrame) {
                        {
                          throw Error(true ? "ReactDOMServer did not find an internal fallback frame for Suspense. This is a bug in React. Please file an issue." : formatProdErrorMessage(303));
                        }
                      }
                      this.stack.push(fallbackFrame);
                      out[this.suspenseDepth] += "<!--$!-->";
                      continue;
                    } else {
                      out[this.suspenseDepth] += buffered;
                    }
                  }
                  out[this.suspenseDepth] += footer;
                  continue;
                }
                var child = frame.children[frame.childIndex++];
                var outBuffer = "";
                if (true) {
                  pushCurrentDebugStack(this.stack);
                  frame.debugElementStack.length = 0;
                }
                try {
                  outBuffer += this.render(child, frame.context, frame.domNamespace);
                } catch (err) {
                  if (err != null && typeof err.then === "function") {
                    if (enableSuspenseServerRenderer) {
                      if (!(this.suspenseDepth > 0)) {
                        {
                          throw Error(true ? "A React component suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." : formatProdErrorMessage(342));
                        }
                      }
                      suspended = true;
                    } else {
                      if (true) {
                        {
                          throw Error(true ? "ReactDOMServer does not yet support Suspense." : formatProdErrorMessage(294));
                        }
                      }
                    }
                  } else {
                    throw err;
                  }
                } finally {
                  if (true) {
                    popCurrentDebugStack();
                  }
                }
                if (out.length <= this.suspenseDepth) {
                  out.push("");
                }
                out[this.suspenseDepth] += outBuffer;
              }
              return out[0];
            } finally {
              ReactCurrentDispatcher$1.current = prevDispatcher;
              setCurrentPartialRenderer(prevPartialRenderer);
              resetHooksState();
            }
          };
          _proto.render = function render(child, context, parentNamespace) {
            if (typeof child === "string" || typeof child === "number") {
              var text = "" + child;
              if (text === "") {
                return "";
              }
              if (this.makeStaticMarkup) {
                return escapeTextForBrowser(text);
              }
              if (this.previousWasTextNode) {
                return "<!-- -->" + escapeTextForBrowser(text);
              }
              this.previousWasTextNode = true;
              return escapeTextForBrowser(text);
            } else {
              var nextChild;
              var _resolve = resolve(child, context, this.threadID);
              nextChild = _resolve.child;
              context = _resolve.context;
              if (nextChild === null || nextChild === false) {
                return "";
              } else if (!React.isValidElement(nextChild)) {
                if (nextChild != null && nextChild.$$typeof != null) {
                  var $$typeof = nextChild.$$typeof;
                  if (!($$typeof !== REACT_PORTAL_TYPE)) {
                    {
                      throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
                    }
                  }
                  {
                    {
                      throw Error("Unknown element-like object type: " + $$typeof.toString() + ". This is likely a bug in React. Please file an issue.");
                    }
                  }
                }
                var nextChildren = toArray(nextChild);
                var frame = {
                  type: null,
                  domNamespace: parentNamespace,
                  children: nextChildren,
                  childIndex: 0,
                  context,
                  footer: ""
                };
                {
                  frame.debugElementStack = [];
                }
                this.stack.push(frame);
                return "";
              }
              var nextElement = nextChild;
              var elementType = nextElement.type;
              if (typeof elementType === "string") {
                return this.renderDOM(nextElement, context, parentNamespace);
              }
              switch (elementType) {
                case REACT_LEGACY_HIDDEN_TYPE:
                case REACT_DEBUG_TRACING_MODE_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_SUSPENSE_LIST_TYPE:
                case REACT_FRAGMENT_TYPE: {
                  var _nextChildren = toArray(nextChild.props.children);
                  var _frame = {
                    type: null,
                    domNamespace: parentNamespace,
                    children: _nextChildren,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  {
                    _frame.debugElementStack = [];
                  }
                  this.stack.push(_frame);
                  return "";
                }
                case REACT_SUSPENSE_TYPE: {
                  {
                    {
                      {
                        throw Error("ReactDOMServer does not yet support Suspense.");
                      }
                    }
                  }
                }
                case REACT_SCOPE_TYPE: {
                  {
                    {
                      throw Error("ReactDOMServer does not yet support scope components.");
                    }
                  }
                }
              }
              if (typeof elementType === "object" && elementType !== null) {
                switch (elementType.$$typeof) {
                  case REACT_FORWARD_REF_TYPE: {
                    var element = nextChild;
                    var _nextChildren5;
                    var componentIdentity = {};
                    prepareToUseHooks(componentIdentity);
                    _nextChildren5 = elementType.render(element.props, element.ref);
                    _nextChildren5 = finishHooks(elementType.render, element.props, _nextChildren5, element.ref);
                    _nextChildren5 = toArray(_nextChildren5);
                    var _frame5 = {
                      type: null,
                      domNamespace: parentNamespace,
                      children: _nextChildren5,
                      childIndex: 0,
                      context,
                      footer: ""
                    };
                    {
                      _frame5.debugElementStack = [];
                    }
                    this.stack.push(_frame5);
                    return "";
                  }
                  case REACT_MEMO_TYPE: {
                    var _element = nextChild;
                    var _nextChildren6 = [React.createElement(elementType.type, _assign({
                      ref: _element.ref
                    }, _element.props))];
                    var _frame6 = {
                      type: null,
                      domNamespace: parentNamespace,
                      children: _nextChildren6,
                      childIndex: 0,
                      context,
                      footer: ""
                    };
                    {
                      _frame6.debugElementStack = [];
                    }
                    this.stack.push(_frame6);
                    return "";
                  }
                  case REACT_PROVIDER_TYPE: {
                    var provider = nextChild;
                    var nextProps = provider.props;
                    var _nextChildren7 = toArray(nextProps.children);
                    var _frame7 = {
                      type: provider,
                      domNamespace: parentNamespace,
                      children: _nextChildren7,
                      childIndex: 0,
                      context,
                      footer: ""
                    };
                    {
                      _frame7.debugElementStack = [];
                    }
                    this.pushProvider(provider);
                    this.stack.push(_frame7);
                    return "";
                  }
                  case REACT_CONTEXT_TYPE: {
                    var reactContext = nextChild.type;
                    {
                      if (reactContext._context === void 0) {
                        if (reactContext !== reactContext.Consumer) {
                          if (!hasWarnedAboutUsingContextAsConsumer) {
                            hasWarnedAboutUsingContextAsConsumer = true;
                            error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                          }
                        }
                      } else {
                        reactContext = reactContext._context;
                      }
                    }
                    var _nextProps = nextChild.props;
                    var threadID = this.threadID;
                    validateContextBounds(reactContext, threadID);
                    var nextValue = reactContext[threadID];
                    var _nextChildren8 = toArray(_nextProps.children(nextValue));
                    var _frame8 = {
                      type: nextChild,
                      domNamespace: parentNamespace,
                      children: _nextChildren8,
                      childIndex: 0,
                      context,
                      footer: ""
                    };
                    {
                      _frame8.debugElementStack = [];
                    }
                    this.stack.push(_frame8);
                    return "";
                  }
                  case REACT_FUNDAMENTAL_TYPE: {
                    {
                      {
                        throw Error("ReactDOMServer does not yet support the fundamental API.");
                      }
                    }
                  }
                  case REACT_LAZY_TYPE: {
                    var _element2 = nextChild;
                    var lazyComponent = nextChild.type;
                    var payload = lazyComponent._payload;
                    var init = lazyComponent._init;
                    var result = init(payload);
                    var _nextChildren10 = [React.createElement(result, _assign({
                      ref: _element2.ref
                    }, _element2.props))];
                    var _frame10 = {
                      type: null,
                      domNamespace: parentNamespace,
                      children: _nextChildren10,
                      childIndex: 0,
                      context,
                      footer: ""
                    };
                    {
                      _frame10.debugElementStack = [];
                    }
                    this.stack.push(_frame10);
                    return "";
                  }
                }
              }
              var info = "";
              {
                var owner = nextElement._owner;
                if (elementType === void 0 || typeof elementType === "object" && elementType !== null && Object.keys(elementType).length === 0) {
                  info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                }
                var ownerName = owner ? getComponentName(owner) : null;
                if (ownerName) {
                  info += "\n\nCheck the render method of `" + ownerName + "`.";
                }
              }
              {
                {
                  throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (elementType == null ? elementType : typeof elementType) + "." + info);
                }
              }
            }
          };
          _proto.renderDOM = function renderDOM(element, context, parentNamespace) {
            var tag = element.type.toLowerCase();
            var namespace = parentNamespace;
            if (parentNamespace === Namespaces.html) {
              namespace = getIntrinsicNamespace(tag);
            }
            {
              if (namespace === Namespaces.html) {
                if (tag !== element.type) {
                  error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", element.type);
                }
              }
            }
            validateDangerousTag(tag);
            var props = element.props;
            if (tag === "input") {
              {
                checkControlledValueProps("input", props);
                if (props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked) {
                  error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                  didWarnDefaultChecked = true;
                }
                if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue) {
                  error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                  didWarnDefaultInputValue = true;
                }
              }
              props = _assign({
                type: void 0
              }, props, {
                defaultChecked: void 0,
                defaultValue: void 0,
                value: props.value != null ? props.value : props.defaultValue,
                checked: props.checked != null ? props.checked : props.defaultChecked
              });
            } else if (tag === "textarea") {
              {
                checkControlledValueProps("textarea", props);
                if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue) {
                  error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                  didWarnDefaultTextareaValue = true;
                }
              }
              var initialValue = props.value;
              if (initialValue == null) {
                var defaultValue = props.defaultValue;
                var textareaChildren = props.children;
                if (textareaChildren != null) {
                  {
                    error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
                  }
                  if (!(defaultValue == null)) {
                    {
                      throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
                    }
                  }
                  if (Array.isArray(textareaChildren)) {
                    if (!(textareaChildren.length <= 1)) {
                      {
                        throw Error("<textarea> can only have at most one child.");
                      }
                    }
                    textareaChildren = textareaChildren[0];
                  }
                  defaultValue = "" + textareaChildren;
                }
                if (defaultValue == null) {
                  defaultValue = "";
                }
                initialValue = defaultValue;
              }
              props = _assign({}, props, {
                value: void 0,
                children: "" + initialValue
              });
            } else if (tag === "select") {
              {
                checkControlledValueProps("select", props);
                for (var i2 = 0; i2 < valuePropNames.length; i2++) {
                  var propName = valuePropNames[i2];
                  if (props[propName] == null) {
                    continue;
                  }
                  var isArray = Array.isArray(props[propName]);
                  if (props.multiple && !isArray) {
                    error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName);
                  } else if (!props.multiple && isArray) {
                    error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
                  }
                }
                if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue) {
                  error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                  didWarnDefaultSelectValue = true;
                }
              }
              this.currentSelectValue = props.value != null ? props.value : props.defaultValue;
              props = _assign({}, props, {
                value: void 0
              });
            } else if (tag === "option") {
              var selected = null;
              var selectValue = this.currentSelectValue;
              var optionChildren = flattenOptionChildren(props.children);
              if (selectValue != null) {
                var value;
                if (props.value != null) {
                  value = props.value + "";
                } else {
                  value = optionChildren;
                }
                selected = false;
                if (Array.isArray(selectValue)) {
                  for (var j = 0; j < selectValue.length; j++) {
                    if ("" + selectValue[j] === value) {
                      selected = true;
                      break;
                    }
                  }
                } else {
                  selected = "" + selectValue === value;
                }
                props = _assign({
                  selected: void 0,
                  children: void 0
                }, props, {
                  selected,
                  children: optionChildren
                });
              }
            }
            {
              validatePropertiesInDevelopment(tag, props);
            }
            assertValidProps(tag, props);
            var out = createOpenTagMarkup(element.type, tag, props, namespace, this.makeStaticMarkup, this.stack.length === 1);
            var footer = "";
            if (omittedCloseTags.hasOwnProperty(tag)) {
              out += "/>";
            } else {
              out += ">";
              footer = "</" + element.type + ">";
            }
            var children;
            var innerMarkup = getNonChildrenInnerMarkup(props);
            if (innerMarkup != null) {
              children = [];
              if (newlineEatingTags.hasOwnProperty(tag) && innerMarkup.charAt(0) === "\n") {
                out += "\n";
              }
              out += innerMarkup;
            } else {
              children = toArray(props.children);
            }
            var frame = {
              domNamespace: getChildNamespace(parentNamespace, element.type),
              type: tag,
              children,
              childIndex: 0,
              context,
              footer
            };
            {
              frame.debugElementStack = [];
            }
            this.stack.push(frame);
            this.previousWasTextNode = false;
            return out;
          };
          return ReactDOMServerRenderer2;
        }();
        function renderToString(element, options) {
          var renderer = new ReactDOMServerRenderer(element, false, options);
          try {
            var markup = renderer.read(Infinity);
            return markup;
          } finally {
            renderer.destroy();
          }
        }
        function renderToStaticMarkup(element, options) {
          var renderer = new ReactDOMServerRenderer(element, true, options);
          try {
            var markup = renderer.read(Infinity);
            return markup;
          } finally {
            renderer.destroy();
          }
        }
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          subClass.__proto__ = superClass;
        }
        var ReactMarkupReadableStream = /* @__PURE__ */ function(_Readable) {
          _inheritsLoose(ReactMarkupReadableStream2, _Readable);
          function ReactMarkupReadableStream2(element, makeStaticMarkup, options) {
            var _this;
            _this = _Readable.call(this, {}) || this;
            _this.partialRenderer = new ReactDOMServerRenderer(element, makeStaticMarkup, options);
            return _this;
          }
          var _proto = ReactMarkupReadableStream2.prototype;
          _proto._destroy = function _destroy(err, callback) {
            this.partialRenderer.destroy();
            callback(err);
          };
          _proto._read = function _read(size) {
            try {
              this.push(this.partialRenderer.read(size));
            } catch (err) {
              this.destroy(err);
            }
          };
          return ReactMarkupReadableStream2;
        }(stream.Readable);
        function renderToNodeStream(element, options) {
          return new ReactMarkupReadableStream(element, false, options);
        }
        function renderToStaticNodeStream(element, options) {
          return new ReactMarkupReadableStream(element, true, options);
        }
        exports.renderToNodeStream = renderToNodeStream;
        exports.renderToStaticMarkup = renderToStaticMarkup;
        exports.renderToStaticNodeStream = renderToStaticNodeStream;
        exports.renderToString = renderToString;
        exports.version = ReactVersion;
      })();
    }
  }
});

// node_modules/react-dom/server.node.js
var require_server_node = __commonJS({
  "node_modules/react-dom/server.node.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_dom_server_node_production_min();
    } else {
      module2.exports = require_react_dom_server_node_development();
    }
  }
});

// node_modules/react-dom/server.js
var require_server = __commonJS({
  "node_modules/react-dom/server.js"(exports, module2) {
    "use strict";
    module2.exports = require_server_node();
  }
});

// content.js
var require_content = __commonJS({
  "content.js"(exports, module2) {
    var React = require_react();
    module2.exports = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("meta", {
      charSet: "utf-8"
    }), /* @__PURE__ */ React.createElement("meta", {
      httpEquiv: "x-dns-prefetch-control",
      content: "on"
    }), /* @__PURE__ */ React.createElement("link", {
      rel: "dns-prefetch",
      href: "https://images-na.ssl-images-amazon.com"
    }), /* @__PURE__ */ React.createElement("link", {
      rel: "dns-prefetch",
      href: "https://m.media-amazon.com"
    }), /* @__PURE__ */ React.createElement("link", {
      rel: "dns-prefetch",
      href: "https://completion.amazon.com"
    }), /* @__PURE__ */ React.createElement("link", {
      rel: "stylesheet",
      href: "https://images-na.ssl-images-amazon.com/images/I/11EIQ5IGqaL._RC|01ZTHTZObnL.css,41wZkyTaWoL.css,31Y8m1dzTdL.css,013z33uKh2L.css,017DsKjNQJL.css,0131vqwP5UL.css,41EWOOlBJ9L.css,11TIuySqr6L.css,01ElnPiDxWL.css,11bGSgD5pDL.css,01Dm5eKVxwL.css,01IdKcBuAdL.css,01y-XAlI+2L.css,21N4kUH7pxL.css,01oDR3IULNL.css,41CYNGpGlrL.css,01XPHJk60-L.css,114y0SIP+yL.css,21aPhFy+riL.css,11gneA3MtJL.css,21fecG8pUzL.css,01ulGzBW88L.css,01CFUgsA-YL.css,31C80IiXalL.css,11qour3ND0L.css,11gKCCKQV+L.css,11061HxnEvL.css,11oHt2HYxnL.css,013RDhw9hoL.css,11JQtnL-6eL.css,116v6uYvN6L.css,11jtXRmppwL.css,01QrWuRrZ-L.css,21zuRztKjtL.css,11QyqG8yiqL.css,11K24eOJg4L.css,11F2+OBzLyL.css,01890+Vwk8L.css,11Y05DTEL6L.css,01cbS3UK11L.css,21F85am0yFL.css,01giMEP+djL.css_.css?AUIClients/AmazonUI#us.page_type-Gateway.not-trident"
    }), /* @__PURE__ */ React.createElement("style", {
      type: "text/css",
      dangerouslySetInnerHTML: {
        __html: "\n.nav-sprite-v1 .nav-sprite, .nav-sprite-v1 .nav-icon {\n  background-image: url(https://images-na.ssl-images-amazon.com/images/G/01/gno/sprites/nav-sprite-global-1x-hm-dsk-reorg._CB405937547_.png);\n  background-position: 0 1000px;\n  background-repeat: repeat-x;\n}\n.nav-spinner {\n  background-image: url(https://images-na.ssl-images-amazon.com/images/G/01/javascripts/lib/popover/images/snake._CB485935611_.gif);\n  background-position: center center;\n  background-repeat: no-repeat;\n}\n.nav-timeline-icon, .nav-access-image, .nav-timeline-prime-icon {\n  background-image: url(https://images-na.ssl-images-amazon.com/images/G/01/gno/sprites/timeline_sprite_1x._CB485945973_.png);\n  background-repeat: no-repeat;\n}\n"
      }
    }), /* @__PURE__ */ React.createElement("link", {
      rel: "stylesheet",
      href: "https://images-na.ssl-images-amazon.com/images/I/41KBYOkTjIL._RC|71Fh67qo7AL.css,41Etv-g4obL.css,31CdpXAsWCL.css,31YZpDCYJPL.css,21MKjoYL8wL.css,41dMxRXAxPL.css,01yCq3WXEcL.css,11kO7yAgiQL.css,31OvHRW+XiL.css,01XHMOHpK1L.css,11iUHDm4--L.css,31IrUp1HMlL.css_.css?AUIClients/NavDesktopUberAsset#desktop"
    }), /* @__PURE__ */ React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: `
#gw-desktop-herotator,#gw-desktop-herotator .a-carousel-viewport{height:300px}#gw-desktop-herotator.tall{z-index:0}#gw-desktop-herotator.tall,#gw-desktop-herotator.tall .a-carousel-controls{max-height:230px}#gw-desktop-herotator.tall .a-carousel-viewport{height:auto!important}#gw-desktop-herotator.tall .a-carousel-left,#gw-desktop-herotator.tall .a-carousel-right{max-height:250px}#gw-desktop-herotator.tall .a-carousel-viewport::before{background:linear-gradient(-180deg,rgba(234,237,237,0),#eaeded);bottom:0;content:"";filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00EAEDED', endColorstr='#EAEDED', GradientType=0);-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr='#00EAEDED', endColorstr='#EAEDED',GradientType=0)";left:0;pointer-events:none;position:absolute;right:0;top:250px;z-index:1}#gw-desktop-herotator.tall .a-carousel-container{overflow:visible}
`
      }
    }), /* @__PURE__ */ React.createElement("link", {
      rel: "stylesheet",
      href: "https://images-na.ssl-images-amazon.com/images/I/41Gc3C8UysL.css?AUIClients/AmazonGatewayAuiAssets"
    }), /* @__PURE__ */ React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: `
.gw-card-layout .a-cardui{background:#fff;height:100%;position:relative;margin-bottom:0;margin-top:0;overflow:hidden;padding-top:20px}.gw-card-layout .a-cardui .a-cardui-header{padding:0 20px;margin-bottom:10px}.gw-card-layout .a-cardui .a-cardui-footer{padding:0 20px;margin-bottom:20px;position:absolute;bottom:0;width:100%}.gw-card-layout .a-cardui .a-cardui-body{padding:0 20px 56px 20px;margin-bottom:0}.gw-card-layout .a-cardui .a-cardui-body:last-child{padding-bottom:20px}.gw-card-layout .a-cardui:last-child{margin-bottom:0}.a-lt-ie9 .gw-card-layout .a-cardui .a-cardui-body{padding-bottom:20px}.gw-card-layout{font-size:13px!important;line-height:19px!important}.gw-card-layout .a-size-base{font-size:13px!important;line-height:19px!important}.gw-card-layout .a-size-small{font-size:12px!important;line-height:18px!important}.gw-card-layout .a-size-base-plus{font-size:15px!important;line-height:21px!important}.gw-card-layout .a-size-medium{font-size:17px!important;line-height:21.34px!important}.gw-card-layout .a-size-large{font-size:21px!important;line-height:27.3px!important}.gw-card-layout h2{font-size:21px!important;line-height:27.3px!important}.truncate-1line,.truncate-2line{display:block;overflow:hidden;text-overflow:ellipsis;-ms-text-overflow:ellipsis}.truncate-1line{white-space:nowrap}.truncate-2line{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;max-height:38px}.truncate-2line.a-size-base{max-height:38px}.truncate-2line.a-size-small{max-height:36px}.truncate-2line.a-size-base-plus{max-height:42px}.truncate-2line.a-size-medium{max-height:42.67px}.truncate-2line.a-size-large{max-height:54.6px}h2.truncate-2line{max-height:54.6px}.gw-card-layout .a-cardui.gw-media-card{padding-top:0;color:#fff}.gw-card-layout .a-cardui.gw-media-card .a-cardui-footer,.gw-card-layout .a-cardui.gw-media-card .a-cardui-header{position:absolute;left:0;z-index:1;width:100%}.gw-card-layout .a-cardui.gw-media-card .a-cardui-header{margin-top:20px;padding:0 20px;top:0}.gw-card-layout .a-cardui.gw-media-card .a-cardui-header h3{margin-right:340px}.gw-card-layout .a-cardui.gw-media-card .a-cardui-footer{margin-bottom:20px;padding:0 20px;bottom:0}.gw-card-layout .a-cardui.gw-media-card .a-cardui-footer .a-link-normal{color:#fff}.gw-card-layout .a-cardui.gw-media-card .a-cardui-body{padding:0;width:100%;height:100%;overflow:hidden;position:relative}.gw-card-layout .a-cardui.gw-media-card .asinImage{position:absolute;top:0;bottom:0;right:20px;margin:auto}.gw-card-layout .a-cardui.gw-media-card .asinImage img{box-shadow:0 2px 6px 0 rgba(0,0,0,.5)}.gw-card-layout .a-cardui.gw-media-card .asinBackground{width:100%;height:100%;overflow:hidden;background-repeat:no-repeat;background-position:center right;background-size:cover;filter:blur(10px);-webkit-filter:blur(10px);filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='10px');-ms-filter:"progid:DXImageTransform.Microsoft.Blur(PixelRadius='10px')";transform:scale(1.1);-webkit-transform:scale(1.1)}.gw-card-layout .a-cardui.gw-media-card .backgroundGradient{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to right,#111,rgba(17,17,17,.2));filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#111111, endColorstr=#17171733, GradientType=1);-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#111111, endColorstr=#17171733, GradientType=1)"}.gw-card-layout[data-flow-dir="h"]{display:-webkit-flex;display:flex;-webkit-flex-flow:row wrap;flex-flow:row wrap}.gw-card-layout[data-flow-dir="h"]>.gw-col{height:420px;min-height:420px;-webkit-flex:1 0 290px;flex:1 0 290px;padding-left:10px;padding-right:10px;min-width:290px}.gw-card-layout[data-flow-dir="h"] .card-flow-row-break{-webkit-flex:1 0 100%;flex:1 0 100%}.gw-card-layout[data-flow-dir="h"]>.gw-col[data-col-span-ws="2"]{-webkit-flex:2 0 580px;flex:2 0 580px}.gw-card-layout[data-flow-dir="h"]>.gw-col[data-col-span-ws="4"]{-webkit-flex:1 0 100%;flex:1 0 100%}.gw-card-layout[data-flow-dir="h"] .gw-card-layout[data-flow-dir="v"]{display:-webkit-flex;display:flex;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;margin-top:-10px;margin-bottom:-10px}.gw-card-layout[data-flow-dir="v"]>.gw-row{-webkit-flex:1 0 0;flex:1 0 0;margin-top:10px;margin-bottom:10px}.gw-card-layout [data-order-ws="1"]{-webkit-order:1;order:1}.gw-card-layout [data-order-ws="2"]{-webkit-order:2;order:2}.gw-card-layout [data-order-ws="3"]{-webkit-order:3;order:3}.gw-card-layout [data-order-ws="4"]{-webkit-order:4;order:4}.gw-card-layout [data-order-ws="5"]{-webkit-order:5;order:5}.gw-card-layout [data-order-ws="6"]{-webkit-order:6;order:6}.gw-card-layout [data-order-ws="7"]{-webkit-order:7;order:7}.gw-card-layout [data-order-ws="8"]{-webkit-order:8;order:8}.gw-card-layout [data-order-ws="9"]{-webkit-order:9;order:9}.gw-card-layout [data-order-ws="10"]{-webkit-order:10;order:10}.gw-card-layout [data-order-ws="11"]{-webkit-order:11;order:11}.gw-card-layout [data-order-ws="12"]{-webkit-order:12;order:12}.gw-card-layout [data-order-ws="13"]{-webkit-order:13;order:13}.gw-card-layout .gw-col.gw-fixed-col{min-width:320px}@media (min-width:1240px){.gw-card-layout>hr:last-of-type{display:none}}@media (max-width:1239px){.gw-card-layout[data-flow-dir="h"]>.gw-col{-webkit-flex-basis:33.33333%;flex-basis:33.33333%;min-width:33.33333%}.gw-card-layout[data-flow-dir="h"]>.gw-col[data-col-span-sm="2"]{-webkit-flex:2 0 66.66667%;flex:2 0 66.66667%}.gw-card-layout[data-flow-dir="h"]>.gw-col[data-col-span-sm="3"]{-webkit-flex:1 0 100%;flex:1 0 100%}.gw-card-layout [data-order-sm="1"]{-webkit-order:1;order:1}.gw-card-layout [data-order-sm="2"]{-webkit-order:2;order:2}.gw-card-layout [data-order-sm="3"]{-webkit-order:3;order:3}.gw-card-layout [data-order-sm="4"]{-webkit-order:4;order:4}.gw-card-layout [data-order-sm="5"]{-webkit-order:5;order:5}.gw-card-layout [data-order-sm="6"]{-webkit-order:6;order:6}.gw-card-layout [data-order-sm="7"]{-webkit-order:7;order:7}.gw-card-layout [data-order-sm="8"]{-webkit-order:8;order:8}.gw-card-layout [data-order-sm="9"]{-webkit-order:9;order:9}.gw-card-layout [data-order-sm="10"]{-webkit-order:10;order:10}.gw-card-layout [data-order-sm="11"]{-webkit-order:11;order:11}.gw-card-layout [data-order-sm="12"]{-webkit-order:12;order:12}.gw-card-layout [data-order-sm="13"]{-webkit-order:13;order:13}.gw-card-layout .gw-col.gw-fixed-col{min-width:none}}.gw-card-layout[data-flow-dir="h"]>.card-flow-row-break{height:20px;margin:0;border:none}.gw-card-layout[data-flow-dir="h"]>[data-display-at]{display:none}.gw-card-layout[data-flow-dir="h"]>[data-display-at*=ws]{display:block}.gw-card-layout[data-flow-dir="h"][data-grid-breakpoint=ws]>[data-hide-at-ws]{display:none!important}.gw-card-layout[data-flow-dir="h"] .gw-auto-height{height:auto!important;min-height:0!important}@media (max-width:1239px){.gw-card-layout[data-flow-dir="h"]{min-width:919px}.gw-card-layout[data-flow-dir="h"]>[data-display-at]{display:none}.gw-card-layout[data-flow-dir="h"]>[data-display-at*=sm]{display:block}.gw-card-layout[data-flow-dir="h"][data-grid-breakpoint=sm]>[data-hide-at-sm]{display:none!important}}
`
      }
    }), /* @__PURE__ */ React.createElement("title", null, "Amazon.com. Spend less. Smile more."), /* @__PURE__ */ React.createElement("meta", {
      name: "description",
      content: "Free shipping on millions of items. Get the best of Shopping and Entertainment with Prime. Enjoy low prices and great deals on the largest selection of everyday essentials and other products, including fashion, home, beauty, electronics, Alexa Devices, sporting goods, toys, automotive, pets, baby, books, video games, musical instruments, office supplies, and more."
    }), /* @__PURE__ */ React.createElement("meta", {
      name: "keywords",
      content: "Amazon, Amazon.com, Books, Online Shopping, Book Store, Magazine, Subscription, Music, CDs, DVDs, Videos, Electronics, Video Games, Computers, Cell Phones, Toys, Games, Apparel, Accessories, Shoes, Jewelry, Watches, Office Products, Sports & Outdoors, Sporting Goods, Baby Products, Health, Personal Care, Beauty, Home, Garden, Bed & Bath, Furniture, Tools, Hardware, Vacuums, Outdoor Living, Automotive Parts, Pet Supplies, Broadband, DSL"
    }), /* @__PURE__ */ React.createElement("meta", {
      name: "google",
      content: "nositelinkssearchbox"
    }), /* @__PURE__ */ React.createElement("meta", {
      name: "google-site-verification",
      content: "9vpzZueNucS8hPqoGpZ5r10Nr2_sLMRG3AnDtNlucc4"
    }), /* @__PURE__ */ React.createElement("link", {
      rel: "canonical",
      href: "https://www.amazon.com/"
    }), /* @__PURE__ */ React.createElement("meta", {
      httpEquiv: "content-type",
      content: "text/html; charset=UTF-8"
    }), /* @__PURE__ */ React.createElement("meta", {
      property: "fb:app_id",
      content: 164734381262
    }), /* @__PURE__ */ React.createElement("meta", {
      name: "twitter:card",
      value: "summary"
    }), /* @__PURE__ */ React.createElement("meta", {
      name: "twitter:site:id",
      value: 20793816
    }), /* @__PURE__ */ React.createElement("meta", {
      property: "og:image",
      content: "http://g-ec2.images-amazon.com/images/G/01/social/api-share/amazon_logo_500500._V323939215_.png",
      "xmlns:og": "http://opengraphprotocol.org/schema/"
    }), /* @__PURE__ */ React.createElement("meta", {
      property: "og:description",
      content: "Free shipping on millions of items. Get the best of Shopping and Entertainment with Prime. Enjoy low prices and great deals on the largest selection of everyday essentials and other products, including fashion, home, beauty, electronics, Alexa Devices, sporting goods, toys, automotive, pets, baby, books, video games, musical instruments, office supplies, and more.",
      "xmlns:og": "http://opengraphprotocol.org/schema/"
    }), /* @__PURE__ */ React.createElement("meta", {
      name: "msvalidate.01",
      content: "3C8D6512B1E530046DE0569BA27093F3"
    }), /* @__PURE__ */ React.createElement("meta", {
      name: "p:domain_verify",
      content: "5de371cb20aa4232fe72f25d97e07dd6"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "a-page"
    }, /* @__PURE__ */ React.createElement("img", {
      height: 1,
      width: 1,
      style: { display: "none", visibility: "hidden" },
      src: "//fls-na.amazon.com/1/batch/1/OP/ATVPDKIKX0DER:135-7631307-9395561:G20VCH14K5VY7ZT71W9K$uedata=s:%2Frd%2Fuedata%3Fstaticb%26id%3DG20VCH14K5VY7ZT71W9K:0",
      alt: true,
      onload: "window.ue_sbl && window.ue_sbl();"
    }), /* @__PURE__ */ React.createElement("img", {
      src: "https://images-na.ssl-images-amazon.com/images/G/01/gno/sprites/nav-sprite-global-1x-hm-dsk-reorg._CB405937547_.png",
      style: { display: "none" },
      alt: true
    }), /* @__PURE__ */ React.createElement("style", {
      mark: "aboveNavInjectionCSS",
      type: "text/css",
      dangerouslySetInnerHTML: {
        __html: "\n      div#navSwmHoliday.nav-focus {border: none;margin: 0;}\n    "
      }
    }), /* @__PURE__ */ React.createElement("noscript", null, '<style type="text/css"><!-- #navbar #nav-shop .nav-a:hover ', "{", "color: #ff9900; text-decoration: underline;", "}", "#navbar #nav-search .nav-search-facade, #navbar #nav-tools .nav-icon, #navbar #nav-shop .nav-icon, #navbar #nav-subnav .nav-hasArrow .nav-arrow", " ", "{", "display: none;", "}", "#navbar #nav-search .nav-search-submit, #navbar #nav-search .nav-search-scope ", "{", "display: block;", "}", "#nav-search .nav-search-scope ", "{", "padding: 0 5px;", "}", "#navbar #nav-search .nav-search-dropdown ", "{", "position: relative; top: 5px; height: 23px; font-size: 14px; opacity: 1; filter: alpha(opacity = 100);", "}", "--></style>"), /* @__PURE__ */ React.createElement("a", {
      id: "nav-top"
    }), /* @__PURE__ */ React.createElement("a", {
      id: "skiplink",
      tabIndex: 0,
      className: "skip-link"
    }, "Skip to main content"), /* @__PURE__ */ React.createElement("div", {
      id: "nav-upnav",
      "aria-hidden": "true"
    }), /* @__PURE__ */ React.createElement("header", {
      id: "navbar-main",
      className: "nav-opt-sprite nav-flex nav-locale-us nav-lang-en nav-ssl nav-unrec nav-progressive-attribute"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "navbar",
      cel_widget_id: "Navigation-desktop-navbar",
      role: "navigation",
      className: "nav-sprite-v1 celwidget nav-bluebeacon nav-a11y-t1 bold-focus-hover layout2 nav-flex layout3 layout3-alt nav-packard-glow hamburger nav-progressive-attribute"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "nav-belt"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "nav-left"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "nav-logo"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/ref=nav_logo",
      id: "nav-logo-sprites",
      className: "nav-logo-link nav-progressive-attribute",
      "aria-label": "Amazon"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "nav-sprite nav-logo-base"
    }), /* @__PURE__ */ React.createElement("span", {
      id: "logo-ext",
      className: "nav-sprite nav-logo-ext nav-progressive-content"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "nav-logo-locale"
    }, ".us"))), /* @__PURE__ */ React.createElement("div", {
      id: "nav-global-location-slot"
    }, /* @__PURE__ */ React.createElement("span", {
      id: "nav-global-location-data-modal-action",
      className: "a-declarative nav-progressive-attribute",
      "data-a-modal": '{"width":375, "closeButton":"false","popoverLabel":"Choose your location", "ajaxHeaders":{"anti-csrftoken-a2z":"gJvom4j0fSD5APW2/oKIIG4NTGjelLRUrHPkcVkAAAAMAAAAAGHuJs5yYXcAAAAA"}, "name":"glow-modal", "url":"/gp/glow/get-address-selections.html?deviceType=desktop&pageType=Gateway&storeContext=NoStoreName&actionSource=desktop-modal", "footer":"<span class=\\"a-declarative\\" data-action=\\"a-popover-close\\" data-a-popover-close=\\"{}\\"><span class=\\"a-button a-button-primary\\"><span class=\\"a-button-inner\\"><button name=\\"glowDoneButton\\" class=\\"a-button-text\\" type=\\"button\\">Done</button></span></span></span>","header":"Choose your location"}',
      "data-action": "a-modal"
    }, /* @__PURE__ */ React.createElement("a", {
      id: "nav-global-location-popover-link",
      className: "nav-a nav-a-2 a-popover-trigger a-declarative nav-progressive-attribute",
      tabIndex: 0
    }, /* @__PURE__ */ React.createElement("div", {
      className: "nav-sprite nav-progressive-attribute",
      id: "nav-packard-glow-loc-icon"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "glow-ingress-block"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "nav-line-1 nav-progressive-content",
      id: "glow-ingress-line1"
    }, "Hello"), /* @__PURE__ */ React.createElement("span", {
      className: "nav-line-2 nav-progressive-content",
      id: "glow-ingress-line2"
    }, "Select your address")))), /* @__PURE__ */ React.createElement("input", {
      "data-addnewaddress": "add-new",
      id: "unifiedLocation1ClickAddress",
      name: "dropdown-selection",
      type: "hidden",
      defaultValue: "add-new",
      className: "nav-progressive-attribute"
    }), /* @__PURE__ */ React.createElement("input", {
      "data-addnewaddress": "add-new",
      id: "ubbShipTo",
      name: "dropdown-selection-ubb",
      type: "hidden",
      defaultValue: "add-new",
      className: "nav-progressive-attribute"
    }), /* @__PURE__ */ React.createElement("input", {
      id: "glowValidationToken",
      name: "glow-validation-token",
      type: "hidden",
      defaultValue: "gJvom4j0fSD5APW2/oKIIG4NTGjelLRUrHPkcVkAAAAMAAAAAGHuJs5yYXcAAAAA",
      className: "nav-progressive-attribute"
    })), /* @__PURE__ */ React.createElement("div", {
      id: "nav-global-location-toaster-script-container",
      className: "nav-progressive-content"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "nav-fill"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "nav-search"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "nav-bar-left"
    }), /* @__PURE__ */ React.createElement("form", {
      id: "nav-search-bar-form",
      acceptCharset: "utf-8",
      action: "/s/ref=nb_sb_noss",
      className: "nav-searchbar nav-progressive-attribute",
      method: "GET",
      name: "site-search",
      role: "search"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "nav-left"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "nav-search-dropdown-card"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "nav-search-scope nav-sprite"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "nav-search-facade",
      "data-value": "search-alias=aps"
    }, /* @__PURE__ */ React.createElement("span", {
      id: "nav-search-label-id",
      className: "nav-search-label nav-progressive-content"
    }, "All"), /* @__PURE__ */ React.createElement("i", {
      className: "nav-icon"
    })), /* @__PURE__ */ React.createElement("span", {
      id: "searchDropdownDescription",
      className: "nav-progressive-attribute",
      style: { display: "none" }
    }, "Select the department you want to search in"), /* @__PURE__ */ React.createElement("select", {
      "aria-describedby": "searchDropdownDescription",
      className: "nav-search-dropdown searchSelect nav-progressive-attrubute nav-progressive-search-dropdown",
      "data-nav-digest": "JQdignj78PAHAp6GGz9EzFUNKpY=",
      "data-nav-selected": 0,
      id: "searchDropdownBox",
      name: "url",
      style: { display: "block" },
      tabIndex: 0,
      title: "Search in"
    }, /* @__PURE__ */ React.createElement("option", {
      selected: "selected",
      value: "search-alias=aps"
    }, "All Departments"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=alexa-skills"
    }, "Alexa Skills"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=amazon-devices"
    }, "Amazon Devices"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=live-explorations"
    }, "Amazon Explore"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=amazon-pharmacy"
    }, "Amazon Pharmacy"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=warehouse-deals"
    }, "Amazon Warehouse"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=appliances"
    }, "Appliances"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=mobile-apps"
    }, "Apps & Games"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=arts-crafts"
    }, "Arts, Crafts & Sewing"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=audible"
    }, "Audible Books & Originals"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=automotive"
    }, "Automotive Parts & Accessories"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=courses"
    }, "AWS Courses"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=baby-products"
    }, "Baby"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=beauty"
    }, "Beauty & Personal Care"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=stripbooks"
    }, "Books"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=popular"
    }, "CDs & Vinyl"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=mobile"
    }, "Cell Phones & Accessories"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=fashion"
    }, "Clothing, Shoes & Jewelry"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=fashion-womens"
    }, "\xA0\xA0\xA0Women"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=fashion-mens"
    }, "\xA0\xA0\xA0Men"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=fashion-girls"
    }, "\xA0\xA0\xA0Girls"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=fashion-boys"
    }, "\xA0\xA0\xA0Boys"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=fashion-baby"
    }, "\xA0\xA0\xA0Baby"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=collectibles"
    }, "Collectibles & Fine Art"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=computers"
    }, "Computers"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=financial"
    }, "Credit and Payment Cards"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=edu-alt-content"
    }, "Digital Educational Resources"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=digital-music"
    }, "Digital Music"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=electronics"
    }, "Electronics"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=lawngarden"
    }, "Garden & Outdoor"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=gift-cards"
    }, "Gift Cards"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=grocery"
    }, "Grocery & Gourmet Food"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=handmade"
    }, "Handmade"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=hpc"
    }, "Health, Household & Baby Care"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=local-services"
    }, "Home & Business Services"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=garden"
    }, "Home & Kitchen"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=industrial"
    }, "Industrial & Scientific"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=prime-exclusive"
    }, "Just for Prime"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=digital-text"
    }, "Kindle Store"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=fashion-luggage"
    }, "Luggage & Travel Gear"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=luxury"
    }, "Luxury Stores"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=magazines"
    }, "Magazine Subscriptions"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=movies-tv"
    }, "Movies & TV"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=mi"
    }, "Musical Instruments"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=office-products"
    }, "Office Products"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=pets"
    }, "Pet Supplies"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=luxury-beauty"
    }, "Premium Beauty"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=instant-video"
    }, "Prime Video"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=smart-home"
    }, "Smart Home"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=software"
    }, "Software"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=sporting"
    }, "Sports & Outdoors"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=specialty-aps-sns"
    }, "Subscribe & Save"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=subscribe-with-amazon"
    }, "Subscription Boxes"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=tools"
    }, "Tools & Home Improvement"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=toys-and-games"
    }, "Toys & Games"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=under-ten-dollars"
    }, "Under $10"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=videogames"
    }, "Video Games"), /* @__PURE__ */ React.createElement("option", {
      value: "search-alias=wholefoods"
    }, "Whole Foods Market"))))), /* @__PURE__ */ React.createElement("div", {
      className: "nav-fill"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "nav-search-field "
    }, /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "twotabsearchtextbox",
      defaultValue: true,
      name: "field-keywords",
      autoComplete: "off",
      placeholder: true,
      className: "nav-input nav-progressive-attribute",
      dir: "auto",
      tabIndex: 0,
      "aria-label": "Search"
    })), /* @__PURE__ */ React.createElement("div", {
      id: "nav-iss-attach"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "nav-right"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "nav-search-submit nav-sprite"
    }, /* @__PURE__ */ React.createElement("span", {
      id: "nav-search-submit-text",
      className: "nav-search-submit-text nav-sprite nav-progressive-attribute",
      "aria-label": "Go"
    }, /* @__PURE__ */ React.createElement("input", {
      id: "nav-search-submit-button",
      type: "submit",
      className: "nav-input nav-progressive-attribute",
      defaultValue: "Go",
      tabIndex: 0
    }))))))), /* @__PURE__ */ React.createElement("div", {
      className: "nav-right"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "nav-tools",
      className: "layoutToolbarPadding"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/customer-preferences/select-language/ref=topnav_lang?ie=UTF8&preferencesReturnUrl=%2F",
      id: "icp-nav-flyout",
      className: "nav-a nav-a-2 icp-link-style-2",
      "aria-label": "Choose a language for shopping."
    }, /* @__PURE__ */ React.createElement("span", {
      className: "icp-nav-link-inner"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "nav-line-1"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "nav-line-2"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "icp-nav-flag icp-nav-flag-us"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "nav-icon nav-arrow"
    })))), /* @__PURE__ */ React.createElement("a", {
      href: "https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2F%3F_encoding%3DUTF8%26ref_%3Dnav_ya_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&",
      className: "nav-a nav-a-2   nav-progressive-attribute",
      "data-nav-ref": "nav_ya_signin",
      "data-nav-role": "signin",
      "data-ux-jq-mouseenter": "true",
      id: "nav-link-accountList",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav-link-accountList",
      "data-csa-c-content-id": "nav_ya_signin"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "nav-line-1-container"
    }, /* @__PURE__ */ React.createElement("span", {
      id: "nav-link-accountList-nav-line-1",
      className: "nav-line-1 nav-progressive-content"
    }, "Hello, Sign in")), /* @__PURE__ */ React.createElement("span", {
      className: "nav-line-2 "
    }, "Account & Lists", /* @__PURE__ */ React.createElement("span", {
      className: "nav-icon nav-arrow"
    }))), /* @__PURE__ */ React.createElement("a", {
      href: "/gp/css/order-history?ref_=nav_orders_first",
      className: "nav-a nav-a-2   nav-progressive-attribute",
      id: "nav-orders",
      tabIndex: 0
    }, /* @__PURE__ */ React.createElement("span", {
      className: "nav-line-1"
    }, "Returns"), /* @__PURE__ */ React.createElement("span", {
      className: "nav-line-2"
    }, "& Orders")), /* @__PURE__ */ React.createElement("a", {
      href: "/gp/cart/view.html?ref_=nav_cart",
      "aria-label": "0 items in cart",
      className: "nav-a nav-a-2 nav-progressive-attribute",
      id: "nav-cart"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "nav-cart-count-container"
    }, /* @__PURE__ */ React.createElement("span", {
      id: "nav-cart-count",
      "aria-hidden": "true",
      className: "nav-cart-count nav-cart-0 nav-progressive-attribute nav-progressive-content"
    }, "0"), /* @__PURE__ */ React.createElement("span", {
      className: "nav-cart-icon nav-sprite"
    })), /* @__PURE__ */ React.createElement("div", {
      id: "nav-cart-text-container",
      className: " nav-progressive-attribute"
    }, /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true",
      className: "nav-line-1"
    }), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true",
      className: "nav-line-2"
    }, "Cart", /* @__PURE__ */ React.createElement("span", {
      className: "nav-icon nav-arrow"
    }))))))), /* @__PURE__ */ React.createElement("div", {
      id: "nav-main",
      className: "nav-sprite"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "nav-left"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/site-directory?ref_=nav_em_js_disabled",
      id: "nav-hamburger-menu",
      role: "button",
      "aria-label": "Open Menu",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "HamburgerMenuDesktop",
      "data-csa-c-interaction-events": "click"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "hm-icon nav-sprite"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "hm-icon-label"
    }, "All"))), /* @__PURE__ */ React.createElement("div", {
      className: "nav-fill"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "nav-shop"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "nav-xshop-container"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "nav-xshop",
      className: "nav-progressive-content"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/bestsellers/?ref_=nav_cs_bestsellers",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_0",
      "data-csa-c-content-id": "nav_cs_bestsellers"
    }, "Best Sellers"), /* @__PURE__ */ React.createElement("a", {
      href: "/stores/node/20648519011?channel=discovbar?field-lbr_brands_browse-bin=AmazonBasics&ref_=nav_cs_amazonbasics",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_1",
      "data-csa-c-content-id": "nav_cs_amazonbasics"
    }, "Amazon Basics"), /* @__PURE__ */ React.createElement("a", {
      href: "/gp/new-releases/?ref_=nav_cs_newreleases",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_2",
      "data-csa-c-content-id": "nav_cs_newreleases"
    }, "New Releases"), /* @__PURE__ */ React.createElement("a", {
      href: "/gp/help/customer/display.html?nodeId=508510&ref_=nav_cs_customerservice",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_3",
      "data-csa-c-content-id": "nav_cs_customerservice"
    }, "Customer Service"), /* @__PURE__ */ React.createElement("a", {
      href: "/deals?ref_=nav_cs_gb",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_4",
      "data-csa-c-content-id": "nav_cs_gb"
    }, "Today's Deals"), /* @__PURE__ */ React.createElement("a", {
      href: "/prime?ref_=nav_cs_primelink_nonmember",
      className: "nav-a  ",
      "data-ux-jq-mouseenter": "true",
      id: "nav-link-prime",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav-link-prime",
      "data-csa-c-content-id": "nav_cs_primelink_nonmember"
    }, /* @__PURE__ */ React.createElement("span", null, "Prime"), /* @__PURE__ */ React.createElement("span", {
      className: "nav-icon nav-arrow"
    })), /* @__PURE__ */ React.createElement("a", {
      href: "/books-used-books-textbooks/b/?ie=UTF8&node=283155&ref_=nav_cs_books",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_6",
      "data-csa-c-content-id": "nav_cs_books"
    }, "Books"), /* @__PURE__ */ React.createElement("a", {
      href: "/gp/browse.html?node=16115931011&ref_=nav_cs_registry",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_7",
      "data-csa-c-content-id": "nav_cs_registry"
    }, "Registry"), /* @__PURE__ */ React.createElement("a", {
      href: "/home-garden-kitchen-furniture-bedding/b/?ie=UTF8&node=1055398&ref_=nav_cs_home",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_8",
      "data-csa-c-content-id": "nav_cs_home"
    }, "Amazon Home"), /* @__PURE__ */ React.createElement("a", {
      href: "/gift-cards/b/?ie=UTF8&node=2238192011&ref_=nav_cs_gc",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_9",
      "data-csa-c-content-id": "nav_cs_gc"
    }, "Gift Cards"), /* @__PURE__ */ React.createElement("a", {
      href: "/toys/b/?ie=UTF8&node=165793011&ref_=nav_cs_toys",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_10",
      "data-csa-c-content-id": "nav_cs_toys"
    }, "Toys & Games"), /* @__PURE__ */ React.createElement("a", {
      href: "/amazon-fashion/b/?ie=UTF8&node=7141123011&ref_=nav_cs_fashion",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_11",
      "data-csa-c-content-id": "nav_cs_fashion"
    }, "Fashion"), /* @__PURE__ */ React.createElement("a", {
      href: "/Kindle-eBooks/b/?ie=UTF8&node=154606011&ref_=nav_cs_kindle_books",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_12",
      "data-csa-c-content-id": "nav_cs_kindle_books"
    }, "Kindle Books"), /* @__PURE__ */ React.createElement("a", {
      href: "/b/?node=17867753011&ref_=nav_cs_shoppertoolkit",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_13",
      "data-csa-c-content-id": "nav_cs_shoppertoolkit"
    }, "Shopper Toolkit"), /* @__PURE__ */ React.createElement("a", {
      href: "/b/?_encoding=UTF8&ld=AZUSSOA-sell&node=12766669011&ref_=nav_cs_sell",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_14",
      "data-csa-c-content-id": "nav_cs_sell"
    }, "Sell"), /* @__PURE__ */ React.createElement("a", {
      href: "https://pharmacy.amazon.com/?ref_=nav_cs_pharmacy",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_15",
      "data-csa-c-content-id": "nav_cs_pharmacy"
    }, "Pharmacy"), /* @__PURE__ */ React.createElement("a", {
      href: "/automotive-auto-truck-replacements-parts/b/?ie=UTF8&node=15684181&ref_=nav_cs_automotive",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_16",
      "data-csa-c-content-id": "nav_cs_automotive"
    }, "Automotive"), /* @__PURE__ */ React.createElement("a", {
      href: "/computer-video-games-hardware-accessories/b/?ie=UTF8&node=468642&ref_=nav_cs_video_games",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_17",
      "data-csa-c-content-id": "nav_cs_video_games"
    }, "Video Games"), /* @__PURE__ */ React.createElement("a", {
      href: "/computer-pc-hardware-accessories-add-ons/b/?ie=UTF8&node=541966&ref_=nav_cs_pc",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_18",
      "data-csa-c-content-id": "nav_cs_pc"
    }, "Computers"), /* @__PURE__ */ React.createElement("a", {
      href: "/Tools-and-Home-Improvement/b/?ie=UTF8&node=228013&ref_=nav_cs_hi",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_19",
      "data-csa-c-content-id": "nav_cs_hi"
    }, "Home Improvement"), /* @__PURE__ */ React.createElement("a", {
      href: "/Coupons/b/?_encoding=UTF8&node=2231352011&ref_=nav_cs_coupons",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_20",
      "data-csa-c-content-id": "nav_cs_coupons"
    }, "Coupons"), /* @__PURE__ */ React.createElement("a", {
      href: "/Beauty-Makeup-Skin-Hair-Products/b/?ie=UTF8&node=3760911&ref_=nav_cs_beauty",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_21",
      "data-csa-c-content-id": "nav_cs_beauty"
    }, "Beauty & Personal Care"), /* @__PURE__ */ React.createElement("a", {
      href: "/Smart-Home/b/?ie=UTF8&node=6563140011&ref_=nav_cs_smart_home",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_22",
      "data-csa-c-content-id": "nav_cs_smart_home"
    }, "Smart Home"), /* @__PURE__ */ React.createElement("a", {
      href: "/health-personal-care-nutrition-fitness/b/?ie=UTF8&node=3760901&ref_=nav_cs_hpc",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_23",
      "data-csa-c-content-id": "nav_cs_hpc"
    }, "Health & Household"), /* @__PURE__ */ React.createElement("a", {
      href: "/pet-shops-dogs-cats-hamsters-kittens/b/?ie=UTF8&node=2619533011&ref_=nav_cs_pets",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_24",
      "data-csa-c-content-id": "nav_cs_pets"
    }, "Pet Supplies"), /* @__PURE__ */ React.createElement("a", {
      href: "/tv-video/b/?ie=UTF8&node=1266092011&ref_=nav_cs_tv",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_25",
      "data-csa-c-content-id": "nav_cs_tv"
    }, "TV & Video"), /* @__PURE__ */ React.createElement("a", {
      href: "/Handmade/b/?ie=UTF8&node=11260432011&ref_=nav_cs_handmade",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_26",
      "data-csa-c-content-id": "nav_cs_handmade"
    }, "Handmade"), /* @__PURE__ */ React.createElement("a", {
      href: "/baby-car-seats-strollers-bedding/b/?ie=UTF8&node=165796011&ref_=nav_cs_baby",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_27",
      "data-csa-c-content-id": "nav_cs_baby"
    }, "Baby"), /* @__PURE__ */ React.createElement("a", {
      href: "/Home-Audio-Electronics/b/?ie=UTF8&node=667846011&ref_=nav_cs_home_audio",
      className: "nav-a  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_28",
      "data-csa-c-content-id": "nav_cs_home_audio"
    }, "Home Audio & Theater"), /* @__PURE__ */ React.createElement("a", {
      href: "/gp/help/customer/accessibility",
      "aria-label": "Click to call our Disability Customer Support line, or reach us directly at 1-888-283-1678",
      className: "nav-hidden-aria  ",
      tabIndex: 0,
      "data-csa-c-type": "link",
      "data-csa-c-slot-id": "nav_cs_29"
    }, "Disability Customer Support")))), /* @__PURE__ */ React.createElement("div", {
      className: "nav-right"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "nav-swmslot"
    }))), /* @__PURE__ */ React.createElement("div", {
      id: "nav-subnav-toaster"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "nav-progressive-subnav"
    }))), /* @__PURE__ */ React.createElement("a", {
      id: "skippedLink",
      tabIndex: -1
    }), /* @__PURE__ */ React.createElement("div", {
      id: "pageContent",
      className: "a-section a-spacing-none",
      role: "main"
    }, /* @__PURE__ */ React.createElement("a", {
      name: "top"
    }), /* @__PURE__ */ React.createElement("style", {
      type: "text/css",
      dangerouslySetInnerHTML: {
        __html: "\n    .off-screen {\n      height:1px;\n      left:0;\n      overflow:hidden;\n      position:absolute;\n      top:-500px;\n      width:1px;\n    }\n  "
      }
    }), /* @__PURE__ */ React.createElement("div", {
      className: "off-screen"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/access"
    }, "Welcome to Amazon.com. If you prefer a simplified shopping experience, try the mobile web version of Amazon at www.amazon.com/access. The mobile web version is similar to the mobile app. Stay on Amazon.com for access to all the features of the main Amazon website.")), /* @__PURE__ */ React.createElement("div", {
      cel_widget_id: "desktop-hero-order",
      id: "desktop-banner",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": true,
      "data-csa-c-content-id": true,
      className: "celwidget"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "gw-desktop-herotator",
      "data-autorotation-delay": 5e3,
      className: "a-section a-spacing-none aok-relative tall"
    }, /* @__PURE__ */ React.createElement("div", {
      "data-a-carousel-options": '{"set_size":6,"minimum_gutter_width":0,"maintain_state":false,"show_partial_next":false,"name":"gateway-desktop-layout.herotator","circular":false,"animation_speed":6000}',
      "data-a-display-strategy": "single",
      "data-a-transition-strategy": "slideCircular",
      "data-a-class": "desktop",
      className: "a-begin a-carousel-container a-carousel-static a-carousel-display-single a-carousel-transition-slideCircular gw-desktop-herotator"
    }, /* @__PURE__ */ React.createElement("input", {
      autoComplete: "on",
      type: "hidden",
      className: "a-carousel-firstvisibleitem"
    }), /* @__PURE__ */ React.createElement("div", {
      className: "a-row a-carousel-controls a-carousel-row a-carousel-has-buttons a-carousel-overlay-buttons a-carousel-rounded-buttons"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-carousel-row-inner"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-carousel-col a-carousel-left"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-carousel-goto-prevpage",
      tabIndex: 0,
      href: "#"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "a-icon a-icon-previous-rounded"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-icon-alt"
    }, "Previous slide")))), /* @__PURE__ */ React.createElement("div", {
      className: "a-carousel-col a-carousel-center"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-carousel-viewport"
    }, /* @__PURE__ */ React.createElement("ol", {
      className: "a-carousel",
      role: "list"
    }, /* @__PURE__ */ React.createElement("li", {
      className: "a-carousel-card",
      role: "listitem"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "gw-ftGr-desktop-hero-1",
      className: "gw-ftGr-desktop-hero gw-critical-content csm-placement-id-b6818c9e-bf2c-420b-883a-7613aa2a4fec desktop-gateway-atf_b0eaf470-8cf1-4c12-8ff6-ea47a3eb1def celwidget pd_rd_wg-NLYIU pd_rd_w-Z3ytd pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-pf_rd_p": "b6818c9e-bf2c-420b-883a-7613aa2a4fec",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "Z3ytd",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-hero-1",
      "data-csa-c-content-id": "b6818c9e-bf2c-420b-883a-7613aa2a4fec"
    }, /* @__PURE__ */ React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: '._cropped-image-link_style_cropped-image-link__3winf{height:600px}@media (max-width:767px){._cropped-image-link_style_cropped-image-link__3winf._cropped-image-link_style_tablet-app__1Ez8O{height:368px}}@media (min-width:768px) and (max-width:919px){._cropped-image-link_style_cropped-image-link__3winf._cropped-image-link_style_tablet-app__1Ez8O{height:470px}}[data-grid-size="3"] ._cropped-image-link_style_cropped-image-link__3winf,[data-grid-size="4"] ._cropped-image-link_style_cropped-image-link__3winf{height:615.6px}[data-grid-size="5"] ._cropped-image-link_style_cropped-image-link__3winf{height:748px}\n._cropped-image-link_style_centerImage__1rzYI{height:100%;width:100%}\n._cropped-image-link_style_fluidImageContainer__2jd50{height:100%;overflow:hidden;position:relative;width:100%}._cropped-image-link_style_fluidImageContainer__2jd50 ._cropped-image-link_style_fluidImage__iJ3aE{margin:auto;position:absolute}._cropped-image-link_style_fluidImageContainer__2jd50 ._cropped-image-link_style_fluidImage__iJ3aE._cropped-image-link_style_fluidLandscapeImage__3eTVC{height:100%;left:-9999px;max-width:none;right:-9999px}._cropped-image-link_style_fluidImageContainer__2jd50 ._cropped-image-link_style_fluidImage__iJ3aE._cropped-image-link_style_fluidPortraitImage__3yQ-X{bottom:-9999px;max-height:none;top:-9999px;width:100%}'
      }
    }), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none _cropped-image-link_style_cropped-image-link__3winf cropped-image-link",
      id: "lOyQUyv5IOKjCtswrITGeA"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal _cropped-image-link_style_centerImage__1rzYI aok-block image-window",
      href: "/dp/B08GWRT223/ref=ods_gw_eg_d_h1_vicc/"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none _cropped-image-link_style_fluidImageContainer__2jd50"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Amazon Smart Soap Dispenser with 20-second timer. Works with Alexa.",
      src: "https://m.media-amazon.com/images/I/51dUkcCYHtL._SX1500_.jpg",
      className: "_cropped-image-link_style_fluidLandscapeImage__3eTVC _cropped-image-link_style_fluidImage__iJ3aE",
      "data-a-hires": "https://m.media-amazon.com/images/I/61Le776WmPL._SX3000_.jpg"
    })))))), /* @__PURE__ */ React.createElement("li", {
      className: "a-carousel-card",
      role: "listitem"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "gw-ftGr-desktop-hero-2",
      className: "a-lazy-loaded gw-ftGr-desktop-hero csm-placement-id-6aca9d7d-eb67-4817-a53f-a3252ed4f88f desktop-gateway-atf_3a00bb76-1208-4ffe-9cea-b77f7a5732c8 celwidget pd_rd_wg-NLYIU pd_rd_w-Yzgdm pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-pf_rd_p": "6aca9d7d-eb67-4817-a53f-a3252ed4f88f",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "Yzgdm",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-hero-2",
      "data-csa-c-content-id": "6aca9d7d-eb67-4817-a53f-a3252ed4f88f"
    }, " ")), /* @__PURE__ */ React.createElement("li", {
      className: "a-carousel-card",
      role: "listitem"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "gw-ftGr-desktop-hero-3",
      className: "a-lazy-loaded gw-ftGr-desktop-hero csm-placement-id-719d1874-e494-42c6-9e9e-c1fb374919a9 desktop-gateway-atf_2de1ac8a-c3cf-4f2c-abdb-bb549577510c celwidget pd_rd_wg-NLYIU pd_rd_w-vCnDz pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-pf_rd_p": "719d1874-e494-42c6-9e9e-c1fb374919a9",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "vCnDz",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-hero-3",
      "data-csa-c-content-id": "719d1874-e494-42c6-9e9e-c1fb374919a9"
    }, " ")), /* @__PURE__ */ React.createElement("li", {
      className: "a-carousel-card",
      role: "listitem"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "gw-ftGr-desktop-hero-4",
      className: "a-lazy-loaded gw-ftGr-desktop-hero csm-placement-id-57256522-aea5-4cc3-a9aa-d6bacf0d7647 desktop-gateway-atf_54f485f5-d1d9-4e26-befb-d017e39b580c celwidget pd_rd_wg-NLYIU pd_rd_w-zfGdU pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-pf_rd_p": "57256522-aea5-4cc3-a9aa-d6bacf0d7647",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "zfGdU",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-hero-4",
      "data-csa-c-content-id": "57256522-aea5-4cc3-a9aa-d6bacf0d7647"
    }, " ")), /* @__PURE__ */ React.createElement("li", {
      className: "a-carousel-card",
      role: "listitem"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "gw-ftGr-desktop-hero-5",
      className: "a-lazy-loaded gw-ftGr-desktop-hero csm-placement-id-40018f88-90ed-43f4-aa53-379bee4701f1 desktop-gateway-atf_9319ed3d-4066-4c88-8e52-b166bc7c89bd celwidget pd_rd_wg-NLYIU pd_rd_w-zAfPD pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-pf_rd_p": "40018f88-90ed-43f4-aa53-379bee4701f1",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "zAfPD",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-hero-5",
      "data-csa-c-content-id": "40018f88-90ed-43f4-aa53-379bee4701f1"
    }, " ")), /* @__PURE__ */ React.createElement("li", {
      className: "a-carousel-card",
      role: "listitem"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "gw-ftGr-desktop-hero-6",
      className: "a-lazy-loaded gw-ftGr-desktop-hero csm-placement-id-086ad74f-4f4b-4458-b9dc-c241c6e0a44b desktop-gateway-atf_1d783325-d031-4113-8b08-0b76fca9ddd1 celwidget pd_rd_wg-NLYIU pd_rd_w-c8LEX pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-pf_rd_p": "086ad74f-4f4b-4458-b9dc-c241c6e0a44b",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "c8LEX",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-hero-6",
      "data-csa-c-content-id": "086ad74f-4f4b-4458-b9dc-c241c6e0a44b"
    }, " "))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-carousel-col a-carousel-right"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-carousel-goto-nextpage",
      tabIndex: 0,
      href: "#"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "a-icon a-icon-next-rounded"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-icon-alt"
    }, "Next slide")))))), /* @__PURE__ */ React.createElement("span", {
      className: "a-end aok-hidden"
    })))), /* @__PURE__ */ React.createElement("div", {
      id: "gw-layout",
      className: "a-section a-spacing-none aok-relative"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "gw-card-layout",
      "data-grid-breakpoint": "ws",
      "data-flow-dir": "h",
      className: "a-section a-spacing-none gw-card-layout"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "desktop-grid-1",
      "data-gwi": '{"visible":"desktop-grid-1-visible","active":"desktop-grid-1-active"}',
      "data-display-at": "smws",
      "data-order-ws": 1,
      className: "gw-col csm-placement-id-1e4e234d-a246-41dd-b81a-ec11d1514e6a desktop-gateway-atf_f1d4fae3-9f29-467b-90ec-7609af924df6 celwidget pd_rd_wg-NLYIU pd_rd_w-A1IKv pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-order-sm": 1,
      "data-pf_rd_p": "1e4e234d-a246-41dd-b81a-ec11d1514e6a",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "A1IKv",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-grid-1",
      "data-csa-c-content-id": "1e4e234d-a246-41dd-b81a-ec11d1514e6a"
    }, /* @__PURE__ */ React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: ".a-cardui.fluid-fat-image-link .a-cardui-body .center-image{height:100%;width:100%}\n.fluid-card{-webkit-box-orient:vertical;-webkit-box-direction:normal;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.fluid-card.a-cardui .a-cardui-body{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;height:275px;margin-bottom:44px;padding:0 20px}\n.fluid-image-container{height:100%;overflow:hidden;position:relative;width:100%}.fluid-image-container img{bottom:-9999px;left:-9999px;margin:auto;position:absolute;right:-9999px;top:-9999px}.fluid-image-container .landscape-image{height:100%;max-height:100%;max-width:none}.fluid-image-container .portrait-image{max-height:none;max-width:100%;width:100%}"
      }
    }), /* @__PURE__ */ React.createElement("div", {
      id: "YiGEBMeVGsl1Vf7XMd82Aw",
      className: "a-cardui fluid-fat-image-link fluid-card fluid-fat-image-link",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, "Lots to love for everyone")), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal center-image aok-block image-window",
      href: "/b/?node=23713421011"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Lots to love for Everyone",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2022/VDay/Gateway/CatCardDesktop/VDay_0158_GatewayCategoryCardDesktop_CROPPED1x._SY304_CB647161145_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2022/VDay/Gateway/CatCardDesktop/VDay_0158_GatewayCategoryCardDesktop_CROPPED2x._SY608_CB647161145_.jpg"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/b/?node=23713421011"
    }, "Explore all Valentine's Day")))), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-grid-2",
      "data-gwi": '{"visible":"desktop-grid-2-visible","active":"desktop-grid-2-active"}',
      "data-display-at": "smws",
      "data-order-ws": 2,
      className: "gw-col csm-placement-id-2913754b-2a03-4ecc-b350-9cfc98d1993b desktop-gateway-atf_2a4dcd76-5ca6-4edb-9601-236200b2bf81 celwidget pd_rd_wg-NLYIU pd_rd_w-gRllP pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-order-sm": 2,
      "data-pf_rd_p": "2913754b-2a03-4ecc-b350-9cfc98d1993b",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "gRllP",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-grid-2",
      "data-csa-c-content-id": "2913754b-2a03-4ecc-b350-9cfc98d1993b"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "Ve4hmEX8f_sJ30gD879n0A",
      className: "a-cardui fluid-fat-image-link fluid-card fluid-fat-image-link",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, "Gifts for Foodies")), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal center-image aok-block image-window",
      href: "/b/?node=23712919011"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Gifts for Foodies",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2022/VDay/Gateway/CatCardDesktop/Gift4Foodies_0875_CategoryCardDesktop_CROPPED1x._SY304_CB647161145_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2022/VDay/Gateway/CatCardDesktop/Gift4Foodies_0875_CategoryCardDesktop_CROPPED2x._SY608_CB647161145_.jpg"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/b/?node=23713421011"
    }, "Explore Valentine's Day gifts")))), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-grid-3",
      "data-gwi": '{"visible":"desktop-grid-3-visible","active":"desktop-grid-3-active"}',
      "data-display-at": "smws",
      "data-order-ws": 3,
      className: "gw-col csm-placement-id-9875e817-188b-48a2-986d-8146749644ac desktop-gateway-atf_3980da47-cb5e-42a2-8713-071828c0b3c5 celwidget pd_rd_wg-NLYIU pd_rd_w-76CK7 pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-order-sm": 3,
      "data-pf_rd_p": "9875e817-188b-48a2-986d-8146749644ac",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "76CK7",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-grid-3",
      "data-csa-c-content-id": "9875e817-188b-48a2-986d-8146749644ac"
    }, /* @__PURE__ */ React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: ".fluid-card{-webkit-box-orient:vertical;-webkit-box-direction:normal;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.fluid-card.a-cardui .a-cardui-body{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;height:275px;margin-bottom:44px;padding:0 20px}\n.fluid-quad-image-label .image-label{height:36px}.fluid-quad-image-label .image-redirect{height:100%}.fluid-quad-image-label .grid-row-1{margin-bottom:6px}.fluid-quad-image-label .grid-row-1,.fluid-quad-image-label .grid-row-2{height:50%;overflow:hidden}.fluid-quad-image-label .quadrant-container{display:inline-block;height:100%;margin:0;padding:0 0 36px;position:relative;width:47.5%}.fluid-quad-image-label .quadrant-container-1{float:right}html[dir=rtl] .fluid-quad-image-label .quadrant-container-1{float:left}.fluid-quad-image-label .quadrant-overlay{height:100%;left:0;position:absolute;top:0;width:100%}\n.fluid-image-container{height:100%;overflow:hidden;position:relative;width:100%}.fluid-image-container img{bottom:-9999px;left:-9999px;margin:auto;position:absolute;right:-9999px;top:-9999px}.fluid-image-container .landscape-image{height:100%;max-height:100%;max-width:none}.fluid-image-container .portrait-image{max-height:none;max-width:100%;width:100%}"
      }
    }), /* @__PURE__ */ React.createElement("div", {
      id: "Z-K4F0DV0w1iQpjUyEiY6Q",
      className: "a-cardui fluid-quad-card fluid-card fluid-quad-image-label fluid-quad-image-label",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, "Bring in the fresh energy")), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-small grid-row-1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-0"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Fitness equipment",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/s/ref=OUT_FTN_DQC_D_EN_US?i=sporting&bbn=17851394011&rh=n%3A3375251%2Cn%3A3407731&dc&brr=1&qid=1640735849&rd=1&rnid=3375301&ref=sr_nr_n_3"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Fitness equipment",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/Outlet/Merchandising/Outlet_GW_FTN_186x116_Evergreen_Jan_2022._SY116_CB649719062_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/Outlet/Merchandising/Outlet_GW_FTN_372x232_Evergreen_Jan_2022._SY232_CB649718859_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Fitness equipment")))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-1"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Yoga equipment",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/s/ref=OUT_YG_DQC_D_EN_US?i=sporting&bbn=17851394011&rh=n%3A3375251%2Cn%3A3407731%2Cn%3A3422251&dc&brr=1&qid=1640730276&rd=1&rnid=3407731&ref=sr_pg_1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Yoga equipment",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/Outlet/Merchandising/Outlet_GW_YG_186x116_Evergreen_Jan_2022._SY116_CB649717711_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/Outlet/Merchandising/Outlet_GW_YG_372x232_Evergreen_Jan_2022._SY232_CB649716796_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Yoga equipment"))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section grid-row-2"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-0"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Health & personal care",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/b/ref=OUT_HPC_DQC_D_EN_US?node=18066690011"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Health & personal care",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/Outlet/Merchandising/Outlet_GW_HPC_186x116_Evergreen_Jan_2022._SY116_CB649717711_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/Outlet/Merchandising/Outlet_GW_HPC_372x232_Evergreen_Jan_2022._SY232_CB649717711_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Health & personal care")))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-1"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Outdoors",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/b/ref=OUT_O_DQC_D_EN_US?node=17851395011"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Outdoors",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/Outlet/Merchandising/Outlet_GW_O_186x116_Evergreen_Jan_2022._SY116_CB649717711_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/Outlet/Merchandising/Outlet_GW_O_372x232_Evergreen_Jan_2022._SY232_CB649717711_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Outdoors")))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/Outlet/ref=OUT_DQC_D_EN_US"
    }, "Shop overstock deals in Outlet")))), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-grid-4",
      "data-gwi": '{"visible":"desktop-grid-4-visible","active":"desktop-grid-4-active"}',
      "data-display-at": "smws",
      "data-order-ws": 4,
      className: "gw-col csm-placement-id-7ea9c35b-a12b-45cc-81af-26bad7272221 desktop-gateway-atf_7742202b-ef86-41df-be00-bc16204ebfc5 celwidget pd_rd_wg-NLYIU pd_rd_w-Hq8E6 pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-order-sm": 6,
      "data-pf_rd_p": "7ea9c35b-a12b-45cc-81af-26bad7272221",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "Hq8E6",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-grid-4",
      "data-csa-c-content-id": "7ea9c35b-a12b-45cc-81af-26bad7272221"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "pefktK6X1WBpia9O8J8AOg",
      className: "a-cardui fluid-quad-card fluid-card fluid-quad-image-label fluid-quad-image-label",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, "Gifts she\u2019ll love")), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-small grid-row-1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-0"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Jewelry & watches",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683667011&ref_=af_gw_top_quadcat_feb_w_gifts"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Jewelry & watches",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-OThjZjM4MTMt-w186._SY116_CB649490429_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-OThjZjM4MTMt-w372._SY232_CB649490429_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Jewelry & watches")))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-1"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Lingerie & more",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683674011&ref_=af_gw_top_quadcat_feb_w_gifts"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Lingerie & more",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-MmU2Nzk2NjMt-w186._SY116_CB649490429_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-MmU2Nzk2NjMt-w372._SY232_CB649490402_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Lingerie & more"))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section grid-row-2"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-0"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Tops & blouses",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683671011&ref_=af_gw_top_quadcat_feb_w_gifts"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Tops & blouses",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-MDM0ZDA1YTkt-w186._SY116_CB649490429_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-MDM0ZDA1YTkt-w372._SY232_CB649490429_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Tops & blouses")))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-1"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Handbags",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683669011&ref_=af_gw_top_quadcat_feb_w_gifts"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Handbags",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-ODYzZTZmOGUt-w186._SY116_CB649490429_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-ODYzZTZmOGUt-w372._SY232_CB649490429_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Handbags")))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/s?i=fashion&rh=n%3A23710367011&s=date-desc-rank&ref_=af_gw_top_quadcat_feb_w_gifts"
    }, "Shop stylish presents")))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "smws",
      "data-order-sm": 4,
      "data-order-ws": 5,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-grid-5",
      "data-gwi": '{"visible":"desktop-grid-5-visible","active":"desktop-grid-5-active"}',
      "data-display-at": "smws",
      "data-order-ws": 6,
      className: "gw-col csm-placement-id-3bd41112-2441-40bc-916f-024ff92f2f90 desktop-gateway-atf_206ff11f-7de8-4353-a55c-b9a22e2b018d celwidget pd_rd_wg-NLYIU pd_rd_w-nRKnx pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-order-sm": 7,
      "data-pf_rd_p": "3bd41112-2441-40bc-916f-024ff92f2f90",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "nRKnx",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-grid-5",
      "data-csa-c-content-id": "3bd41112-2441-40bc-916f-024ff92f2f90"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "MDuCYxPM4rwszZ-e4WbMhw",
      className: "a-cardui fluid-quad-card fluid-card fluid-quad-image-label fluid-quad-image-label",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, "Cozy winter style for her")), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-small grid-row-1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-0"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Coats and jackets",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683659011&ref_=af_gw_top_quadcat_jan_w_cold_weather_coats"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Coats and jackets",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-NzhhZmQ0MGUt-w186._SY116_CB649113955_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-NzhhZmQ0MGUt-w372._SY232_CB649113955_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Coats and jackets")))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-1"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Accessories",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683650011&ref_=af_gw_top_quadcat_jan_w_cold_weather_accessories"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Accessories",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-ZjQ3MmY2NWMt-w186._SY116_CB649113955_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-ZjQ3MmY2NWMt-w372._SY232_CB649113955_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Accessories"))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section grid-row-2"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-0"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Boots",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683660011&ref_=af_gw_top_quadcat_jan_w_cold_weather_boots"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Boots",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-MWQwNzE5YjQt-w186._SY116_CB649113955_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-MWQwNzE5YjQt-w372._SY232_CB649113955_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Boots")))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-1"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Sweaters",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683661011&ref_=af_gw_top_quadcat_jan_w_cold_weather_sweaters"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Sweaters",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-NTQzY2RjNjAt-w186._SY116_CB649113955_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-NTQzY2RjNjAt-w372._SY232_CB649113955_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Sweaters")))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/gp/browse.html?node=23683595011&ref_=af_gw_top_quadcat_jan_w_cold_weather"
    }, "Shop cold-weather style")))), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-grid-6",
      "data-gwi": '{"visible":"desktop-grid-6-visible","active":"desktop-grid-6-active"}',
      "data-display-at": "smws",
      "data-order-ws": 7,
      className: "gw-col csm-placement-id-41ca2376-6584-4444-8055-77bc71dbbc98 desktop-gateway-atf_1ef21e1f-0871-4100-9c04-2f0ede026708 celwidget pd_rd_wg-NLYIU pd_rd_w-rU3G9 pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-order-sm": 8,
      "data-pf_rd_p": "41ca2376-6584-4444-8055-77bc71dbbc98",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "rU3G9",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-grid-6",
      "data-csa-c-content-id": "41ca2376-6584-4444-8055-77bc71dbbc98"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "QiMrr5q8agwqKFpXDyhxOg",
      className: "a-cardui fluid-quad-card fluid-card fluid-quad-image-label fluid-quad-image-label",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, "The going-out edit")), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-small grid-row-1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-0"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Dresses",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683578011&ref_=af_gw_top_quadcat_feb_w_date_night"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Dresses",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-OWI1ODEyOTct-w186._SY116_CB649487013_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-OWI1ODEyOTct-w372._SY232_CB649487013_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Dresses")))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-1"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Accessories",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683580011&ref_=af_gw_top_quadcat_feb_w_date_night"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Accessories",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-YmZlMTAwNzkt-w186._SY116_CB649487013_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-YmZlMTAwNzkt-w372._SY232_CB649487013_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Accessories"))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section grid-row-2"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-0"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Shoes",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683579011&ref_=af_gw_top_quadcat_feb_w_date_night"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Shoes",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-MzFmOGQwMDMt-w186._SY116_CB649487013_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-MzFmOGQwMDMt-w372._SY232_CB649487013_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Shoes")))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-1"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Handbags",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683581011&ref_=af_gw_top_quadcat_feb_w_date_night"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Handbags",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-MjQzOGRlZDQt-w186._SY116_CB649487013_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-MjQzOGRlZDQt-w372._SY232_CB649487013_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Handbags")))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/gp/browse.html?node=23683589011&ref_=af_gw_top_quadcat_feb_w_date_night"
    }, "Shop polished night-out looks")))), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-grid-7",
      "data-gwi": '{"visible":"desktop-grid-7-visible","active":"desktop-grid-7-active"}',
      "data-display-at": "smws",
      "data-order-ws": 8,
      className: "gw-col csm-placement-id-426c01b3-5429-4d46-b0eb-76646037662a desktop-gateway-atf_5242066a-a8cb-43f9-899b-842b40861441 celwidget pd_rd_wg-NLYIU pd_rd_w-va6iY pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-order-sm": 11,
      "data-pf_rd_p": "426c01b3-5429-4d46-b0eb-76646037662a",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "va6iY",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-grid-7",
      "data-csa-c-content-id": "426c01b3-5429-4d46-b0eb-76646037662a"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "l0QdSw4Cm-6y-xgwFHZNqQ",
      className: "a-cardui fluid-quad-card fluid-card fluid-quad-image-label fluid-quad-image-label",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, "Cool looks for warm places")), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-small grid-row-1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-0"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Swim",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683653011&ref_=af_gw_top_quadcat_jan_w_warm_weather_swim"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Swim",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-YzE5MTkwZDIt-w186._SY116_CB649114556_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-YzE5MTkwZDIt-w372._SY232_CB649114556_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Swim")))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-1"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Accessories",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683657011&ref_=af_gw_top_quadcat_jan_w_warm_weather_accessories"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Accessories",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-NDIxY2M4ZTAt-w186._SY116_CB649114556_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-NDIxY2M4ZTAt-w372._SY232_CB649114556_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Accessories"))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section grid-row-2"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-0"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Sandals",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683658011&ref_=af_gw_top_quadcat_jan_w_warm_weather_sandals"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Sandals",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-ZDhlYTAyMjEt-w186._SY116_CB649114556_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-ZDhlYTAyMjEt-w372._SY232_CB649114556_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Sandals")))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none quadrant-container quadrant-container-1"
    }, /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Dresses",
      className: "a-link-normal image-redirect aok-block image-window",
      href: "/gp/browse.html?node=23683655011&ref_=af_gw_top_quadcat_jan_w_warm_weather_dresses"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Dresses",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-NTM1OGZmMGMt-w186._SY116_CB649114556_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MGY0YzMzNTMt/MGY0YzMzNTMt-NTM1OGZmMGMt-w372._SY232_CB649114556_.jpg"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none image-label aok-inline-block aok-align-center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-small a-color-base truncate-2line"
    }, "Dresses")))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/gp/browse.html?node=23683596011&ref_=af_gw_top_quadcat_jan_w_warm_weather"
    }, "Shop sunny-day styles for her")))), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-grid-8",
      "data-gwi": '{"visible":"desktop-grid-8-visible","active":"desktop-grid-8-active"}',
      "data-display-at": "smws",
      "data-order-ws": 9,
      className: "gw-col csm-placement-id-3dfec35c-498e-4ab2-a5ba-a23c9f93cfbc desktop-gateway-atf_07351a04-695f-4934-847b-4531692b33aa celwidget pd_rd_wg-NLYIU pd_rd_w-KRQiE pd_rd_r-ef424740-4e33-406a-8942-03067c2c533a",
      "data-order-sm": 12,
      "data-pf_rd_p": "3dfec35c-498e-4ab2-a5ba-a23c9f93cfbc",
      "data-pd_rd_wg": "NLYIU",
      "data-pd_rd_w": "KRQiE",
      "data-pd_rd_r": "ef424740-4e33-406a-8942-03067c2c533a",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-grid-8",
      "data-csa-c-content-id": "3dfec35c-498e-4ab2-a5ba-a23c9f93cfbc"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "hIQolQHy8leGVhG3H4d3Vw",
      className: "a-cardui fluid-fat-image-link fluid-card fluid-fat-image-link",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, "4+ star dinner party picks")), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal center-image aok-block image-window",
      href: "/s?n=23703602011&s=featured-rank&ref_=dtech_gw_topcard_jan_cooking"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "4+ star dinner party picks",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2022/CML_Winter/Lifestyle/Gateway/Cat-Cards/CCML_WIN22_XGL_Cooking_CC_DT_1x._SY304_CB650501540_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2022/CML_Winter/Lifestyle/Gateway/Cat-Cards/CML_WIN22_XGL_Cooking_CC_DT_2x._SY608_CB650501540_.jpg"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/s?n=23703602011&s=featured-rank&ref_=dtech_gw_topcard_jan_cooking"
    }, "Shop all most-loved picks")))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "smws",
      "data-order-sm": 10,
      "data-order-ws": 10,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      "data-display-at": "sm",
      className: "gw-col celwidget",
      "data-order-sm": 13,
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": true,
      "data-csa-c-content-id": true
    }, /* @__PURE__ */ React.createElement("div", {
      id: "QH_ZhXyEOIEC4xmMwrAr8g",
      className: "a-cardui fluid-fat-image-link fluid-card fluid-fat-image-link",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, "New Year, now refresh")), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal center-image aok-block image-window",
      href: "/b?node=23702809011&ref_=dt_gw_topcard_jan_selfcare_nyny22"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "New Year, now refresh",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2022/NYNY/GW/SelfCare_GWCatCards_Mobile_379x304._SY304_CB649609875_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2022/NYNY/GW/selfcare_GW_Card_758x608._SY608_CB649708082_.jpg"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/b?node=23702809011&ref_=dt_gw_topcard_jan_selfcare_nyny22"
    }, "Shop self care"))))), /* @__PURE__ */ React.createElement("div", {
      id: "gw-content-grid",
      className: "a-section a-spacing-large"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "main-content",
      "data-grid-breakpoint": "ws",
      "data-flow-dir": "h",
      className: "a-section a-spacing-none gw-card-layout"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "desktop-1",
      "data-gwi": '{"visible":"desktop-1-visible","active":"desktop-1-active"}',
      "data-col-span-ws": 4,
      "data-col-span-sm": 3,
      "data-order-ws": 2,
      "data-order-sm": 2,
      "data-display-at": "smws",
      className: "gw-col desktop-row gwi-row gw-widget-instrument gw-auto-height csm-placement-id-3bf5435b-93cb-49d2-b27d-7b3b658d643b desktop-gateway-btf_1eda52e1-15ce-4919-ac4a-55bce85f2e9f celwidget pd_rd_wg-1jdyk pd_rd_w-8zRmn pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-pf_rd_p": "3bf5435b-93cb-49d2-b27d-7b3b658d643b",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "8zRmn",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-1",
      "data-csa-c-content-id": "3bf5435b-93cb-49d2-b27d-7b3b658d643b"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none ameyal-product-shoveler",
      id: "QuzMo8hwkXLdfQl4Kdw1Xw"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "073027d1-707a-4382-9ed6-d42fc8832842",
      className: "a-section a-spacing-none shogun-widget card-lite product-shoveler aui-desktop fresh-shoveler"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section as-title-block"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "as-title-block-left"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-color-secondary"
    }, "Shop gifts for kids 6 to 8"), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, "Shop gifts for kids 6 to 8")), /* @__PURE__ */ React.createElement("span", {
      className: "as-title-block-right"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, "Shop gifts for kids 6 to 8"), /* @__PURE__ */ React.createElement("span", {
      className: "as-title-divider"
    }, " | "), /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/gcx/-/gfhz/events/?categoryId=kgg-kid6&pd_rd_w=8zRmn&pf_rd_p=3bf5435b-93cb-49d2-b27d-7b3b658d643b&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk"
    }, "More toys for 6 to 8"))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none feed-carousel"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section feed-carousel-viewport"
    }, /* @__PURE__ */ React.createElement("ul", {
      className: "a-unordered-list a-nostyle a-horizontal feed-carousel-shelf",
      role: "list"
    }, /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B09BQYQFHC"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Skillmatics-STEM-Building-Toy-Educational/dp/B09BQYQFHC/?_encoding=UTF8&pd_rd_w=8zRmn&pf_rd_p=3bf5435b-93cb-49d2-b27d-7b3b658d643b&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Skillmatics STEM Building Toy : Buildables Dinosaur X Robot | Gifts for 10 Year Olds and Up | Fun Learning & Educational...",
      src: "https://m.media-amazon.com/images/I/81t08aEpjbL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/81t08aEpjbL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B0714716G2"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Skillmatics-Educational-Game-Space-Explorers/dp/B0714716G2/?_encoding=UTF8&pd_rd_w=8zRmn&pf_rd_p=3bf5435b-93cb-49d2-b27d-7b3b658d643b&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Skillmatics Educational Game : Space Explorers | Reusable Activity Mats with 2 Dry Erase Markers | Gifts & Learning...",
      src: "https://m.media-amazon.com/images/I/81+LLPFEaUL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/81+LLPFEaUL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B09BP138Y8"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Rainbow-High-Color-Change-Playset/dp/B09BP138Y8/?_encoding=UTF8&pd_rd_w=8zRmn&pf_rd_p=3bf5435b-93cb-49d2-b27d-7b3b658d643b&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Rainbow High Color Change Pool & Beach Playset : 7-in-1 Light-Up-Multicolor Changing Pool, Adjustable Umbrella, and Pool...",
      src: "https://m.media-amazon.com/images/I/8184w0dl7+L._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/8184w0dl7+L._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B08W2L3DFB"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Just-Play-Cocomelon-Building-Character/dp/B08W2L3DFB/?_encoding=UTF8&pd_rd_w=8zRmn&pf_rd_p=3bf5435b-93cb-49d2-b27d-7b3b658d643b&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "CoComelon Patch Academy, 53 Large Building Blocks Includes 6 Character Figures, by Just Play",
      src: "https://m.media-amazon.com/images/I/81KJGMBHmqS._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/81KJGMBHmqS._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B09BK9QY2Q"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/L-L-Surprise-Basketball-Surprises/dp/B09BK9QY2Q/?_encoding=UTF8&pd_rd_w=8zRmn&pf_rd_p=3bf5435b-93cb-49d2-b27d-7b3b658d643b&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "L.O.L. Surprise! All-Star B.B.s Sports Sparkly Basketball Series with 8 Surprises",
      src: "https://m.media-amazon.com/images/I/91-D9xzk3WL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/91-D9xzk3WL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B09BK98G7P"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/2-n-1-Surprise-Change-SurpriseTM-Surprises/dp/B09BK98G7P/?_encoding=UTF8&pd_rd_w=8zRmn&pf_rd_p=3bf5435b-93cb-49d2-b27d-7b3b658d643b&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "2-n-1 LOL Surprise Me & My Lil Sis Color Change Surprise\u2122 with 15 Surprises - Great Gift for Kids Ages 4+",
      src: "https://m.media-amazon.com/images/I/813SkFJlY9L._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/813SkFJlY9L._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B09BCPBS4K"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Surprise-Dance-Trading-Cards-Starter/dp/B09BCPBS4K/?_encoding=UTF8&pd_rd_w=8zRmn&pf_rd_p=3bf5435b-93cb-49d2-b27d-7b3b658d643b&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "LOL Surprise Dance Off Trading Cards Starter Set",
      src: "https://m.media-amazon.com/images/I/71mdk-U9omL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/71mdk-U9omL._AC_SY400_.jpg"
    }))))), /* @__PURE__ */ React.createElement("div", {
      className: "spinner",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "gw-spinner",
      role: "presentation"
    }))), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel previous slide",
      className: "a-link-normal feed-carousel-control feed-left",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel next slide",
      className: "a-link-normal feed-carousel-control feed-right",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-track"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-thumb"
    }))))))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "smws",
      "data-order-sm": 2,
      "data-order-ws": 2,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-2",
      "data-gwi": '{"visible":"desktop-2-visible","active":"desktop-2-active"}',
      "data-col-span-ws": 4,
      "data-col-span-sm": 3,
      "data-order-ws": 3,
      "data-order-sm": 3,
      "data-display-at": "smws",
      className: "gw-col desktop-row gwi-row gw-widget-instrument gw-auto-height csm-placement-id-026ef2b3-7e18-4cdd-a74f-53f22acf3b88 desktop-gateway-btf_b0ce5ada-d90b-4ca6-a17f-1b245460fdab celwidget pd_rd_wg-1jdyk pd_rd_w-El20S pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-pf_rd_p": "026ef2b3-7e18-4cdd-a74f-53f22acf3b88",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "El20S",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-2",
      "data-csa-c-content-id": "026ef2b3-7e18-4cdd-a74f-53f22acf3b88"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none ameyal-product-shoveler",
      id: "Gt0u2pBdNwUv8WwlYD5Sug"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "443d096c-ec78-4523-a138-d3f6151710c6",
      className: "a-section a-spacing-none shogun-widget card-lite product-shoveler aui-desktop fresh-shoveler"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section as-title-block"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "as-title-block-left"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-color-secondary"
    }, "Customers think they're dine-amite"), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, "Customers think they're dine-amite")), /* @__PURE__ */ React.createElement("span", {
      className: "as-title-block-right"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, "Customers think they're dine-amite"), /* @__PURE__ */ React.createElement("span", {
      className: "as-title-divider"
    }, " | "), /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/stores/page/9BEB45BF-40E9-4F00-B9CE-0CF425F0A935?ingress=0&visitId=ae76ab50-cc1b-4078-bc28-d17a073b9e8e&channel=discovbar%3Ffield-lbr_brands_browse-bin%3DAmazonBasics&ref_=nav_cs_amazonbasics_e625fdf6288e43d49a4983e612a8360d?ref_=APBGWQ1&pd_rd_w=El20S&pf_rd_p=026ef2b3-7e18-4cdd-a74f-53f22acf3b88&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk"
    }, "See more Amazon Basics"))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none feed-carousel"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section feed-carousel-viewport"
    }, /* @__PURE__ */ React.createElement("ul", {
      className: "a-unordered-list a-nostyle a-horizontal feed-carousel-shelf",
      role: "list"
    }, /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B0898C14F2"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/AmazonBasics-1-6-Quart-Tritan-Carafe-Lid/dp/B0898C14F2/?_encoding=UTF8&pd_rd_w=El20S&pf_rd_p=026ef2b3-7e18-4cdd-a74f-53f22acf3b88&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Amazon Basics 1.6-Quart Tritan Carafe with Lid",
      src: "https://m.media-amazon.com/images/I/717p86TLL0L._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/717p86TLL0L._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B089J23LMD"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/AmazonBasics-10-Piece-Mixing-Bowl-Lids/dp/B089J23LMD/?_encoding=UTF8&pd_rd_w=El20S&pf_rd_p=026ef2b3-7e18-4cdd-a74f-53f22acf3b88&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Amazon Basics 10-Piece Mixing Bowl Set with Lids - Non-Slip Base, Red Rose Floral",
      src: "https://m.media-amazon.com/images/I/915Sfl8PYuL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/915Sfl8PYuL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B0898926TX"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/AmazonBasics-12-Piece-Melamine-Dinnerware-Set/dp/B0898926TX/?_encoding=UTF8&pd_rd_w=El20S&pf_rd_p=026ef2b3-7e18-4cdd-a74f-53f22acf3b88&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Amazon Basics 12-Piece Melamine Dinnerware Set - Service for 4, Traditional Decorated",
      src: "https://m.media-amazon.com/images/I/91FnBjGCbIL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/91FnBjGCbIL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B0898B96KB"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/AmazonBasics-13-8-Inch-Melamine-Serving-Utensils/dp/B0898B96KB/?_encoding=UTF8&pd_rd_w=El20S&pf_rd_p=026ef2b3-7e18-4cdd-a74f-53f22acf3b88&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Amazon Basics Large 13.8-Inch Melamine Salad Serving Bowl and Utensils - Acacia Wood Matte Texture",
      src: "https://m.media-amazon.com/images/I/81p8kFYN8+L._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/81p8kFYN8+L._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B07NWZHTN9"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/AmazonBasics-18-Piece-Stoneware-Dinnerware-Set/dp/B07NWZHTN9/?_encoding=UTF8&pd_rd_w=El20S&pf_rd_p=026ef2b3-7e18-4cdd-a74f-53f22acf3b88&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Amazon Basics 18-Piece Stoneware Dinnerware Set - Royal Blue, Service for 6",
      src: "https://m.media-amazon.com/images/I/612Q8SRhZvL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/612Q8SRhZvL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B07VGFS56H"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/AmazonBasics-Premium-Enameled-5-Quart-Cranberry/dp/B07VGFS56H/?_encoding=UTF8&pd_rd_w=El20S&pf_rd_p=026ef2b3-7e18-4cdd-a74f-53f22acf3b88&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Amazon Basics Enameled Cast Iron Round Dutch Oven, 5-Quart, Deep Cranberry",
      src: "https://m.media-amazon.com/images/I/81qM0C2OvVL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/81qM0C2OvVL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B08989DBZQ"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Amazon-Basics-Shatterproof-1-6-Quart-Pitcher/dp/B08989DBZQ/?_encoding=UTF8&pd_rd_w=El20S&pf_rd_p=026ef2b3-7e18-4cdd-a74f-53f22acf3b88&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Amazon Basics Shatterproof 1.6-Quart Pitcher with 4 Nesting Cups - Tritan Plastic, BPA-free",
      src: "https://m.media-amazon.com/images/I/71VkslXO-fL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/71VkslXO-fL._AC_SY400_.jpg"
    }))))), /* @__PURE__ */ React.createElement("div", {
      className: "spinner",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "gw-spinner",
      role: "presentation"
    }))), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel previous slide",
      className: "a-link-normal feed-carousel-control feed-left",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel next slide",
      className: "a-link-normal feed-carousel-control feed-right",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-track"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-thumb"
    }))))))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "smws",
      "data-order-sm": 3,
      "data-order-ws": 3,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-btf-grid-1",
      "data-gwi": '{"visible":"desktop-btf-grid-1-visible","active":"desktop-btf-grid-1-active"}',
      "data-display-at": "smws",
      "data-order-ws": 4,
      className: "gw-col csm-placement-id-9720bc28-1956-4217-9f91-46592bfc0c8e desktop-gateway-btf_8dadbe53-48be-4033-ac2c-8344f3fca983 celwidget pd_rd_wg-1jdyk pd_rd_w-uUrxr pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-order-sm": 4,
      "data-pf_rd_p": "9720bc28-1956-4217-9f91-46592bfc0c8e",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "uUrxr",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_HBGG",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-btf-grid-1",
      "data-csa-c-content-id": "9720bc28-1956-4217-9f91-46592bfc0c8e"
    }, /* @__PURE__ */ React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: "._quad-multi-asin-card-v2_style_quadrant__3xH-V{-webkit-box-orient:vertical;-webkit-box-direction:normal;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:50%;position:relative;width:50%}._quad-multi-asin-card-v2_style_topLeftQuadrant__yF7Ht{padding:0 3px 3px 0}._quad-multi-asin-card-v2_style_topRightQuadrant__2rEJ7{padding:0 0 3px 3px}._quad-multi-asin-card-v2_style_bottomLeftQuadrant__2r-kp{padding:3px 3px 0 0}._quad-multi-asin-card-v2_style_bottomRightQuadrant__2OYLZ{padding:3px 0 0 3px}._quad-multi-asin-card-v2_style_cardBodyNoFooter__2ZUai{margin-bottom:0!important;padding-bottom:0!important}._quad-multi-asin-card-v2_style_quadrantContainer__1hEF5{height:100%}._quad-multi-asin-card-v2_style_priceBlock__1fLAn{height:35px;line-height:36px;overflow:hidden}._quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm{-webkit-box-flex:1;-ms-flex:1;flex:1;min-height:85px}@supports ((-o-object-fit:contain) or (object-fit:contain)){._quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm img{height:100%;-o-object-fit:contain;object-fit:contain;width:100%}}"
      }
    }), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui fluid-card quad-multi-asin-card-v2",
      "data-a-card-type": "basic",
      id: "16k1kNrj4LyirGRJJLDhIQ"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 2,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "2.6em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "New Year, now you"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-base aok-clearfix _quad-multi-asin-card-v2_style_quadrantContainer__1hEF5"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topLeftQuadrant__yF7Ht a-text-normal",
      href: "/LOreal-Paris-Revitalift-Niacinamide-Dermatologist/dp/B099X8PVFL/?_encoding=UTF8&pd_rd_w=uUrxr&pf_rd_p=9720bc28-1956-4217-9f91-46592bfc0c8e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_HBGG"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/81FxCkzOFaL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/81FxCkzOFaL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "L'Oreal Paris Revitalift Pressed Night Cream with Retinol, Niacinamide, Visibly Reduce Wrinkles, Hydrate for Face, Under..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topRightQuadrant__2rEJ7 a-text-normal",
      href: "/Colgate-Electric-Toothbrush-Rechargeable-Replacement/dp/B089FBPFHS/?_encoding=UTF8&pd_rd_w=uUrxr&pf_rd_p=9720bc28-1956-4217-9f91-46592bfc0c8e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_HBGG"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/51c8gTu37wL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/51c8gTu37wL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "hum by Colgate Smart Electric Toothbrush Kit, Rechargeable Sonic Toothbrush with Travel Case & Bonus Replacement Brush..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomLeftQuadrant__2r-kp a-text-normal",
      href: "/Fitbit-Advanced-Smartwatch-Management-Temperature/dp/B08DFLG5SP/?_encoding=UTF8&pd_rd_w=uUrxr&pf_rd_p=9720bc28-1956-4217-9f91-46592bfc0c8e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_HBGG"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/71G5Dz-lUDL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/71G5Dz-lUDL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management & Skin Temperature Trends, White/Gold,..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomRightQuadrant__2OYLZ a-text-normal",
      href: "/Orgain-Organic-Protein-Powder-Vanilla/dp/B00J074W7Q/?_encoding=UTF8&pd_rd_w=uUrxr&pf_rd_p=9720bc28-1956-4217-9f91-46592bfc0c8e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_HBGG"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/71KshkxukgL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/71KshkxukgL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Orgain Organic Plant Based Protein Powder, Vanilla Bean - 21g of Protein, Vegan, Low Net Carbs, Gluten Free, Lactose..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more footerLink",
      href: "/gcx/Beauty-Gift-Guide/gfhz/events/ref=s9_acss_bw_cg_TBD_3a1_w/?_encoding=UTF8&categoryId=BGG-HOL-Hub&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-6&pf_rd_t=101&pf_rd_i=3760911&pd_rd_w=uUrxr&pf_rd_p=9720bc28-1956-4217-9f91-46592bfc0c8e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_HBGG"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Shop beauty & wellness"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-btf-grid-2",
      "data-gwi": '{"visible":"desktop-btf-grid-2-visible","active":"desktop-btf-grid-2-active"}',
      "data-display-at": "smws",
      "data-order-ws": 4,
      className: "gw-col csm-placement-id-508bfc24-a31c-44b4-a6d9-e67184c9e174 desktop-gateway-btf_503eb26a-b511-4429-bdc8-dac53310de95 celwidget pd_rd_wg-1jdyk pd_rd_w-wkXeZ pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-order-sm": 4,
      "data-pf_rd_p": "508bfc24-a31c-44b4-a6d9-e67184c9e174",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "wkXeZ",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-btf-grid-2",
      "data-csa-c-content-id": "508bfc24-a31c-44b4-a6d9-e67184c9e174"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "wUe4aSsFWRwNo7wqKGu6eQ",
      className: "a-cardui fluid-fat-image-link fluid-card fluid-fat-image-link",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, "LEGO for adult builders")), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal center-image aok-block image-window",
      href: "/s?k=LEGO+for+adults&rh=p_n_age_range%3A5442388011&dc&qid=1607045647&rnid=165794011"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "LEGOs for adult builders",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2020/img/Toys_Internet/XCM_CUTTLE_1296146_1514218_US_3588001_379x304_1X_en_US._SY304_CB414709249_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2020/img/Toys_Internet/XCM_CUTTLE_1296146_1514218_US_3588001_758x608_2X_en_US._SY608_CB414709249_.jpg"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/s?k=LEGO+for+adults&rh=p_n_age_range%3A5442388011&dc&qid=1607045647&rnid=165794011"
    }, "Shop more LEGO sets")))), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-btf-grid-3",
      "data-gwi": '{"visible":"desktop-btf-grid-3-visible","active":"desktop-btf-grid-3-active"}',
      "data-display-at": "smws",
      "data-order-ws": 4,
      className: "gw-col csm-placement-id-20f4bb89-9629-4ad4-a60b-217d3df5379e desktop-gateway-btf_b1c0c871-67e4-4485-b15e-653a886d8431 celwidget pd_rd_wg-1jdyk pd_rd_w-iCe97 pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-order-sm": 4,
      "data-pf_rd_p": "20f4bb89-9629-4ad4-a60b-217d3df5379e",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "iCe97",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_test_reftag",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-btf-grid-3",
      "data-csa-c-content-id": "20f4bb89-9629-4ad4-a60b-217d3df5379e"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui fluid-card quad-multi-asin-card-v2",
      "data-a-card-type": "basic",
      id: "QQiIdthPhnoFn-l3uMdYNQ"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 2,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "2.6em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Valentine's Day gifts"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-base aok-clearfix _quad-multi-asin-card-v2_style_quadrantContainer__1hEF5"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topLeftQuadrant__yF7Ht a-text-normal",
      href: "/Bedsure-Heated-Blanket-Throw-Electric/dp/B08CY5KKFX/?_encoding=UTF8&pd_rd_w=iCe97&pf_rd_p=20f4bb89-9629-4ad4-a60b-217d3df5379e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/71pIUaYH-NL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/71pIUaYH-NL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Bedsure Heated Blanket Electric Throw - Soft Electric Blanket for Couch, 5 Heat Settings Fleece Blanket with 3hrs Timer..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topRightQuadrant__2rEJ7 a-text-normal",
      href: "/BonNoces-Portable-Electric-Kettle-Stainless/dp/B07JHKPF57/?_encoding=UTF8&pd_rd_w=iCe97&pf_rd_p=20f4bb89-9629-4ad4-a60b-217d3df5379e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/51kfiWcUBcL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/51kfiWcUBcL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "BonNoces Portable Electric Kettle - 0.5L Small Stainless Steel Travel Kettle - Quiet Fast Boil & Cool Touch - Perfect..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomLeftQuadrant__2r-kp a-text-normal",
      href: "/FaceTory-Portable-Beauty-Fridge-Capacity/dp/B07THDQXF8/?_encoding=UTF8&pd_rd_w=iCe97&pf_rd_p=20f4bb89-9629-4ad4-a60b-217d3df5379e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/51kUvVTRBqL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/51kUvVTRBqL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "FaceTory Portable Coral Beauty Fridge (10-L / 12 Can) with Heat and Cool Capacity"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomRightQuadrant__2OYLZ a-text-normal",
      href: "/Ceramic-Decorative-Bracelet-Earrings-Engagement/dp/B08L6LLZQ2/?_encoding=UTF8&pd_rd_w=iCe97&pf_rd_p=20f4bb89-9629-4ad4-a60b-217d3df5379e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/41SSNPAnGIL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/41SSNPAnGIL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Heart Ring Dish Ring Holder White & Decorative Gold | Ring, Bracelet, Jewelry, Trinket Tray/Dish | Wedding Ring,..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more footerLink",
      href: "/gcx/Home-&-D%C3%A9cor/gfhz/events/?_encoding=UTF8&canBeEGifted=false&canBeGiftWrapped=false&categoryId=HGG-cat-1&isLimitedTimeOffer=false&isPrime=false&subcategoryIds=HGG-cat-1%3AGifts&pd_rd_w=iCe97&pf_rd_p=20f4bb89-9629-4ad4-a60b-217d3df5379e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Explore gift ideas"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "sm",
      "data-order-sm": 4,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-btf-grid-4",
      "data-gwi": '{"visible":"desktop-btf-grid-4-visible","active":"desktop-btf-grid-4-active"}',
      "data-display-at": "smws",
      "data-order-ws": 4,
      className: "gw-col csm-placement-id-a4115fa9-8b4d-4824-8e3e-5ebec5c5ddc8 desktop-gateway-btf_164c2d17-ea68-48df-a5a2-51c3a3ba5ea3 celwidget pd_rd_wg-1jdyk pd_rd_w-PbHT0 pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-order-sm": 9,
      "data-pf_rd_p": "a4115fa9-8b4d-4824-8e3e-5ebec5c5ddc8",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "PbHT0",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_test_reftag",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-btf-grid-4",
      "data-csa-c-content-id": "a4115fa9-8b4d-4824-8e3e-5ebec5c5ddc8"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui fluid-card quad-multi-asin-card-v2",
      "data-a-card-type": "basic",
      id: "k6AguwuOBnCdywp4fn70Dg"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 2,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "2.6em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Spread the love"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-base aok-clearfix _quad-multi-asin-card-v2_style_quadrantContainer__1hEF5"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topLeftQuadrant__yF7Ht a-text-normal",
      href: "/Silverware-FAMEWARE-Stainless-Set%EF%BC%8CService-Tableware-Dishwasher/dp/B08QJPV6BR/?_encoding=UTF8&pd_rd_w=PbHT0&pf_rd_p=a4115fa9-8b4d-4824-8e3e-5ebec5c5ddc8&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/61jQN2K4XwS._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/61jQN2K4XwS._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Matte Red Gold Silverware Set 30 Pieces, FAMEWARE Stainless Steel Flatware Set\uFF0CService for 6\uFF0CKitchen Utensil Set,..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topRightQuadrant__2rEJ7 a-text-normal",
      href: "/FE-Casserole-Ceramic-Emboss-Bakeware/dp/B08F532NTG/?_encoding=UTF8&pd_rd_w=PbHT0&pf_rd_p=a4115fa9-8b4d-4824-8e3e-5ebec5c5ddc8&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/61Hqnm5HfxL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/61Hqnm5HfxL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "FE Casserole Dish, 2 Quart Round Ceramic Bakeware with Cover, Lace Emboss Baking Dish for Dinner, Banquet and Party (Red)"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomLeftQuadrant__2r-kp a-text-normal",
      href: "/GreenLife-Healthy-Ceramic-Cook-Cooker/dp/B0997KJ2YM/?_encoding=UTF8&pd_rd_w=PbHT0&pf_rd_p=a4115fa9-8b4d-4824-8e3e-5ebec5c5ddc8&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/612lm6HuBDS._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/612lm6HuBDS._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "GreenLife Healthy Ceramic Cook Duo Soft Pink Slow Cooker, 6QT"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomRightQuadrant__2OYLZ a-text-normal",
      href: "/Euro-Cuisine-WM520-Friendly-Shaped/dp/B005LJYMPE/?_encoding=UTF8&pd_rd_w=PbHT0&pf_rd_p=a4115fa9-8b4d-4824-8e3e-5ebec5c5ddc8&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/61ESKHIVTJL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/61ESKHIVTJL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Euro Cuisine WM520 Eco Friendly Heart Shaped Waffle Maker - PTFE and PFOA Free Non Stick Plates,Silver"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more footerLink",
      href: "/gcx/Home-&-D%C3%A9cor/gfhz/events/?_encoding=UTF8&canBeEGifted=false&canBeGiftWrapped=false&categoryId=HGG-cat-1&isLimitedTimeOffer=false&isPrime=false&subcategoryIds=HGG-cat-1%3Akitchen&pd_rd_w=PbHT0&pf_rd_p=a4115fa9-8b4d-4824-8e3e-5ebec5c5ddc8&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Shop more kitchen products"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "ws",
      "data-order-ws": 4,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-3",
      "data-gwi": '{"visible":"desktop-3-visible","active":"desktop-3-active"}',
      "data-col-span-ws": 4,
      "data-col-span-sm": 3,
      "data-order-ws": 5,
      "data-order-sm": 5,
      "data-display-at": "smws",
      className: "gw-col desktop-row gwi-row gw-widget-instrument gw-auto-height csm-placement-id-d67eed07-045b-4cbc-a320-591d2c5cd436 desktop-gateway-btf_c7a39a33-5864-4f9d-8a3f-66ff82064a0f celwidget pd_rd_wg-1jdyk pd_rd_w-hEPig pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-pf_rd_p": "d67eed07-045b-4cbc-a320-591d2c5cd436",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "hEPig",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-3",
      "data-csa-c-content-id": "d67eed07-045b-4cbc-a320-591d2c5cd436"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none ameyal-product-shoveler",
      id: "ARMmGwnCFGFsQ1NMuTDvpg"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "f951897d-d684-40e2-ba95-2fe42570dba7",
      className: "a-section a-spacing-none shogun-widget card-lite product-shoveler aui-desktop fresh-shoveler"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section as-title-block"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "as-title-block-left"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-color-secondary"
    }, "New year, more savings"), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, "New year, more savings")), /* @__PURE__ */ React.createElement("span", {
      className: "as-title-block-right"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, "See more in Outlet"), /* @__PURE__ */ React.createElement("span", {
      className: "as-title-divider"
    }, " | "), /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/b/ref=OUT_NYNY_DS_D_EN_US?node=23443980011&pd_rd_w=hEPig&pf_rd_p=d67eed07-045b-4cbc-a320-591d2c5cd436&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk"
    }, "See more in Outlet"))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none feed-carousel"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section feed-carousel-viewport"
    }, /* @__PURE__ */ React.createElement("ul", {
      className: "a-unordered-list a-nostyle a-horizontal feed-carousel-shelf",
      role: "list"
    }, /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B08ZCBBNHH"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/KMEIVOL-Apothecary-Bathroom-Organizer-Canisters/dp/B08ZCBBNHH/?_encoding=UTF8&pd_rd_w=hEPig&pf_rd_p=d67eed07-045b-4cbc-a320-591d2c5cd436&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "KMEIVOL Qtip Holder, 2 Pack Apothecary Jars, Acrylic Cotton Ball Holder, Clear Bathroom Organizer, Bathroom Canisters...",
      src: "https://m.media-amazon.com/images/I/81yejAdc0LL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/81yejAdc0LL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B08RYKC6R6"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Anvin-Weighted-Cordless-Adjustable-Beginners/dp/B08RYKC6R6/?_encoding=UTF8&pd_rd_w=hEPig&pf_rd_p=d67eed07-045b-4cbc-a320-591d2c5cd436&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Anvin [Double Weighted] Cordless Jump Rope Indoor, Ropeless Jump Rope Only Handles MBF Beach Body Bod Ropes No Line...",
      src: "https://m.media-amazon.com/images/I/71EcOyXJ60S._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/71EcOyXJ60S._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B08DVYMJTW"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/BELLA-Double-Cooker-Boiler-Poacher/dp/B08DVYMJTW/?_encoding=UTF8&pd_rd_w=hEPig&pf_rd_p=d67eed07-045b-4cbc-a320-591d2c5cd436&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "BELLA Double Tier Egg Cooker, Boiler, Rapid Maker & Poacher, Meal Prep for Week, Family Sized Meals: Up To 12 Large...",
      src: "https://m.media-amazon.com/images/I/71VP4-mKUGL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/71VP4-mKUGL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B08TGKC75W"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Lucalda-Counter-Tempered-Compatible-Capacity/dp/B08TGKC75W/?_encoding=UTF8&pd_rd_w=hEPig&pf_rd_p=d67eed07-045b-4cbc-a320-591d2c5cd436&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "K Cup Storage Drawer, LUCALDA K Cup Organizer for 36 Keurig Pods Crystal Tempered Glass Coffee Pod Holder, coffee maker...",
      src: "https://m.media-amazon.com/images/I/71LD7UoySGL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/71LD7UoySGL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B08MQ7KLMT"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Headband-Buttons-Double-layer-Earmuff-Hairband/dp/B08MQ7KLMT/?_encoding=UTF8&pd_rd_w=hEPig&pf_rd_p=d67eed07-045b-4cbc-a320-591d2c5cd436&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Winter Ear Warmer Headband with Buttons Double-layer Fleece Earmuff Headband Warm Earband Sports Hairband for Women Men",
      src: "https://m.media-amazon.com/images/I/81PjbKBk2zL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/81PjbKBk2zL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B092M6PDJL"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Container-Organization-Containers-Canisters-Spaghetti/dp/B092M6PDJL/?_encoding=UTF8&pd_rd_w=hEPig&pf_rd_p=d67eed07-045b-4cbc-a320-591d2c5cd436&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Airtight Extra Large Food Storage Container Set, 4Pcs Kitchen & Pantry Organization Containers, BPA Free Clear Plastic...",
      src: "https://m.media-amazon.com/images/I/71KX-C5kfcL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/71KX-C5kfcL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B09B47QKMM"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Cotton-Organizer-Compartment-Organization-Bathrooms/dp/B09B47QKMM/?_encoding=UTF8&pd_rd_w=hEPig&pf_rd_p=d67eed07-045b-4cbc-a320-591d2c5cd436&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Cotton Swab and Q-tip Organizer, 3 Compartment, Easy Organization for Bathrooms, Vanity Tables or Under The Sink",
      src: "https://m.media-amazon.com/images/I/41LdMd0ViUL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/41LdMd0ViUL._AC_SY400_.jpg"
    }))))), /* @__PURE__ */ React.createElement("div", {
      className: "spinner",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "gw-spinner",
      role: "presentation"
    }))), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel previous slide",
      className: "a-link-normal feed-carousel-control feed-left",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel next slide",
      className: "a-link-normal feed-carousel-control feed-right",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-track"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-thumb"
    }))))))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "smws",
      "data-order-sm": 5,
      "data-order-ws": 5,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-editorial",
      "data-gwi": '{"visible":"desktop-editorial-visible","active":"desktop-editorial-active"}',
      "data-col-span-ws": 4,
      "data-col-span-sm": 3,
      "data-order-ws": 6,
      "data-order-sm": 6,
      "data-display-at": "smws",
      className: "gw-col desktop-row gwi-row gw-widget-instrument gw-auto-height csm-placement-id-eedf0146-16b5-4e35-8ce9-d759f1b0f45a desktop-gateway-btf_abf04854-e9f2-43b8-bca2-a3361ee63577 celwidget pd_rd_wg-1jdyk pd_rd_w-qbsOf pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-pf_rd_p": "eedf0146-16b5-4e35-8ce9-d759f1b0f45a",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "qbsOf",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-editorial",
      "data-csa-c-content-id": "eedf0146-16b5-4e35-8ce9-d759f1b0f45a"
    }, /* @__PURE__ */ React.createElement("link", {
      rel: "stylesheet",
      href: "https://images-na.ssl-images-amazon.com/images/I/010rvoEcCnL.css?AUIClients/ShareWidgetTriggerAssets"
    }), /* @__PURE__ */ React.createElement("link", {
      rel: "stylesheet",
      href: "https://images-na.ssl-images-amazon.com/images/I/01KrVAe0PrL.css?AUIClients/HuddlesChatboxJS"
    }), /* @__PURE__ */ React.createElement("link", {
      rel: "stylesheet",
      type: "text/css",
      href: "https://m.media-amazon.com/images/I/71vrUosIGhL.css"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "live-flagship-root",
      className: "amazonlive-widget-padding"
    })), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "smws",
      "data-order-sm": 6,
      "data-order-ws": 6,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-4",
      "data-gwi": '{"visible":"desktop-4-visible","active":"desktop-4-active"}',
      "data-col-span-ws": 4,
      "data-col-span-sm": 3,
      "data-order-ws": 7,
      "data-order-sm": 7,
      "data-display-at": "smws",
      className: "gw-col desktop-row gwi-row gw-widget-instrument gw-auto-height csm-placement-id-fa967f32-0534-46ee-85f3-f2064175f6fb desktop-gateway-btf_hfs-everyday3-fp.HOME celwidget pd_rd_wg-1jdyk pd_rd_w-QDa2J pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-pf_rd_p": "fa967f32-0534-46ee-85f3-f2064175f6fb",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "QDa2J",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_trq_ed_nk54dx6o",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-4",
      "data-csa-c-content-id": "fa967f32-0534-46ee-85f3-f2064175f6fb"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none ameyal-product-shoveler",
      id: "PqIWpx3pVZMMqlEjbglKfg"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "5eebaba7-8933-474c-81a1-4928eeed0918",
      className: "a-section a-spacing-none shogun-widget card-lite product-shoveler aui-desktop fresh-shoveler"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section as-title-block"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "as-title-block-left"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, "Explore everyday essentials")), /* @__PURE__ */ React.createElement("span", {
      className: "as-title-block-right"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none feed-carousel"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section feed-carousel-viewport"
    }, /* @__PURE__ */ React.createElement("ul", {
      className: "a-unordered-list a-nostyle a-horizontal feed-carousel-shelf",
      role: "list"
    }, /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B08MW2ZK59"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Rose-Disposable-Protectors-Breathable-Non-woven/dp/B08MW2ZK59/?_encoding=UTF8&pd_rd_w=QDa2J&pf_rd_p=fa967f32-0534-46ee-85f3-f2064175f6fb&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_trq_ed_nk54dx6o"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Dusty Rose 50 Pcs Disposable Face Masks, Facial Mouth Cover, 3 Ply Protectors with Elastic Earloops, Breathable...",
      src: "https://m.media-amazon.com/images/I/810g1QJivCL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/810g1QJivCL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B087D55WK2"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Tenmiro-Ultra-Long-Flexible-Changing-Decoration/dp/B087D55WK2/?_encoding=UTF8&pd_rd_w=QDa2J&pf_rd_p=fa967f32-0534-46ee-85f3-f2064175f6fb&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_trq_ed_nk54dx6o"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Tenmiro 65.6ft Led Strip Lights, Ultra Long RGB 5050 Color Changing LED Light Strips Kit with 44 Keys Ir Remote Led...",
      src: "https://m.media-amazon.com/images/I/81scThz4msL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/81scThz4msL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B01LLSNG1E"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Twinkle-Window-Curtain-String-Light/dp/B01LLSNG1E/?_encoding=UTF8&pd_rd_w=QDa2J&pf_rd_p=fa967f32-0534-46ee-85f3-f2064175f6fb&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_trq_ed_nk54dx6o"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Twinkle Star 300 LED Window Curtain String Light Wedding Party Home Garden Bedroom Outdoor Indoor Wall Decorations, Warm...",
      src: "https://m.media-amazon.com/images/I/81SeihZDOGL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/81SeihZDOGL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B01LYNW421"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Beckham-Hotel-Collection-Pillow-2-Pack/dp/B01LYNW421/?_encoding=UTF8&pd_rd_w=QDa2J&pf_rd_p=fa967f32-0534-46ee-85f3-f2064175f6fb&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_trq_ed_nk54dx6o"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Beckham Hotel Collection Bed Pillows for Sleeping - Queen Size, Set of 2 - Cooling, Luxury Gel Pillow for Back, Stomach...",
      src: "https://m.media-amazon.com/images/I/61nd7wq+CtL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/61nd7wq+CtL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B07JP5375R"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/MINGER-Changing-Lighting-Flexible-Decoration/dp/B07JP5375R/?_encoding=UTF8&pd_rd_w=QDa2J&pf_rd_p=fa967f32-0534-46ee-85f3-f2064175f6fb&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_trq_ed_nk54dx6o"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "MINGER LED Strip Lights 16.4ft, RGB Color Changing LED Lights for Home, Kitchen, Room, Bedroom, Dorm Room, Bar, with IR...",
      src: "https://m.media-amazon.com/images/I/71OW3NS4f6S._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/71OW3NS4f6S._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B01N20YR6B"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/rabbitgoo-Privacy-Rainbow-Decorative-Non-Adhesive/dp/B01N20YR6B/?_encoding=UTF8&pd_rd_w=QDa2J&pf_rd_p=fa967f32-0534-46ee-85f3-f2064175f6fb&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_trq_ed_nk54dx6o"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "rabbitgoo Window Privacy Film, Rainbow Window Clings, 3D Decorative Window Vinyl, Stained Glass Window Decals, Static...",
      src: "https://m.media-amazon.com/images/I/81WwqXfaMTL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/81WwqXfaMTL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B06XFYGRX7"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Premium-Stackable-Cosmetic-Organizer-Collection/dp/B06XFYGRX7/?_encoding=UTF8&pd_rd_w=QDa2J&pf_rd_p=fa967f32-0534-46ee-85f3-f2064175f6fb&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_trq_ed_nk54dx6o"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: 'STORi Audrey Stackable Cosmetic Organizer Drawers 4-1/2" Tall | set of 2 Clear',
      src: "https://m.media-amazon.com/images/I/61egZZgcE3L._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/61egZZgcE3L._AC_SY400_.jpg"
    }))))), /* @__PURE__ */ React.createElement("div", {
      className: "spinner",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "gw-spinner",
      role: "presentation"
    }))), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel previous slide",
      className: "a-link-normal feed-carousel-control feed-left",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel next slide",
      className: "a-link-normal feed-carousel-control feed-right",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-track"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-thumb"
    }))))))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "smws",
      "data-order-sm": 7,
      "data-order-ws": 7,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-btf-grid-5",
      "data-gwi": '{"visible":"desktop-btf-grid-5-visible","active":"desktop-btf-grid-5-active"}',
      "data-display-at": "smws",
      "data-order-ws": 9,
      className: "gw-col csm-placement-id-cb1f4a65-35cc-4908-bf14-a1c88d1535ce desktop-gateway-btf_89e3198d-d85a-4d02-a2e5-327b87a227fd celwidget pd_rd_wg-1jdyk pd_rd_w-7DnCl pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-order-sm": 9,
      "data-pf_rd_p": "cb1f4a65-35cc-4908-bf14-a1c88d1535ce",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "7DnCl",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-btf-grid-5",
      "data-csa-c-content-id": "cb1f4a65-35cc-4908-bf14-a1c88d1535ce"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "OQOzh1_N-mctglJ6XiM73g",
      className: "a-cardui fluid-fat-image-link fluid-card fluid-fat-image-link",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, 'Watch "The Wheel of Time" Season 1')), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal center-image aok-block image-window",
      href: "/gp/video/detail/B09F5WS2B5/ref=dvm_us_or_cs_tile_all_21WOFTFN"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Rosamund Pike stars in the epic fantasy The Wheel of Time",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/digital/video/merch/TV/WOFT_S1_DashboardCard_379x304_POST_Final_en-US_PVD7859._SY304_CB653408080_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/digital/video/merch/TV/WOFT_S1_DashboardCard_758x608_POST_Final_en-US_PVD7859._SY608_CB653408080_.jpg"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/gp/video/detail/B09F5WS2B5/ref=dvm_us_or_cs_tile_all_21WOFTFN"
    }, "Now on Prime Video")))), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-btf-grid-6",
      "data-gwi": '{"visible":"desktop-btf-grid-6-visible","active":"desktop-btf-grid-6-active"}',
      "data-display-at": "smws",
      "data-order-ws": 9,
      className: "gw-col csm-placement-id-48038ec7-152a-4fe2-a4e8-ca46b993ba90 desktop-gateway-btf_02c25f19-e9c8-460a-9c27-21a82ef75db0 celwidget pd_rd_wg-1jdyk pd_rd_w-PY9D6 pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-order-sm": 9,
      "data-pf_rd_p": "48038ec7-152a-4fe2-a4e8-ca46b993ba90",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "PY9D6",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_test_reftag",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-btf-grid-6",
      "data-csa-c-content-id": "48038ec7-152a-4fe2-a4e8-ca46b993ba90"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui fluid-card quad-multi-asin-card-v2",
      "data-a-card-type": "basic",
      id: "K5rmLkgDJ0_VpQThgYpujg"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 2,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "2.6em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Cook dinner with ease"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-base aok-clearfix _quad-multi-asin-card-v2_style_quadrantContainer__1hEF5"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topLeftQuadrant__yF7Ht a-text-normal",
      href: "/Mr-Coffee-Reusable-Tumbler-Filter/dp/B08L72KXG8/?_encoding=UTF8&pd_rd_w=PY9D6&pf_rd_p=48038ec7-152a-4fe2-a4e8-ca46b993ba90&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/71tAhs31yES._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/71tAhs31yES._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Mr. Coffee\xAE Iced\u2122 Coffee Maker with Reusable Tumbler and Coffee Filter, Black"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topRightQuadrant__2rEJ7 a-text-normal",
      href: "/Presto-22-inch-Electric-Griddle-Removable/dp/B005FYF3OY/?_encoding=UTF8&pd_rd_w=PY9D6&pf_rd_p=48038ec7-152a-4fe2-a4e8-ca46b993ba90&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/61hqjITqd5L._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/61hqjITqd5L._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Presto 07061 22-inch Electric Griddle With Removable Handles, Black, 22-inch"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomLeftQuadrant__2r-kp a-text-normal",
      href: "/Breville-BHM800SIL-Hand-Mixer-Silver/dp/B00XBOXUWC/?_encoding=UTF8&pd_rd_w=PY9D6&pf_rd_p=48038ec7-152a-4fe2-a4e8-ca46b993ba90&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/71ZOjf2YelL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/71ZOjf2YelL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Breville BHM800SIL Handy Mix Scraper Hand Mixer, Silver"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomRightQuadrant__2OYLZ a-text-normal",
      href: "/Instant-Pot-Multi-Use-Programmable-Pressure/dp/B00FLYWNYQ/?_encoding=UTF8&pd_rd_w=PY9D6&pf_rd_p=48038ec7-152a-4fe2-a4e8-ca46b993ba90&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/71WtwEvYDOS._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/71WtwEvYDOS._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Instant Pot Duo 7-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Saut\xE9, Yogurt Maker, Warmer &..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more footerLink",
      href: "/gcx/-/gfhz/events/?_encoding=UTF8&categoryId=HGG-cat-2&pd_rd_w=PY9D6&pf_rd_p=48038ec7-152a-4fe2-a4e8-ca46b993ba90&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_reftag"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Shop kitchen essentials"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "sm",
      "data-order-sm": 9,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-btf-grid-7",
      "data-gwi": '{"visible":"desktop-btf-grid-7-visible","active":"desktop-btf-grid-7-active"}',
      "data-display-at": "smws",
      "data-order-ws": 9,
      className: "gw-col csm-placement-id-b987124e-2303-4d53-a446-4485337d0a0a desktop-gateway-btf_884994b2-e481-4776-8b8d-32ce2ce7c926 celwidget pd_rd_wg-1jdyk pd_rd_w-lkVpi pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-order-sm": 12,
      "data-pf_rd_p": "b987124e-2303-4d53-a446-4485337d0a0a",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "lkVpi",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_test_ref",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-btf-grid-7",
      "data-csa-c-content-id": "b987124e-2303-4d53-a446-4485337d0a0a"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui fluid-card quad-multi-asin-card-v2",
      "data-a-card-type": "basic",
      id: "rCN_q35yQX9wwUCBdY9KPQ"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 2,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "2.6em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Sweets for your sweetie"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-base aok-clearfix _quad-multi-asin-card-v2_style_quadrantContainer__1hEF5"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topLeftQuadrant__yF7Ht a-text-normal",
      href: "/Count-PATCH-Sour-Individually-Wrapped/dp/B004KARTKU/?_encoding=UTF8&pd_rd_w=lkVpi&pf_rd_p=b987124e-2303-4d53-a446-4485337d0a0a&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/71Tkwi4fKQL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/71Tkwi4fKQL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "SOUR PATCH KIDS Big Individually Wrapped Soft & Chewy Candy, Valentines Candy , 240 Count Box"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topRightQuadrant__2rEJ7 a-text-normal",
      href: "/Original-Watermelon-SWEDISH-Halloween-Variety/dp/B087Z6RY25/?_encoding=UTF8&pd_rd_w=lkVpi&pf_rd_p=b987124e-2303-4d53-a446-4485337d0a0a&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/913dJIoY8MS._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/913dJIoY8MS._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "SOUR PATCH KIDS Original Candy, SOUR PATCH KIDS Watermelon Candy & SWEDISH FISH Candy Variety Pack, Valentines Candy, 15..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomLeftQuadrant__2r-kp a-text-normal",
      href: "/SOUR-PATCH-KIDS-Chewy-Candy/dp/B003N0R5BG/?_encoding=UTF8&pd_rd_w=lkVpi&pf_rd_p=b987124e-2303-4d53-a446-4485337d0a0a&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/91CRSyk+SFL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/91CRSyk+SFL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "SOUR PATCH KIDS Soft & Chewy Candy, Valentines Candy, 24 - 2 oz Bags"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomRightQuadrant__2OYLZ a-text-normal",
      href: "/PATCH-Message-Hearts-Valentine-Candy/dp/B09MVDQ2YX/?_encoding=UTF8&pd_rd_w=lkVpi&pf_rd_p=b987124e-2303-4d53-a446-4485337d0a0a&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/81eycljwujL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/81eycljwujL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "SOUR PATCH KIDS Message Hearts Valentine Candy Hearts, 36 - 4 Count Boxes (144 Total 0.88 oz Boxes)"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more footerLink",
      href: "/stores/page/26AC357A-ECB9-4922-A014-C29F5C4371DE/?_encoding=UTF8&channel=SPKTD0122&pd_rd_w=lkVpi&pf_rd_p=b987124e-2303-4d53-a446-4485337d0a0a&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Shop more candy"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-btf-grid-8",
      "data-gwi": '{"visible":"desktop-btf-grid-8-visible","active":"desktop-btf-grid-8-active"}',
      "data-display-at": "smws",
      "data-order-ws": 9,
      className: "gw-col csm-placement-id-ffddb215-3598-4956-a74a-f28a8e270f46 desktop-gateway-btf_37e74daa-5140-42ab-ac55-a870877abe45 celwidget pd_rd_wg-1jdyk pd_rd_w-9nOXW pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-order-sm": 12,
      "data-pf_rd_p": "ffddb215-3598-4956-a74a-f28a8e270f46",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "9nOXW",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-btf-grid-8",
      "data-csa-c-content-id": "ffddb215-3598-4956-a74a-f28a8e270f46"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "cHQjBvFZ0myYygxM1x6yxg",
      className: "a-cardui fluid-fat-image-link fluid-card fluid-fat-image-link",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, "Introducing Amazon Glow, works with Kids+")), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal center-image aok-block image-window",
      href: "/dp/B09DWNZQYM/ref=ods_gw_eg_jan2021_d_btf_vicc_hand_lifestyle"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Hand pointing at Amazon Glow screen.",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/kindle/journeys/NmFmZDA2Njgt/NmFmZDA2Njgt-OTExZWQzZTIt-w379._SY304_CB648709731_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/kindle/journeys/NmFmZDA2Njgt/NmFmZDA2Njgt-OTExZWQzZTIt-w758._SY608_CB648709731_.jpg"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/dp/B09DWNZQYM/ref=ods_gw_eg_jan2021_d_btf_vicc_hand_lifestyle"
    }, "Request an invite")))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "ws",
      "data-order-ws": 9,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-5",
      "data-gwi": '{"visible":"desktop-5-visible","active":"desktop-5-active"}',
      "data-col-span-ws": 4,
      "data-col-span-sm": 3,
      "data-order-ws": 10,
      "data-order-sm": 10,
      "data-display-at": "smws",
      className: "gw-col desktop-row gwi-row gw-widget-instrument gw-auto-height csm-placement-id-45f0d3b0-8ddc-4840-9ac2-c26f2608345f desktop-gateway-btf_drss-2d8b43b4-c66a-47d6-9ff0-bdfce7ef3e5e celwidget pd_rd_wg-1jdyk pd_rd_w-YrI0P pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-pf_rd_p": "45f0d3b0-8ddc-4840-9ac2-c26f2608345f",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "YrI0P",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-5",
      "data-csa-c-content-id": "45f0d3b0-8ddc-4840-9ac2-c26f2608345f"
    }, /* @__PURE__ */ React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: "._deals-shoveler-v2_style_badgeContainer__NehI_{line-height:0}\n._deals-shoveler-v2_style_dealCard__1HqkZ{max-height:1000px!important}._deals-shoveler-v2_style_dealInfo__1U5R1{max-width:270px;text-align:left}html[dir=rtl] ._deals-shoveler-v2_style_dealInfo__1U5R1{text-align:right}._deals-shoveler-v2_style_dealImage__3nlqg{height:100%}._deals-shoveler-v2_style_imageContainer__2Wm4A{height:200px}\n._deals-shoveler-v2_style_dealBadge__4Dv4_{display:inline-block;padding:3px 7px}._deals-shoveler-v2_style_blackFriday__2Mp4u,._deals-shoveler-v2_style_cyberMonday__2txGJ{background-color:#ffc266;color:#232f3e}._deals-shoveler-v2_style_primeDay__tz569{background-color:#97edfc;color:#000}._deals-shoveler-v2_style_dashDeal__3Gckg{background-color:#b12704;color:#fff}._deals-shoveler-v2_style_simpleDeal__2Bvg3{background-color:#ddd;color:#111}\n._deals-shoveler-v2_style_listPrice__1r4Am{margin-left:5px}\n._deals-shoveler-v2_style_dealTimer__3sQxX{position:relative}"
      }
    }), /* @__PURE__ */ React.createElement("div", {
      id: "Dub86_kzyBCexVu41XYJVA",
      className: "deals-shoveler-v2"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "Dub86_kzyBCexVu41XYJVA",
      className: "a-section a-spacing-none shogun-widget deals-shoveler fresh-shoveler"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header as-title-block"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base as-title-block-left"
    }, "Trending deals"), /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal as-title-block-right see-more truncate-1line",
      href: "/goldbox/?_encoding=UTF8&pd_rd_w=YrI0P&pf_rd_p=45f0d3b0-8ddc-4840-9ac2-c26f2608345f&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, "See all deals")), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none feed-carousel"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section feed-carousel-viewport"
    }, /* @__PURE__ */ React.createElement("ul", {
      className: "a-unordered-list a-nostyle a-horizontal feed-carousel-shelf",
      role: "list"
    }, /* @__PURE__ */ React.createElement("li", {
      className: "feed-carousel-card _deals-shoveler-v2_style_dealCard__1HqkZ"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/WISELIFE-Cushioned-Anti-Fatigue-Waterproof-Ergonomic/dp/B08V86LLNF?smid=A95P0KJ14R3UY"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-small"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none _deals-shoveler-v2_style_imageContainer__2Wm4A"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "WiseLife Kitchen Mat Cushioned Anti-Fatigue Kitchen Rug, Waterproof Non-Slip Kitchen Mats and Rugs Heavy Duty PVC...",
      src: "https://m.media-amazon.com/images/I/51nsqKwRATL._AC_SY200_.jpg",
      className: "product-image _deals-shoveler-v2_style_dealImage__3nlqg",
      "data-a-hires": "https://m.media-amazon.com/images/I/51nsqKwRATL._AC_SY400_.jpg"
    }))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section _deals-shoveler-v2_style_dealInfo__1U5R1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price min-deal-price",
      "data-a-size": "m",
      "data-a-color": "base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "$15.88"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price-symbol"
    }, "$"), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-whole"
    }, "15", /* @__PURE__ */ React.createElement("span", {
      className: "a-price-decimal"
    }, ".")), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-fraction"
    }, "88"))), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true",
      className: "a-price-dash",
      "data-a-size": "l",
      "data-a-color": "base"
    }, "-"), /* @__PURE__ */ React.createElement("span", {
      className: "a-price max-deal-price",
      "data-a-size": "m",
      "data-a-color": "base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "$33.99"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price-symbol"
    }, "$"), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-whole"
    }, "33", /* @__PURE__ */ React.createElement("span", {
      className: "a-price-decimal"
    }, ".")), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-fraction"
    }, "99")))), /* @__PURE__ */ React.createElement("span", {
      className: "dealAvailabilityMessage _deals-shoveler-v2_style_dealTimer__3sQxX"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-base a-color-tertiary dealTimer"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimer",
      role: "timer",
      "data-shared-model": '{"clockTime":{"hour":2,"minute":9,"second":9},"countDownEndLabel":{"ariaLabel":"Deal has ended","label":"Deal has ended"},"timeFormattedLabel":{"formattedString":"Ends in _hours_ hours _minutes_ minutes _seconds_ seconds","placeHolders":{"hour":"_hours_","minute":"_minutes_","second":"_seconds_"}}}'
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerAriaLabel aok-offscreen"
    }, "Ends in 2 hours 9 minutes 9 seconds"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerDisplay",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerLabel"
    }, "Ends in"), /* @__PURE__ */ React.createElement("span", {
      className: "a-letter-space"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerHour"
    }, "02"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSeparator"
    }, ":"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerMinute"
    }, "09"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSeparator"
    }, ":"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSecond"
    }, "09"))))))))), /* @__PURE__ */ React.createElement("li", {
      className: "feed-carousel-card _deals-shoveler-v2_style_dealCard__1HqkZ"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/TOCESS-Clips-Nonslip-Strong-Available/dp/B0919KNZ38?smid=A1ZJ0K0235C21M"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-small"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none _deals-shoveler-v2_style_imageContainer__2Wm4A"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "TOCESS Big Hair Claw Clips 4 Inch Nonslip Large Claw Clip for Women and Girls Thin Hair, Strong Hold Hair Clips for Thick...",
      src: "https://m.media-amazon.com/images/I/51SgsXHcoJL._AC_SY200_.jpg",
      className: "product-image _deals-shoveler-v2_style_dealImage__3nlqg",
      "data-a-hires": "https://m.media-amazon.com/images/I/51SgsXHcoJL._AC_SY400_.jpg"
    }))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section _deals-shoveler-v2_style_dealInfo__1U5R1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price min-deal-price",
      "data-a-size": "m",
      "data-a-color": "base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "$9.51"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price-symbol"
    }, "$"), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-whole"
    }, "9", /* @__PURE__ */ React.createElement("span", {
      className: "a-price-decimal"
    }, ".")), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-fraction"
    }, "51"))), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true",
      className: "a-price-dash",
      "data-a-size": "l",
      "data-a-color": "base"
    }, "-"), /* @__PURE__ */ React.createElement("span", {
      className: "a-price max-deal-price",
      "data-a-size": "m",
      "data-a-color": "base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "$9.99"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price-symbol"
    }, "$"), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-whole"
    }, "9", /* @__PURE__ */ React.createElement("span", {
      className: "a-price-decimal"
    }, ".")), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-fraction"
    }, "99")))), /* @__PURE__ */ React.createElement("span", {
      className: "dealAvailabilityMessage _deals-shoveler-v2_style_dealTimer__3sQxX"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-base a-color-tertiary dealTimer"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimer",
      role: "timer",
      "data-shared-model": '{"clockTime":{"hour":3,"minute":24,"second":9},"countDownEndLabel":{"ariaLabel":"Deal has ended","label":"Deal has ended"},"timeFormattedLabel":{"formattedString":"Ends in _hours_ hours _minutes_ minutes _seconds_ seconds","placeHolders":{"hour":"_hours_","minute":"_minutes_","second":"_seconds_"}}}'
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerAriaLabel aok-offscreen"
    }, "Ends in 3 hours 24 minutes 9 seconds"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerDisplay",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerLabel"
    }, "Ends in"), /* @__PURE__ */ React.createElement("span", {
      className: "a-letter-space"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerHour"
    }, "03"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSeparator"
    }, ":"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerMinute"
    }, "24"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSeparator"
    }, ":"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSecond"
    }, "09"))))))))), /* @__PURE__ */ React.createElement("li", {
      className: "feed-carousel-card _deals-shoveler-v2_style_dealCard__1HqkZ"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Charger-Protector-Extender-Charging-3-Sided/dp/B087RKKXM5?smid=A1BGDLOO430MHB"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-small"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none _deals-shoveler-v2_style_imageContainer__2Wm4A"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "USB Wall Charger Surge Protector 5 Outlet Extender with 4 USB Charging Ports ( 1 USB C Outlet) 3 Sided 1800J Power Strip...",
      src: "https://m.media-amazon.com/images/I/311lizQf+yL._AC_SY200_.jpg",
      className: "product-image _deals-shoveler-v2_style_dealImage__3nlqg",
      "data-a-hires": "https://m.media-amazon.com/images/I/311lizQf+yL._AC_SY400_.jpg"
    }))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section _deals-shoveler-v2_style_dealInfo__1U5R1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price min-deal-price",
      "data-a-size": "m",
      "data-a-color": "base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "Price: $15.99"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price-symbol"
    }, "$"), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-whole"
    }, "15", /* @__PURE__ */ React.createElement("span", {
      className: "a-price-decimal"
    }, ".")), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-fraction"
    }, "99"))), /* @__PURE__ */ React.createElement("span", {
      className: "a-letter-space"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "a-price a-text-price _deals-shoveler-v2_style_listPrice__1r4Am list-price",
      "data-a-size": "b",
      "data-a-strike": "true",
      "data-a-color": "tertiary"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "List: $21.99"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, "$21.99"))), /* @__PURE__ */ React.createElement("span", {
      className: "dealAvailabilityMessage _deals-shoveler-v2_style_dealTimer__3sQxX"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-base a-color-tertiary dealTimer"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimer",
      role: "timer",
      "data-shared-model": '{"clockTime":{"hour":1,"minute":44,"second":9},"countDownEndLabel":{"ariaLabel":"Deal has ended","label":"Deal has ended"},"timeFormattedLabel":{"formattedString":"Ends in _hours_ hours _minutes_ minutes _seconds_ seconds","placeHolders":{"hour":"_hours_","minute":"_minutes_","second":"_seconds_"}}}'
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerAriaLabel aok-offscreen"
    }, "Ends in 1 hours 44 minutes 9 seconds"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerDisplay",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerLabel"
    }, "Ends in"), /* @__PURE__ */ React.createElement("span", {
      className: "a-letter-space"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerHour"
    }, "01"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSeparator"
    }, ":"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerMinute"
    }, "44"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSeparator"
    }, ":"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSecond"
    }, "09"))))))))), /* @__PURE__ */ React.createElement("li", {
      className: "feed-carousel-card _deals-shoveler-v2_style_dealCard__1HqkZ"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Certified-Charger-AZMOGDT-Lightning-Compatible/dp/B09J2Q87F1?smid=A2MP7PSP908Y74"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-small"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none _deals-shoveler-v2_style_imageContainer__2Wm4A"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "[Apple MFi Certified]iPhone Charger AZMOGDT,5pack[6/6/6/10/10FT]Long Lightning Cable iPhone Cable USB Sync Cord Fast...",
      src: "https://m.media-amazon.com/images/I/41OpMwUsRHL._AC_SY200_.jpg",
      className: "product-image _deals-shoveler-v2_style_dealImage__3nlqg",
      "data-a-hires": "https://m.media-amazon.com/images/I/41OpMwUsRHL._AC_SY400_.jpg"
    }))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section _deals-shoveler-v2_style_dealInfo__1U5R1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price min-deal-price",
      "data-a-size": "m",
      "data-a-color": "base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "Price: $8.47"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price-symbol"
    }, "$"), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-whole"
    }, "8", /* @__PURE__ */ React.createElement("span", {
      className: "a-price-decimal"
    }, ".")), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-fraction"
    }, "47"))), /* @__PURE__ */ React.createElement("span", {
      className: "a-letter-space"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "a-price a-text-price _deals-shoveler-v2_style_listPrice__1r4Am list-price",
      "data-a-size": "b",
      "data-a-strike": "true",
      "data-a-color": "tertiary"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "List: $10.99"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, "$10.99"))), /* @__PURE__ */ React.createElement("span", {
      className: "dealAvailabilityMessage _deals-shoveler-v2_style_dealTimer__3sQxX"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-base a-color-tertiary dealTimer"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimer",
      role: "timer",
      "data-shared-model": '{"clockTime":{"hour":3,"minute":9,"second":9},"countDownEndLabel":{"ariaLabel":"Deal has ended","label":"Deal has ended"},"timeFormattedLabel":{"formattedString":"Ends in _hours_ hours _minutes_ minutes _seconds_ seconds","placeHolders":{"hour":"_hours_","minute":"_minutes_","second":"_seconds_"}}}'
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerAriaLabel aok-offscreen"
    }, "Ends in 3 hours 9 minutes 9 seconds"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerDisplay",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerLabel"
    }, "Ends in"), /* @__PURE__ */ React.createElement("span", {
      className: "a-letter-space"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerHour"
    }, "03"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSeparator"
    }, ":"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerMinute"
    }, "09"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSeparator"
    }, ":"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSecond"
    }, "09"))))))))), /* @__PURE__ */ React.createElement("li", {
      className: "feed-carousel-card _deals-shoveler-v2_style_dealCard__1HqkZ"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Wellue-Fingertip-Oximeter-Saturation-Batteries/dp/B085SY74YC?smid=A7FIE6VATV57H"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-small"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none _deals-shoveler-v2_style_imageContainer__2Wm4A"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Wellue Fingertip Pulse Oximeter 60F, Blood Oxygen Saturation Monitor with Alarm, Batteries, Carry Bag & Lanyard for...",
      src: "https://m.media-amazon.com/images/I/41Jnm6BKeCL._AC_SY200_.jpg",
      className: "product-image _deals-shoveler-v2_style_dealImage__3nlqg",
      "data-a-hires": "https://m.media-amazon.com/images/I/41Jnm6BKeCL._AC_SY400_.jpg"
    }))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section _deals-shoveler-v2_style_dealInfo__1U5R1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price min-deal-price",
      "data-a-size": "m",
      "data-a-color": "base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "Price: $14.44"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price-symbol"
    }, "$"), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-whole"
    }, "14", /* @__PURE__ */ React.createElement("span", {
      className: "a-price-decimal"
    }, ".")), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-fraction"
    }, "44"))), /* @__PURE__ */ React.createElement("span", {
      className: "a-letter-space"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "a-price a-text-price _deals-shoveler-v2_style_listPrice__1r4Am list-price",
      "data-a-size": "b",
      "data-a-strike": "true",
      "data-a-color": "tertiary"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "List: $28.99"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, "$28.99"))), /* @__PURE__ */ React.createElement("span", {
      className: "dealAvailabilityMessage _deals-shoveler-v2_style_dealTimer__3sQxX"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-base a-color-tertiary dealTimer"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimer",
      role: "timer",
      "data-shared-model": '{"clockTime":{"hour":0,"minute":4,"second":9},"countDownEndLabel":{"ariaLabel":"Deal has ended","label":"Deal has ended"},"timeFormattedLabel":{"formattedString":"Ends in _hours_ hours _minutes_ minutes _seconds_ seconds","placeHolders":{"hour":"_hours_","minute":"_minutes_","second":"_seconds_"}}}'
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerAriaLabel aok-offscreen"
    }, "Ends in 0 hours 4 minutes 9 seconds"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerDisplay",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerLabel"
    }, "Ends in"), /* @__PURE__ */ React.createElement("span", {
      className: "a-letter-space"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerHour"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSeparator aok-hidden"
    }, ":"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerMinute"
    }, "04"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSeparator"
    }, ":"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSecond"
    }, "09"))))))))), /* @__PURE__ */ React.createElement("li", {
      className: "feed-carousel-card _deals-shoveler-v2_style_dealCard__1HqkZ"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/MSAAEX-Disposable-Non-Woven-Protected-Adults-Black/dp/B08BJVTCMS?smid=A3G4PSIBU81HO8"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-small"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none _deals-shoveler-v2_style_imageContainer__2Wm4A"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "MSAAEX 50 Pcs Disposable 4-ply Non-woven Face Mask, Black Masks",
      src: "https://m.media-amazon.com/images/I/51QHX2B51+L._AC_SY200_.jpg",
      className: "product-image _deals-shoveler-v2_style_dealImage__3nlqg",
      "data-a-hires": "https://m.media-amazon.com/images/I/51QHX2B51+L._AC_SY400_.jpg"
    }))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section _deals-shoveler-v2_style_dealInfo__1U5R1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price min-deal-price",
      "data-a-size": "m",
      "data-a-color": "base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "Price: $11.88"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price-symbol"
    }, "$"), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-whole"
    }, "11", /* @__PURE__ */ React.createElement("span", {
      className: "a-price-decimal"
    }, ".")), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-fraction"
    }, "88"))), /* @__PURE__ */ React.createElement("span", {
      className: "a-letter-space"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "a-price a-text-price _deals-shoveler-v2_style_listPrice__1r4Am list-price",
      "data-a-size": "b",
      "data-a-strike": "true",
      "data-a-color": "tertiary"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "List: $18.99"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, "$18.99"))), /* @__PURE__ */ React.createElement("span", {
      className: "dealAvailabilityMessage _deals-shoveler-v2_style_dealTimer__3sQxX"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-base a-color-tertiary dealTimer"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimer",
      role: "timer",
      "data-shared-model": '{"clockTime":{"hour":2,"minute":44,"second":9},"countDownEndLabel":{"ariaLabel":"Deal has ended","label":"Deal has ended"},"timeFormattedLabel":{"formattedString":"Ends in _hours_ hours _minutes_ minutes _seconds_ seconds","placeHolders":{"hour":"_hours_","minute":"_minutes_","second":"_seconds_"}}}'
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerAriaLabel aok-offscreen"
    }, "Ends in 2 hours 44 minutes 9 seconds"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerDisplay",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerLabel"
    }, "Ends in"), /* @__PURE__ */ React.createElement("span", {
      className: "a-letter-space"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerHour"
    }, "02"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSeparator"
    }, ":"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerMinute"
    }, "44"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSeparator"
    }, ":"), /* @__PURE__ */ React.createElement("span", {
      className: "gwTimerSecond"
    }, "09"))))))))), /* @__PURE__ */ React.createElement("li", {
      className: "feed-carousel-card _deals-shoveler-v2_style_dealCard__1HqkZ"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Star-Projector-Rossetta-Bedroom-Bluetooth/dp/B099ZR7X74?smid=A1BIULSM5AWAO4"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-small"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none _deals-shoveler-v2_style_imageContainer__2Wm4A"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Star Projector, Rossetta Galaxy Projector for Bedroom, Bluetooth Speaker and White Noise Aurora Projector, Night Light...",
      src: "https://m.media-amazon.com/images/I/51Ju0ZKjhCL._AC_SY200_.jpg",
      className: "product-image _deals-shoveler-v2_style_dealImage__3nlqg",
      "data-a-hires": "https://m.media-amazon.com/images/I/51Ju0ZKjhCL._AC_SY400_.jpg"
    }))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section _deals-shoveler-v2_style_dealInfo__1U5R1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price min-deal-price",
      "data-a-size": "m",
      "data-a-color": "base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-offscreen"
    }, "Price: $33.99"), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-price-symbol"
    }, "$"), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-whole"
    }, "33", /* @__PURE__ */ React.createElement("span", {
      className: "a-price-decimal"
    }, ".")), /* @__PURE__ */ React.createElement("span", {
      className: "a-price-fraction"
    }, "99")))), /* @__PURE__ */ React.createElement("span", {
      className: "dealAvailabilityMessage _deals-shoveler-v2_style_dealTimer__3sQxX"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-size-base a-color-tertiary staticMessage"
    }, "Deal is on waitlist"))))))), /* @__PURE__ */ React.createElement("div", {
      className: "spinner",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "gw-spinner",
      role: "presentation"
    }))), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel previous slide",
      className: "a-link-normal feed-carousel-control feed-left",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel next slide",
      className: "a-link-normal feed-carousel-control feed-right",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-track"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-thumb"
    }))))))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "smws",
      "data-order-sm": 10,
      "data-order-ws": 10,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-6",
      "data-gwi": '{"visible":"desktop-6-visible","active":"desktop-6-active"}',
      "data-col-span-ws": 4,
      "data-col-span-sm": 3,
      "data-order-ws": 11,
      "data-order-sm": 11,
      "data-display-at": "smws",
      className: "gw-col desktop-row gwi-row gw-widget-instrument gw-auto-height csm-placement-id-092873e7-1ce9-44a3-bd5b-88c03a834f89 desktop-gateway-btf_78ebc09d-6abe-4cec-aa5c-82d435644570 celwidget pd_rd_wg-1jdyk pd_rd_w-mCw3R pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-pf_rd_p": "092873e7-1ce9-44a3-bd5b-88c03a834f89",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "mCw3R",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-6",
      "data-csa-c-content-id": "092873e7-1ce9-44a3-bd5b-88c03a834f89"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none ameyal-product-shoveler",
      id: "ewS6xUSPKJWC88A0VCYdIA"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "68ba80c5-c70e-4f73-85a6-581b38e2d2d2",
      className: "a-section a-spacing-none shogun-widget card-lite product-shoveler aui-desktop fresh-shoveler"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section as-title-block"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "as-title-block-left"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, "Start a new home project")), /* @__PURE__ */ React.createElement("span", {
      className: "as-title-block-right"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/b?node=602344&ref=PM_HG_GW_SH_DSK_JAN_EN&pd_rd_w=mCw3R&pf_rd_p=092873e7-1ce9-44a3-bd5b-88c03a834f89&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk"
    }, "See more"))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none feed-carousel"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section feed-carousel-viewport"
    }, /* @__PURE__ */ React.createElement("ul", {
      className: "a-unordered-list a-nostyle a-horizontal feed-carousel-shelf",
      role: "list"
    }, /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B002PXVYEQ"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Trusted-Media-Brands-Inc-Handyman/dp/B002PXVYEQ/?_encoding=UTF8&pd_rd_w=mCw3R&pf_rd_p=092873e7-1ce9-44a3-bd5b-88c03a834f89&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Family Handyman",
      src: "https://m.media-amazon.com/images/I/518WU2CeA6L._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/518WU2CeA6L._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B002PXVYQY"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Meredith-Corporation-Southern-Living/dp/B002PXVYQY/?_encoding=UTF8&pd_rd_w=mCw3R&pf_rd_p=092873e7-1ce9-44a3-bd5b-88c03a834f89&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Southern Living",
      src: "https://m.media-amazon.com/images/I/518PvS+36eL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/518PvS+36eL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B0029XHGRQ"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Meredith-corporation-Better-Homes-Gardens/dp/B0029XHGRQ/?_encoding=UTF8&pd_rd_w=mCw3R&pf_rd_p=092873e7-1ce9-44a3-bd5b-88c03a834f89&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Better Homes & Gardens",
      src: "https://m.media-amazon.com/images/I/51UnztxRQiL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/51UnztxRQiL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B002PXW1IE"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Meredith-Corporation-Real-Simple/dp/B002PXW1IE/?_encoding=UTF8&pd_rd_w=mCw3R&pf_rd_p=092873e7-1ce9-44a3-bd5b-88c03a834f89&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Real Simple",
      src: "https://m.media-amazon.com/images/I/51nCJrh7leL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/51nCJrh7leL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B0061SHL16"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Trusted-Media-Brands-Inc-Blooms/dp/B0061SHL16/?_encoding=UTF8&pd_rd_w=mCw3R&pf_rd_p=092873e7-1ce9-44a3-bd5b-88c03a834f89&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Birds & Blooms",
      src: "https://m.media-amazon.com/images/I/51HT4XLgw1L._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/51HT4XLgw1L._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B0089FUF6W"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Hearst-Magazines-HGTV-Magazine/dp/B0089FUF6W/?_encoding=UTF8&pd_rd_w=mCw3R&pf_rd_p=092873e7-1ce9-44a3-bd5b-88c03a834f89&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "HGTV Magazine",
      src: "https://m.media-amazon.com/images/I/51bjrVP9KLL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/51bjrVP9KLL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B002PXW0EO"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Meredith-Martha-Stewart-Living/dp/B002PXW0EO/?_encoding=UTF8&pd_rd_w=mCw3R&pf_rd_p=092873e7-1ce9-44a3-bd5b-88c03a834f89&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Martha Stewart Living",
      src: "https://m.media-amazon.com/images/I/51CNwkjXkvL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/51CNwkjXkvL._AC_SY400_.jpg"
    }))))), /* @__PURE__ */ React.createElement("div", {
      className: "spinner",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "gw-spinner",
      role: "presentation"
    }))), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel previous slide",
      className: "a-link-normal feed-carousel-control feed-left",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel next slide",
      className: "a-link-normal feed-carousel-control feed-right",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-track"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-thumb"
    }))))))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "smws",
      "data-order-sm": 11,
      "data-order-ws": 11,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-btf-grid-9",
      "data-gwi": '{"visible":"desktop-btf-grid-9-visible","active":"desktop-btf-grid-9-active"}',
      "data-display-at": "smws",
      "data-order-ws": 12,
      className: "gw-col csm-placement-id-04346d3a-3fd9-45fa-af0d-3c8d9641806c desktop-gateway-btf_ca5e727b-328b-4614-af00-a54424652fc2 celwidget pd_rd_wg-1jdyk pd_rd_w-5FQrX pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-order-sm": 12,
      "data-pf_rd_p": "04346d3a-3fd9-45fa-af0d-3c8d9641806c",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "5FQrX",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-btf-grid-9",
      "data-csa-c-content-id": "04346d3a-3fd9-45fa-af0d-3c8d9641806c"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "EBBEW8mUdr50Y9ls9CnqRQ",
      className: "a-cardui fluid-fat-image-link fluid-card fluid-fat-image-link",
      "data-a-card-type": "basic"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline truncate-2line"
    }, "Upgrade your coffee routine")), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal center-image aok-block image-window",
      href: "/b?node=20953777011&ref_s9_acss_bw_cg_CFECTA_1a1_w?"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none fluid-image-container"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Upgrade your coffee routine. Explore coffee upgrades",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/img18/home/2022/Q1/JAN/2022_Q1_dsk_SingleImageCard_BestCup_379x304_01_1x._SY304_CB648474329_.jpg",
      className: "landscape-image",
      "data-a-hires": "https://images-na.ssl-images-amazon.com/images/G/01/img18/home/2022/Q1/JAN/2022_Q1_dsk_SingleImageCard_BestCup_758X608_01_2x._SY608_CB648474329_.jpg"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more truncate-1line",
      href: "/b?node=20953777011&ref_s9_acss_bw_cg_CFECTA_1a1_w?"
    }, "Explore coffee upgrades")))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "sm",
      "data-order-sm": 12,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-btf-grid-10",
      "data-gwi": '{"visible":"desktop-btf-grid-10-visible","active":"desktop-btf-grid-10-active"}',
      "data-display-at": "ws",
      "data-order-ws": 12,
      className: "gw-col csm-placement-id-21e93e8d-9e57-41c8-a72c-7ba76e794631 desktop-gateway-btf_b09c8db2-c946-4fa4-a662-a51d82f60f2a celwidget pd_rd_wg-1jdyk pd_rd_w-nz0NU pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-pf_rd_p": "21e93e8d-9e57-41c8-a72c-7ba76e794631",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "nz0NU",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_test_ref",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-btf-grid-10",
      "data-csa-c-content-id": "21e93e8d-9e57-41c8-a72c-7ba76e794631"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui fluid-card quad-multi-asin-card-v2",
      "data-a-card-type": "basic",
      id: "krZ0BIs1c91lWVnfCkCWbQ"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 2,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "2.6em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Stack up the savings"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-base aok-clearfix _quad-multi-asin-card-v2_style_quadrantContainer__1hEF5"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topLeftQuadrant__yF7Ht a-text-normal",
      href: "/AmazonCommercial-Facial-Tissue-Sheets-Boxes/dp/B07KWRMQHG/?_encoding=UTF8&pd_rd_w=nz0NU&pf_rd_p=21e93e8d-9e57-41c8-a72c-7ba76e794631&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/6168Y48XNLL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/6168Y48XNLL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, 'AmazonCommercial 2-Ply White Cube Box Facial Tissue|Bulk for Business|FSC Certified|95 Sheets per Roll (36 Boxes)(8" x...'), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topRightQuadrant__2rEJ7 a-text-normal",
      href: "/AmazonCommercial-Toilet-Tissues-Sheets-Rolls/dp/B07KWNSTRR/?_encoding=UTF8&pd_rd_w=nz0NU&pf_rd_p=21e93e8d-9e57-41c8-a72c-7ba76e794631&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/518MhUlCV9L._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/518MhUlCV9L._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "AmazonCommercial 2-Ply White Ultra Plus Individually Wrapped Toilet Paper/Bath Tissue|Bulk|Septic Safe|FSC Certified|400..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomLeftQuadrant__2r-kp a-text-normal",
      href: "/AmazonCommercial-Ultra-Multifold-Paper-Towels/dp/B07TXRKVS5/?_encoding=UTF8&pd_rd_w=nz0NU&pf_rd_p=21e93e8d-9e57-41c8-a72c-7ba76e794631&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/81mF+2+E+sL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/81mF+2+E+sL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "AmazonCommercial Ultra Plus Multifold Paper Towels, 150 Towels per Pack, 16 Packs"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomRightQuadrant__2OYLZ a-text-normal",
      href: "/AmazonCommercial-Lunch-Napkins-Pack-Packs/dp/B07TVKL9HJ/?_encoding=UTF8&pd_rd_w=nz0NU&pf_rd_p=21e93e8d-9e57-41c8-a72c-7ba76e794631&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/81pqCpT+1vL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/81pqCpT+1vL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "AmazonCommercial 1-Ply White Lunch Napkins (SOFI-067)|Bulk |Disposable Paper Napkins |Lunch Napkins |FSC Certified |250..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more footerLink",
      href: "/stores/page/AAB75540-485D-4D8A-95F3-7D3C3B8C357B/?_encoding=UTF8&ingress=0&visitId=175c8c41-dcaf-4fea-add0-851318a4189d%3Fref_%3DAPBGWQ1&pd_rd_w=nz0NU&pf_rd_p=21e93e8d-9e57-41c8-a72c-7ba76e794631&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "See more AmazonCommercial"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-btf-grid-11",
      "data-gwi": '{"visible":"desktop-btf-grid-11-visible","active":"desktop-btf-grid-11-active"}',
      "data-display-at": "ws",
      "data-order-ws": 12,
      className: "gw-col csm-placement-id-b80a7d7b-e3d6-4df7-9caf-fa59fc48bf73 desktop-gateway-btf_7501d2fd-0bd9-454e-be53-6de0bddd433d celwidget pd_rd_wg-1jdyk pd_rd_w-KN6mD pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-pf_rd_p": "b80a7d7b-e3d6-4df7-9caf-fa59fc48bf73",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "KN6mD",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_test_ref",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-btf-grid-11",
      "data-csa-c-content-id": "b80a7d7b-e3d6-4df7-9caf-fa59fc48bf73"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui fluid-card quad-multi-asin-card-v2",
      "data-a-card-type": "basic",
      id: "yCf-bEu8I-UHnK171ZFEKA"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 2,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "2.6em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Beauty favorites"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-base aok-clearfix _quad-multi-asin-card-v2_style_quadrantContainer__1hEF5"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topLeftQuadrant__yF7Ht a-text-normal",
      href: "/Philips-Sonicare-replacement-toothbrush-HX9023/dp/B078BHNMLF/?_encoding=UTF8&pd_rd_w=KN6mD&pf_rd_p=b80a7d7b-e3d6-4df7-9caf-fa59fc48bf73&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/811EBmJgNIL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/811EBmJgNIL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Philips Sonicare Genuine Toothbrush Head Variety Pack, C3 Premium Plaque Control and C2 Optimal Plaque Control, 3 Brush..."), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topRightQuadrant__2rEJ7 a-text-normal",
      href: "/Philips-Sonicare-DiamondClean-Rechargeable-toothbrush/dp/B07C799HF6/?_encoding=UTF8&pd_rd_w=KN6mD&pf_rd_p=b80a7d7b-e3d6-4df7-9caf-fa59fc48bf73&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/81gYfnZUcqL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/81gYfnZUcqL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Philips Sonicare DiamondClean Smart 9750 Rechargeable Electric Power Toothbrush, Lunar Blue, HX9954/56"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomLeftQuadrant__2r-kp a-text-normal",
      href: "/Philips-Sonicare-Toothbrush-HX9092-65/dp/B091TW5ZSF/?_encoding=UTF8&pd_rd_w=KN6mD&pf_rd_p=b80a7d7b-e3d6-4df7-9caf-fa59fc48bf73&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/71YJgPi5NoL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/71YJgPi5NoL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Philips Sonicare A3 Premium All-in-One Toothbrush Head, 2 Brush Heads, White, HX9092/65"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomRightQuadrant__2OYLZ a-text-normal",
      href: "/Philips-Sonicare-DiamondClean-Rechargeable-toothbrush/dp/B06XSH2RNQ/?_encoding=UTF8&pd_rd_w=KN6mD&pf_rd_p=b80a7d7b-e3d6-4df7-9caf-fa59fc48bf73&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/71ypAhHfbUL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/71ypAhHfbUL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Philips Sonicare DiamondClean Smart 9500 Rechargeable Electric Power Toothbrush, White, HX9924/01"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more footerLink",
      href: "/stores/page/4D125D68-85F5-4070-9750-AD28C6DE3BA9/?_encoding=UTF8&ingress=0&visitId=559e8a75-f268-4e34-aab1-97a850eb77e3&lp_slot=auto-sparkle-hsa-tetris&store_ref=SB_A056362537YQEOD3MS41B&ref_=sbx_be_s_sparkle_lsi4d_logo&pd_rd_w=KN6mD&pf_rd_p=b80a7d7b-e3d6-4df7-9caf-fa59fc48bf73&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Shop for oral care products"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-btf-grid-12",
      "data-gwi": '{"visible":"desktop-btf-grid-12-visible","active":"desktop-btf-grid-12-active"}',
      "data-display-at": "ws",
      "data-order-ws": 12,
      className: "gw-col csm-placement-id-0c43dc25-9cb6-49ed-972d-d6d2fee3507e desktop-gateway-btf_e0528c28-a16d-45a3-9a58-e31a537864ca celwidget pd_rd_wg-1jdyk pd_rd_w-5FwS1 pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-pf_rd_p": "0c43dc25-9cb6-49ed-972d-d6d2fee3507e",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "5FwS1",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_test_ref",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-btf-grid-12",
      "data-csa-c-content-id": "0c43dc25-9cb6-49ed-972d-d6d2fee3507e"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui fluid-card quad-multi-asin-card-v2",
      "data-a-card-type": "basic",
      id: "1fhXsEfnbYqCcQvCkkD_CQ"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-header"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "a-color-base headline"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 2,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "2.6em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Upgrade your gallery wall"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-body"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-base aok-clearfix _quad-multi-asin-card-v2_style_quadrantContainer__1hEF5"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topLeftQuadrant__yF7Ht a-text-normal",
      href: "/Stone-Beam-Modern-Hanging-Mirror/dp/B073WHKXD4/?_encoding=UTF8&pd_rd_w=5FwS1&pf_rd_p=0c43dc25-9cb6-49ed-972d-d6d2fee3507e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/81bwvy6NFmL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/81bwvy6NFmL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Amazon Brand \u2013 Stone & Beam Modern Round Arc Iron Hanging Wall Mirror With Shelf, 30 Inch Height, Dark Bronze"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_topRightQuadrant__2rEJ7 a-text-normal",
      href: "/Stone-Beam-Hanging-Mirror-Natural/dp/B073WGN8PP/?_encoding=UTF8&pd_rd_w=5FwS1&pf_rd_p=0c43dc25-9cb6-49ed-972d-d6d2fee3507e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/81aKE15gqVL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/81aKE15gqVL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, 'Amazon Brand \u2013 Stone & Beam Wood and Iron Hanging Wall Mirror, 42.25" Height, Natural Wood and Black'), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomLeftQuadrant__2r-kp a-text-normal",
      href: "/Stone-Beam-Vintage-Farmhouse-Multipanel/dp/B084KDB8BQ/?_encoding=UTF8&pd_rd_w=5FwS1&pf_rd_p=0c43dc25-9cb6-49ed-972d-d6d2fee3507e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/81yZG8-+McL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/81yZG8-+McL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, 'Amazon Brand \u2013 Stone & Beam Vintage Farmhouse Wooden Arched Multipanel Mantel Mirror, 36"H, Light Stain'), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))), /* @__PURE__ */ React.createElement("a", {
      className: "a-spacing-none a-link-normal aok-float-left aok-relative _quad-multi-asin-card-v2_style_quadrant__3xH-V _quad-multi-asin-card-v2_style_bottomRightQuadrant__2OYLZ a-text-normal",
      href: "/Stone-Beam-Vintage-Look-Octagonal-Antique/dp/B073WGQBPZ/?_encoding=UTF8&pd_rd_w=5FwS1&pf_rd_p=0c43dc25-9cb6-49ed-972d-d6d2fee3507e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_test_ref"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-image-container a-dynamic-image-container _quad-multi-asin-card-v2_style_quadrantImageContainer__2QeUm"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: true,
      src: "https://m.media-amazon.com/images/I/913zGYjLmuL._AC_SY110_.jpg",
      "data-a-hires": "https://m.media-amazon.com/images/I/913zGYjLmuL._AC_SY220_.jpg"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate a-size-base",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Amazon Brand \u2013 Stone & Beam Vintage-Look Octagonal Hanging Wall Mirror Decor, 25.5 Inch Height, Antique White"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("div", {
      className: "a-cardui-footer"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal see-more footerLink",
      href: "/stores/page/B8C767F6-1A01-4280-9BCF-464486082F35/?_encoding=UTF8&ingress=0&visitId=d32d3617-7cec-41b8-9037-83704ddd4745&channel=hamburg&ref_=nav_em_0_2_17_32&pd_rd_w=5FwS1&pf_rd_p=0c43dc25-9cb6-49ed-972d-d6d2fee3507e&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate",
      "data-a-word-break": "normal",
      "data-a-max-rows": 1,
      "data-a-overflow-marker": "\u2026",
      style: {
        lineHeight: "1.3em !important",
        maxHeight: "1.3em"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-full"
    }, "Shop more Stone & Beam"), /* @__PURE__ */ React.createElement("span", {
      className: "a-truncate-cut a-hidden",
      "aria-hidden": "true"
    })))))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "ws",
      "data-order-ws": 12,
      className: "card-flow-row-break"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "desktop-7",
      "data-gwi": '{"visible":"desktop-7-visible","active":"desktop-7-active"}',
      "data-col-span-ws": 4,
      "data-col-span-sm": 3,
      "data-order-ws": 13,
      "data-order-sm": 13,
      "data-display-at": "smws",
      className: "gw-col desktop-row gwi-row gw-widget-instrument gw-auto-height csm-placement-id-33af7a71-4ce6-40fc-b368-0d1f94dda1ce desktop-gateway-btf_712f7fb3-aef8-4405-8930-4d417a19438c celwidget pd_rd_wg-1jdyk pd_rd_w-0dXy6 pd_rd_r-02003dfe-1917-4061-a041-491f95be5db9",
      "data-pf_rd_p": "33af7a71-4ce6-40fc-b368-0d1f94dda1ce",
      "data-pd_rd_wg": "1jdyk",
      "data-pd_rd_w": "0dXy6",
      "data-pd_rd_r": "02003dfe-1917-4061-a041-491f95be5db9",
      "data-ref_": "pd_gw_unk",
      "data-csa-c-type": "widget",
      "data-csa-c-slot-id": "desktop-7",
      "data-csa-c-content-id": "33af7a71-4ce6-40fc-b368-0d1f94dda1ce"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none ameyal-product-shoveler",
      id: "3j8xwHCqJKizIr48CqJmdw"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "9a07cabc-c29f-4ca2-87c3-3571164978f2",
      className: "a-section a-spacing-none shogun-widget card-lite product-shoveler aui-desktop fresh-shoveler"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section as-title-block"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "as-title-block-left"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-color-secondary"
    }, "Find unique home gifts"), /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, "Find unique home gifts")), /* @__PURE__ */ React.createElement("span", {
      className: "as-title-block-right"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-color-base"
    }, "Find unique home gifts"), /* @__PURE__ */ React.createElement("span", {
      className: "as-title-divider"
    }, " | "), /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/gcx/Home-&-D%C3%A9cor/gfhz/events/?canBeEGifted=false&canBeGiftWrapped=false&categoryId=HGG-cat-1&isLimitedTimeOffer=false&isPrime=false&scrollState=eyJpdGVtSW5kZXgiOjAsInNjcm9sbE9mZnNldCI6MjQ5LjExNjY2ODcwMTE3MTg4fQ%3D%3D&sectionManagerState=eyJzZWN0aW9uVHlwZUVuZEluZGV4Ijp7ImFtYWJvdCI6MH19&subcategoryIds=HGG-cat-1%3ADecor&pd_rd_w=0dXy6&pf_rd_p=33af7a71-4ce6-40fc-b368-0d1f94dda1ce&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk"
    }, "Explore more home decor"))), /* @__PURE__ */ React.createElement("div", {
      className: "a-section a-spacing-none feed-carousel"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "a-section feed-carousel-viewport"
    }, /* @__PURE__ */ React.createElement("ul", {
      className: "a-unordered-list a-nostyle a-horizontal feed-carousel-shelf",
      role: "list"
    }, /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B08CZBDTJ6"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Always-Kiss-Goodnight-Sign-Decorations/dp/B08CZBDTJ6/?_encoding=UTF8&pd_rd_w=0dXy6&pf_rd_p=33af7a71-4ce6-40fc-b368-0d1f94dda1ce&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Always Kiss Me Goodnight Wall Sign 8x17 Inch - Kiss Me Goodnight Sign for Bedroom Wall Decor for Couples, Love Quotes...",
      src: "https://m.media-amazon.com/images/I/81ByePKA3FL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/81ByePKA3FL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B01NAMD59E"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Vinkor-Flameless-Flickering-Decorative-Burgundy/dp/B01NAMD59E/?_encoding=UTF8&pd_rd_w=0dXy6&pf_rd_p=33af7a71-4ce6-40fc-b368-0d1f94dda1ce&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Vinkor Flameless Candles Flickering Flameless Candles Decorative Flameless Candles Classic Real Wax Pillar with Moving...",
      src: "https://m.media-amazon.com/images/I/71c0XIN2N7L._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/71c0XIN2N7L._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B08RNCMXQG"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/DILATATA-Peonies-Artificial-Bouquets-Peony-Pink/dp/B08RNCMXQG/?_encoding=UTF8&pd_rd_w=0dXy6&pf_rd_p=33af7a71-4ce6-40fc-b368-0d1f94dda1ce&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "DILATATA Fake Peonies Artificial Roses Flower Bouquets Silk Roses Branch Vintage Faux Rose Bush Shabby Chic Silk...",
      src: "https://m.media-amazon.com/images/I/71u+PH5CuQS._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/71u+PH5CuQS._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B07V21X3B8"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Furora-LIGHTING-Flameless-Operated-Flickering/dp/B07V21X3B8/?_encoding=UTF8&pd_rd_w=0dXy6&pf_rd_p=33af7a71-4ce6-40fc-b368-0d1f94dda1ce&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Furora LIGHTING LED Flameless Candles with Remote Control, Pink in Set of 8, Real Wax Battery Operated Pillars and...",
      src: "https://m.media-amazon.com/images/I/811U-bdbkeL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/811U-bdbkeL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B08BK25CVZ"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/POWERMAZ-Romantic-Anniversary-Valentines-Wedding/dp/B08BK25CVZ/?_encoding=UTF8&pd_rd_w=0dXy6&pf_rd_p=33af7a71-4ce6-40fc-b368-0d1f94dda1ce&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "POWERMAZ Love Romantic Anniversary Valentines Day Wedding Signs Love Heart Design Plaque Art Gifts for Home Decor...",
      src: "https://m.media-amazon.com/images/I/61hfayBQdEL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/61hfayBQdEL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B01L0J58Q0"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/Creative-Co-op-Heart-Arrow-Decoration/dp/B01L0J58Q0/?_encoding=UTF8&pd_rd_w=0dXy6&pf_rd_p=33af7a71-4ce6-40fc-b368-0d1f94dda1ce&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "Creative Co-Op Cast Iron Heart & Arrow Decoration",
      src: "https://m.media-amazon.com/images/I/81Xs-CrDdUL._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/81Xs-CrDdUL._AC_SY400_.jpg"
    })))), /* @__PURE__ */ React.createElement("li", {
      "data-sgproduct": '{"asin":"B08MTT88CV"}',
      className: "feed-carousel-card"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "a-list-item"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "a-link-normal",
      href: "/GROBRO7-Valentines-Non-Slip-Reusable-Entrance/dp/B08MTT88CV/?_encoding=UTF8&pd_rd_w=0dXy6&pf_rd_p=33af7a71-4ce6-40fc-b368-0d1f94dda1ce&pf_rd_r=G20VCH14K5VY7ZT71W9K&pd_rd_r=02003dfe-1917-4061-a041-491f95be5db9&pd_rd_wg=1jdyk&ref_=pd_gw_unk"
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "GROBRO7 Love Heart Doormat Linen Checker White and Black Mother's Valentine's Day Carpet Rubber Non-Slip Reusable...",
      src: "https://m.media-amazon.com/images/I/A1o7qY+sEML._AC_SY200_.jpg",
      className: "product-image",
      height: "200px",
      "data-a-hires": "https://m.media-amazon.com/images/I/A1o7qY+sEML._AC_SY400_.jpg"
    }))))), /* @__PURE__ */ React.createElement("div", {
      className: "spinner",
      "aria-hidden": "true"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "gw-spinner",
      role: "presentation"
    }))), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel previous slide",
      className: "a-link-normal feed-carousel-control feed-left",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("a", {
      "aria-label": "Carousel next slide",
      className: "a-link-normal feed-carousel-control feed-right",
      tabIndex: -1,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "gw-icon feed-arrow"
    })), /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-track"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "feed-scrollbar-thumb"
    }))))))), /* @__PURE__ */ React.createElement("hr", {
      "data-display-at": "smws",
      "data-order-sm": 13,
      "data-order-ws": 13,
      className: "card-flow-row-break"
    })))), /* @__PURE__ */ React.createElement("div", {
      id: "SponsoredLinksGateway"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "a-section"
    }), /* @__PURE__ */ React.createElement("div", {
      id: "rhf",
      className: "copilot-secure-display",
      style: { clear: "both" },
      role: "complementary",
      "aria-label": "Your recently viewed items and featured recommendations"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "rhf-frame",
      style: { display: "none" }
    }, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("div", {
      id: "rhf-container"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "rhf-loading-outer"
    }, /* @__PURE__ */ React.createElement("table", {
      className: "rhf-loading-middle"
    }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
      className: "rhf-loading-inner"
    }, /* @__PURE__ */ React.createElement("img", {
      src: "https://images-na.ssl-images-amazon.com/images/G/01/personalization/ybh/loading-4x-gray._CB485916920_.gif"
    })))))), /* @__PURE__ */ React.createElement("div", {
      id: "rhf-context"
    })), /* @__PURE__ */ React.createElement("noscript", null, '<div class="rhf-border"> <div class="rhf-header"> Your recently viewed items and featured recommendations </div> <div class="rhf-footer"> <div class="rvi-container"> <div class="ybh-edit"> <div class="ybh-edit-arrow"> &#8250; </div> <div class="ybh-edit-link"><a href="/gp/yourstore/pym/ref=pd_pyml_rhf/135-7631307-9395561">View or edit your browsing history</a></div> </div> <span class="no-rvi-message">After viewing product detail pages, look here to find an easy way to navigate back to pages you are interested in.</span> </div> </div> </div>'), /* @__PURE__ */ React.createElement("div", {
      id: "rhf-error",
      style: { display: "none" }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "rhf-border"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "rhf-header"
    }, "Your recently viewed items and featured recommendations"), /* @__PURE__ */ React.createElement("div", {
      className: "rhf-footer"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "rvi-container"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "ybh-edit"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "ybh-edit-arrow"
    }, " \u203A "), /* @__PURE__ */ React.createElement("div", {
      className: "ybh-edit-link"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/yourstore/pym/ref=pd_pyml_rhf/135-7631307-9395561"
    }, "View or edit your browsing history"))), /* @__PURE__ */ React.createElement("span", {
      className: "no-rvi-message"
    }, "After viewing product detail pages, look here to find an easy way to navigate back to pages you are interested in."))))), /* @__PURE__ */ React.createElement("br", null))), /* @__PURE__ */ React.createElement("div", {
      className: "navLeftFooter nav-sprite-v1",
      id: "navFooter"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "#nav-top",
      id: "navBackToTop",
      "aria-label": "Back to top"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "navFooterBackToTop"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "navFooterBackToTopText"
    }, "Back to top"))), /* @__PURE__ */ React.createElement("div", {
      className: "navFooterVerticalColumn navAccessibility",
      role: "presentation"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "navFooterVerticalRow navAccessibility",
      style: { display: "table-row" }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "navFooterLinkCol navAccessibility"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "navFooterColHead"
    }, "Get to Know Us"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", {
      className: "nav_first"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.amazon.jobs",
      className: "nav_a"
    }, "Careers")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://blog.aboutamazon.com/?utm_source=gateway&utm_medium=footer&token=about",
      className: "nav_a"
    }, "Blog")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.aboutamazon.com/?utm_source=gateway&utm_medium=footer&token=about",
      className: "nav_a"
    }, "About Amazon")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://sustainability.aboutamazon.com/?utm_source=gateway&utm_medium=footer&ref_=susty_footer",
      className: "nav_a"
    }, "Sustainability")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.amazon.com/pr",
      className: "nav_a"
    }, "Press Center")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.amazon.com/ir",
      className: "nav_a"
    }, "Investor Relations")), /* @__PURE__ */ React.createElement("li", {
      className: "nav_last "
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/browse.html?node=2102313011&ref_=footer_devices",
      className: "nav_a"
    }, "Amazon Devices")))), /* @__PURE__ */ React.createElement("div", {
      className: "navFooterColSpacerInner navAccessibility"
    }), /* @__PURE__ */ React.createElement("div", {
      className: "navFooterLinkCol navAccessibility"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "navFooterColHead"
    }, "Make Money with Us"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", {
      className: "nav_first"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://sell.amazon.com/?ld=AZFSSOA&ref_=footer_soa",
      className: "nav_a"
    }, "Sell products on Amazon")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://developer.amazon.com",
      className: "nav_a"
    }, "Sell apps on Amazon")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://affiliate-program.amazon.com/",
      className: "nav_a"
    }, "Become an Affiliate")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.fountain.com/jobs/amazon-delivery-service-partner?utm_source=amazon.com&utm_medium=footer",
      className: "nav_a"
    }, "Become a Delivery Driver")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://logistics.amazon.com/marketing?utm_source=amzn&utm_medium=footer&utm_campaign=home",
      className: "nav_a"
    }, "Start a package delivery business")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://advertising.amazon.com/?ref=ext_amzn_ftr",
      className: "nav_a"
    }, "Advertise Your Products")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/seller-account/mm-summary-page.html?ld=AZFooterSelfPublish&topic=200260520&ref_=footer_publishing",
      className: "nav_a"
    }, "Self-Publish with Us")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.amazon.com/b/?node=13853235011",
      className: "nav_a"
    }, "Host an Amazon Hub")), /* @__PURE__ */ React.createElement("li", {
      className: "nav_last nav_a_carat"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "nav_a_carat"
    }, "\u203A"), /* @__PURE__ */ React.createElement("a", {
      href: "/b/?node=18190131011&ld=AZUSSOA-seemore&ref_=footer_seemore",
      className: "nav_a"
    }, "See More Ways to Make Money")))), /* @__PURE__ */ React.createElement("div", {
      className: "navFooterColSpacerInner navAccessibility"
    }), /* @__PURE__ */ React.createElement("div", {
      className: "navFooterLinkCol navAccessibility"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "navFooterColHead"
    }, "Amazon Payment Products"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", {
      className: "nav_first"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/iss/credit/rewardscardmember?plattr=CBFOOT&ref_=footer_cbcc",
      className: "nav_a"
    }, "Amazon Rewards Visa Signature Cards")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/credit/storecard/member?plattr=PLCCFOOT&ref_=footer_plcc",
      className: "nav_a"
    }, "Amazon.com Store Card")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/product/B084KP3NG6?plattr=SCFOOT&ref_=footer_ACB",
      className: "nav_a"
    }, "Amazon Secured Card")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/dp/B07984JN3L?plattr=ACOMFO&ie=UTF-8",
      className: "nav_a"
    }, "Amazon Business Card")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/dp/B07CBJQS16?pr=ibprox&plattr=CCLFOOT&place=camp&ie=UTF-8&ref_=footer_ccl",
      className: "nav_a"
    }, "Amazon Business Line of Credit")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/browse.html?node=16218619011&ref_=footer_swp",
      className: "nav_a"
    }, "Shop with Points")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/browse.html?node=3561432011&ref_=footer_ccmp",
      className: "nav_a"
    }, "Credit Card Marketplace")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/browse.html?node=10232440011&ref_=footer_reload_us",
      className: "nav_a"
    }, "Reload Your Balance")), /* @__PURE__ */ React.createElement("li", {
      className: "nav_last "
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/browse.html?node=388305011&ref_=footer_tfx",
      className: "nav_a"
    }, "Amazon Currency Converter")))), /* @__PURE__ */ React.createElement("div", {
      className: "navFooterColSpacerInner navAccessibility"
    }), /* @__PURE__ */ React.createElement("div", {
      className: "navFooterLinkCol navAccessibility"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "navFooterColHead"
    }, "Let Us Help You"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", {
      className: "nav_first"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/help/customer/display.html?nodeId=GDFU3JS5AL6SYHRD&ref_=footer_covid",
      className: "nav_a"
    }, "Amazon and COVID-19")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.amazon.com/gp/css/homepage.html?ref_=footer_ya",
      className: "nav_a"
    }, "Your Account")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.amazon.com/gp/css/order-history?ref_=footer_yo",
      className: "nav_a"
    }, "Your Orders")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/help/customer/display.html?nodeId=468520&ref_=footer_shiprates",
      className: "nav_a"
    }, "Shipping Rates & Policies")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/prime?ref_=footer_prime",
      className: "nav_a"
    }, "Amazon Prime")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/css/returns/homepage.html?ref_=footer_hy_f_4",
      className: "nav_a"
    }, "Returns & Replacements")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/hz/mycd/myx?ref_=footer_myk",
      className: "nav_a"
    }, "Manage Your Content and Devices")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/BIT/ref=footer_bit_v2_us_A0029?bitCampaignCode=A0029",
      className: "nav_a"
    }, "Amazon Assistant")), /* @__PURE__ */ React.createElement("li", {
      className: "nav_last "
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/help/customer/display.html?nodeId=508510&ref_=footer_gw_m_b_he",
      className: "nav_a"
    }, "Help")))))), /* @__PURE__ */ React.createElement("div", {
      className: "nav-footer-line"
    }), /* @__PURE__ */ React.createElement("div", {
      className: "navFooterLine navFooterLinkLine navFooterPadItemLine"
    }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("div", {
      className: "navFooterLine navFooterLogoLine"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/?ref_=footer_logo"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "nav-logo-base nav-sprite"
    })))), /* @__PURE__ */ React.createElement("span", {
      className: "icp-container-desktop"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "navFooterLine"
    }, /* @__PURE__ */ React.createElement("style", {
      type: "text/css",
      dangerouslySetInnerHTML: {
        __html: "\n  #icp-touch-link-language { display: none; }\n"
      }
    }), /* @__PURE__ */ React.createElement("a", {
      href: "/gp/customer-preferences/select-language/ref=footer_lang?ie=UTF8&preferencesReturnUrl=%2F",
      className: "icp-button",
      id: "icp-touch-link-language"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "icp-nav-globe-img-2 icp-button-globe-2"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "icp-color-base"
    }, "English"), /* @__PURE__ */ React.createElement("span", {
      className: "nav-arrow icp-up-down-arrow"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "aok-hidden",
      style: { display: "none" }
    }, "Choose a language for shopping.")), /* @__PURE__ */ React.createElement("style", {
      type: "text/css",
      dangerouslySetInnerHTML: {
        __html: "\n#icp-touch-link-country { display: none; }\n"
      }
    }), /* @__PURE__ */ React.createElement("a", {
      href: "/customer-preferences/country?ie=UTF8&preferencesReturnUrl=%2F&ref_=footer_icp_cp",
      className: "icp-button",
      id: "icp-touch-link-country"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "icp-flag-3 icp-flag-3-us"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "icp-color-base"
    }, "United States"), /* @__PURE__ */ React.createElement("span", {
      className: "aok-hidden",
      style: { display: "none" }
    }, "Choose a country/region for shopping."))))), /* @__PURE__ */ React.createElement("div", {
      className: "navFooterLine navFooterLinkLine navFooterDescLine",
      role: "navigation",
      "aria-lable": "More on Amazon.com"
    }, /* @__PURE__ */ React.createElement("table", {
      className: "navFooterMoreOnAmazon",
      cellSpacing: 0
    }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://music.amazon.com?ref=dm_aff_amz_com",
      className: "nav_a"
    }, "Amazon Music", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Stream millions", /* @__PURE__ */ React.createElement("br", null), "of songs"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://advertising.amazon.com/?ref=footer_advtsing_amzn_com",
      className: "nav_a"
    }, "Amazon Advertising", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Find, attract, and", /* @__PURE__ */ React.createElement("br", null), "engage customers"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/browse.html?node=15547130011&ref_=_us_footer_drive",
      className: "nav_a"
    }, "Amazon Drive", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Cloud storage", /* @__PURE__ */ React.createElement("br", null), "from Amazon"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.6pm.com",
      className: "nav_a"
    }, "6pm", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Score deals", /* @__PURE__ */ React.createElement("br", null), "on fashion brands"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.abebooks.com",
      className: "nav_a"
    }, "AbeBooks", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Books, art", /* @__PURE__ */ React.createElement("br", null), "& collectibles"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.acx.com/",
      className: "nav_a"
    }, "ACX ", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Audiobook Publishing", /* @__PURE__ */ React.createElement("br", null), "Made Easy"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.alexa.com",
      className: "nav_a"
    }, "Alexa", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Actionable Analytics", /* @__PURE__ */ React.createElement("br", null), "for the Web")))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "\xA0")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://sell.amazon.com/?ld=AZUSSOA-footer-aff&ref_=footer_sell",
      className: "nav_a"
    }, "Sell on Amazon", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Start a Selling Account"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/business?ref_=footer_retail_b2b",
      className: "nav_a"
    }, "Amazon Business", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Everything For", /* @__PURE__ */ React.createElement("br", null), "Your Business"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/alm/storefront?almBrandId=QW1hem9uIEZyZXNo&ref_=footer_aff_fresh",
      className: "nav_a"
    }, "Amazon Fresh", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Groceries & More", /* @__PURE__ */ React.createElement("br", null), "Right To Your Door"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/browse.html?node=230659011&ref_=footer_amazonglobal",
      className: "nav_a"
    }, "AmazonGlobal", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Ship Orders", /* @__PURE__ */ React.createElement("br", null), "Internationally"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/services?ref_=footer_services",
      className: "nav_a"
    }, "Home Services", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Experienced Pros", /* @__PURE__ */ React.createElement("br", null), "Happiness Guarantee"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://ignite.amazon.com/?ref=amazon_footer_ignite",
      className: "nav_a"
    }, "Amazon Ignite", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Sell your original", /* @__PURE__ */ React.createElement("br", null), "Digital Educational", /* @__PURE__ */ React.createElement("br", null), "Resources"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://aws.amazon.com/what-is-cloud-computing/?sc_channel=EL&sc_campaign=amazonfooter",
      className: "nav_a"
    }, "Amazon Web Services", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Scalable Cloud", /* @__PURE__ */ React.createElement("br", null), "Computing Services")))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "\xA0")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.audible.com",
      className: "nav_a"
    }, "Audible", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Listen to Books & Original", /* @__PURE__ */ React.createElement("br", null), "Audio Performances"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.bookdepository.com",
      className: "nav_a"
    }, "Book Depository", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Books With Free", /* @__PURE__ */ React.createElement("br", null), "Delivery Worldwide"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.boxofficemojo.com/?ref_=amzn_nav_ftr",
      className: "nav_a"
    }, "Box Office Mojo", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Find Movie", /* @__PURE__ */ React.createElement("br", null), "Box Office Data"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.comixology.com",
      className: "nav_a"
    }, "ComiXology", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Thousands of", /* @__PURE__ */ React.createElement("br", null), "Digital Comics"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.dpreview.com",
      className: "nav_a"
    }, "DPReview", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Digital", /* @__PURE__ */ React.createElement("br", null), "Photography"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.eastdane.com/welcome",
      className: "nav_a"
    }, "East Dane", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Designer Men's", /* @__PURE__ */ React.createElement("br", null), "Fashion"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.fabric.com",
      className: "nav_a"
    }, "Fabric", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Sewing, Quilting", /* @__PURE__ */ React.createElement("br", null), "& Knitting")))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "\xA0")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.goodreads.com",
      className: "nav_a"
    }, "Goodreads", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Book reviews", /* @__PURE__ */ React.createElement("br", null), "& recommendations"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.imdb.com",
      className: "nav_a"
    }, "IMDb", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Movies, TV", /* @__PURE__ */ React.createElement("br", null), "& Celebrities"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://pro.imdb.com?ref_=amzn_nav_ftr",
      className: "nav_a"
    }, "IMDbPro", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Get Info Entertainment", /* @__PURE__ */ React.createElement("br", null), "Professionals Need"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://kdp.amazon.com",
      className: "nav_a"
    }, "Kindle Direct Publishing", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Indie Digital & Print Publishing", /* @__PURE__ */ React.createElement("br", null), "Made Easy"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/browse.html?node=13234696011&ref_=_gno_p_foot",
      className: "nav_a"
    }, "Amazon Photos", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Unlimited Photo Storage", /* @__PURE__ */ React.createElement("br", null), "Free With Prime"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://videodirect.amazon.com/home/landing",
      className: "nav_a"
    }, "Prime Video Direct", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Video Distribution", /* @__PURE__ */ React.createElement("br", null), "Made Easy"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.shopbop.com/welcome",
      className: "nav_a"
    }, "Shopbop", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Designer", /* @__PURE__ */ React.createElement("br", null), "Fashion Brands")))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "\xA0")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/browse.html?node=10158976011&ref_=footer_wrhsdls",
      className: "nav_a"
    }, "Amazon Warehouse", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Great Deals on", /* @__PURE__ */ React.createElement("br", null), "Quality Used Products", " "))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.wholefoodsmarket.com",
      className: "nav_a"
    }, "Whole Foods Market", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "America\u2019s Healthiest", /* @__PURE__ */ React.createElement("br", null), "Grocery Store"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.woot.com/",
      className: "nav_a"
    }, "Woot!", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Deals and ", /* @__PURE__ */ React.createElement("br", null), "Shenanigans"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.zappos.com",
      className: "nav_a"
    }, "Zappos", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Shoes &", /* @__PURE__ */ React.createElement("br", null), "Clothing"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://ring.com",
      className: "nav_a"
    }, "Ring", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Smart Home", /* @__PURE__ */ React.createElement("br", null), "Security Systems"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://eero.com/",
      className: "nav_a"
    }, "eero WiFi", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Stream 4K Video", /* @__PURE__ */ React.createElement("br", null), "in Every Room"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://blinkforhome.com/?ref=nav_footer",
      className: "nav_a"
    }, "Blink", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Smart Security", /* @__PURE__ */ React.createElement("br", null), "for Every Home")))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "\xA0")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, "\xA0"), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://shop.ring.com/pages/neighbors-app",
      className: "nav_a"
    }, "Neighbors App ", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, " ", "Real-Time Crime", /* @__PURE__ */ React.createElement("br", null), "& Safety Alerts"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/browse.html?node=14498690011&ref_=amzn_nav_ftr_swa",
      className: "nav_a"
    }, "Amazon Subscription Boxes", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Top subscription boxes \u2013 right to your door"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "https://www.pillpack.com",
      className: "nav_a"
    }, "PillPack", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Pharmacy Simplified"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/browse.html?node=12653393011&ref_=footer_usrenew",
      className: "nav_a"
    }, "Amazon Renewed", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "navFooterDescText"
    }, "Like-new products", /* @__PURE__ */ React.createElement("br", null), "you can trust"))), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescSpacer",
      style: { width: "4%" }
    }), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, "\xA0"), /* @__PURE__ */ React.createElement("td", {
      className: "navFooterDescItem"
    }, "\xA0"))))), /* @__PURE__ */ React.createElement("div", {
      className: "navFooterLine navFooterLinkLine navFooterPadItemLine navFooterCopyright"
    }, /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", {
      className: "nav_first"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/help/customer/display.html?nodeId=508088&ref_=footer_cou",
      className: "nav_a"
    }, "Conditions of Use")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "/gp/help/customer/display.html?nodeId=468496&ref_=footer_privacy",
      className: "nav_a"
    }, "Privacy Notice")), /* @__PURE__ */ React.createElement("li", {
      className: "nav_last"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "/interestbasedads/ref=footer_iba",
      className: "nav_a"
    }, "Interest-Based Ads"))), /* @__PURE__ */ React.createElement("span", null, "\xA9 1996-2022, Amazon.com, Inc. or its affiliates"))), /* @__PURE__ */ React.createElement("div", {
      id: "sis_pixel_r2",
      "aria-hidden": "true",
      style: {
        height: 1,
        position: "absolute",
        left: "-1000000px",
        top: "-1000000px"
      }
    }), /* @__PURE__ */ React.createElement("img", {
      src: "https://assoc-na.associates-amazon.com/abid/um?s=135-7631307-9395561&m=ATVPDKIKX0DER",
      style: { display: "none" },
      alt: true
    }), /* @__PURE__ */ React.createElement("div", {
      id: "be",
      style: { display: "none", visibility: "hidden" }
    }, /* @__PURE__ */ React.createElement("form", {
      name: "ue_backdetect",
      action: "get"
    }, /* @__PURE__ */ React.createElement("input", {
      type: "hidden",
      name: "ue_back",
      defaultValue: 1
    }))), /* @__PURE__ */ React.createElement("noscript", null, `<img height="1" width="1" style='display:none;visibility:hidden;' src='//fls-na.amazon.com/1/batch/1/OP/ATVPDKIKX0DER:135-7631307-9395561:G20VCH14K5VY7ZT71W9K$uedata=s:%2Frd%2Fuedata%3Fnoscript%26id%3DG20VCH14K5VY7ZT71W9K:0' alt=""/>`)));
  }
});

// index.js
var fs = require("fs");
var benchmark = require_benchmark();
var mustache = require_mustache();
var react = require_server();
var html = fs.readFileSync("./content.html", "utf8");
var vdom = require_content();
var suite = new benchmark.Suite();
suite.add("React VDOM", function() {
  react.renderToString(vdom);
}).add("Mustache", function() {
  mustache.render(html, {});
}).add("Mustache no template cache", function() {
  mustache.templateCache = void 0;
  mustache.render(html, {});
}).on("cycle", function(event) {
  console.log(String(event.target));
}).on("complete", function() {
  console.log("Fastest is " + this.filter("fastest").map("name"));
}).run();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*!
 * Benchmark.js <https://benchmarkjs.com/>
 * Copyright 2010-2016 Mathias Bynens <https://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <https://mths.be/mit>
 */
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
/** @license React v17.0.2
 * react-dom-server.node.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-dom-server.node.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
