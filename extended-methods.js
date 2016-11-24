const _createMethod = function(method, beforeHooks = [], afterHooks = []) {
    let allBeforeHooks = beforeHooks;
    let allAfterHooks = afterHooks;
    if (!Array.isArray(allBeforeHooks)) allBeforeHooks = [beforeHooks];
    if (!Array.isArray(allAfterHooks)) allAfterHooks = [afterHooks];
    return function(...args) {
        allBeforeHooks.forEach((hook) => hook.call(this, method.name));
        method.apply(this, args);
        allAfterHooks.forEach((hook) => hook.call(this, method.name));
    };
};

Meteor.extendedMethods = function(methods, beforeHooks, afterHooks) {
    const methodMap = {};
    let method = function() {};
    for (const key in methods) { // eslint-disable-line
        if (methods.hasOwnProperty(key)) {
            method = _createMethod(methods[key], beforeHooks, afterHooks);
            methodMap[key] = method;
        }
    }
    Meteor.methods(methodMap);
};
