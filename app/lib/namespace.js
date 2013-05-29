/*global window */
/*
    global function to add items to the global namespace and cut down on boilerplate code,
    cache the known namespaces in window.namespaces to avoid re-parsing the string
*/
var namespaces = []; // cache the known namespace strings
function namespace(ns) {
    'use strict';
 
    if (namespaces.indexOf(ns) === -1) {
        var segments = ns.split(".").reverse(),
            /*
                Inner recursive function to add a new object if not defined
            */
            createSegment = function (segments, currentSegment) {
                if (segments.length === 0) {
                    return;
                }
                var segment = segments.pop();
                // prevent overwriting of existing segment
                if(currentSegment[segment] === undefined) {
                    currentSegment[segment] = {};
                }
                createSegment(segments, currentSegment[segment]);
            };
        namespaces.push(ns);
        createSegment(segments, window);
    }
}