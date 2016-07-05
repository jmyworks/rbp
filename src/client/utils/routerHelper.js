/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

var routerHelper = (options = {match: '', path: '', index: null, children: []}) => {
    let isRoot = (options.match === '' && options.path === '');
    let relativeToComponentDir = options.path;

    let getRoutesFunc = (_routes) => {
        return (state, cb) => {
            require.ensure([], (require) => {
                // require each route's component
                let required = [];

                if (_routes instanceof Array) {
                    _routes.forEach((route) => {
                        if (isRoot) {
                            required.push(require('../components/' + route + '/route.js'));
                        } else {
                            required.push(require('../components/' + relativeToComponentDir + '/' + route + '/route.js'));
                        }
                    });
                }

                // if root, add the not found router
                if (isRoot) {
                    required.push(require('../components/NotFoundPage.js'));
                }

                cb(null, required);
            });
        };
    };

    let getComponentsFunc = (_relative) => {
        return (nextState, cb) => {
            require.ensure([], (require) => {
                if (!isRoot) {
                    cb(null, require('../components/' + _relative + '/view.js'));
                }
            });
        };
    };

    let getIndexRouteFunc = (_relative, _index) => {
        return _index ? (partialNextState, cb) => {
            require.ensure([], (require) => {
                if (!isRoot) {
                    cb(null, require('../components/' + _relative + '/' + _index + '/route.js'));
                }
            });
        } : null;
    };

    return {
        getChildRoutes: getRoutesFunc(options.children),
        getComponents: getComponentsFunc(relativeToComponentDir),
        getIndexRoute: getIndexRouteFunc(relativeToComponentDir, options.index),
        path: options.match
    };
};

module.exports = routerHelper;
