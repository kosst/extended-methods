# Extended Meteor Methods

Create several Meteor methods with the same before and after hooks.

Useful in situations where you want to execute one or more functions before
and/or after methods, e.g. check for userId, roles, create logs etc.

## Install

`meteor add kosst:extended-methods`

## Usage

Define your methods with `Meteor.extendedMethods()` instead of
`Meteor.methods()` and pass before and after hooks as parameters:

`Meteor.extendedMethods({ ... }, beforeHooks, afterHooks);`

Call your methods via `Meteor.call()` as usual.

When yo call your method, all passed functions are
**executed in sequence before and after the method**.

Inside your functions, `this` is bound to the context of the method, so you have
access to `this.userId` etc.

Example for using with
[alanning:roles](https://github.com/alanning/meteor-roles) package:

```
const isAdminHook = function(methodName) {
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
        throw new Meteor.Error('not-authorized',
            `${this.userId} not-authorized for method: ${methodName}`);
    }
};

const anotherBeforeHook = function(methodName) {
    console.log(`Running ${methodName}...`);
};

const afterHook = function() {
    console.log('Beer collection has changed.');
};

Meteor.extendedMethods({
    updateBeerCalories(beerId, calories) {
        check(beerId, String);
        check(calories, Number);
        Beers.update(beerId, {
            $set: { calories }
        });
    },
    removeBeer(beerId) {
        check(beerId, String);
        Beers.remove(beerId);
    }
}, [isAdminHook, anotherBeforeHook], afterHook);

```

## License

MIT
