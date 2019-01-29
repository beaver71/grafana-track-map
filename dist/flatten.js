"use strict";

System.register([], function (_export, _context) {
    "use strict";

    /**
     * JSON flatten/unflatten utils.
     * 
     */

    function test() {
        console.log("test");
    }

    _export("test", test);

    return {
        setters: [],
        execute: function () {
            JSON.unflatten = function (data) {
                "use strict";

                if (Object(data) !== data || Array.isArray(data)) return data;
                var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
                    resultholder = {};
                for (var p in data) {
                    var cur = resultholder,
                        prop = "",
                        m;
                    while (m = regex.exec(p)) {
                        cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
                        prop = m[2] || m[1];
                    }
                    cur[prop] = data[p];
                }
                return resultholder[""];
            };

            JSON.flatten = function (data) {
                var result = {};
                function recurse(cur, prop) {
                    if (Object(cur) !== cur) {
                        result[prop] = cur;
                    } else if (Array.isArray(cur)) {
                        for (var i = 0, l = cur.length; i < l; i++) {
                            recurse(cur[i], prop + "[" + i + "]");
                        }if (l == 0) result[prop] = [];
                    } else {
                        var isEmpty = true;
                        for (var p in cur) {
                            isEmpty = false;
                            recurse(cur[p], prop ? prop + "." + p : p);
                        }
                        if (isEmpty) result[prop] = {};
                    }
                }
                recurse(data, "");
                return result;
            };
        }
    };
});
//# sourceMappingURL=flatten.js.map
