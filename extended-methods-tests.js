// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by extended-methods.js.
import { name as packageName } from "meteor/kosst:extended-methods";

// Write your tests here!
// Here is an example.
Tinytest.add('extended-methods - example', function (test) {
  test.equal(packageName, "extended-methods");
});
