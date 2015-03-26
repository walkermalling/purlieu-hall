'use strict';
var actions = require('./actions');

function listen (flag) {
  if (flag === false) {
    console.log('goodbye');
    process.exit();
  }
  actions['printOptions'].call();
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', bus);
}

function bus (input) {
  var args = parseCommand(input);
  if (actions.hasOwnProperty(args[1])) {
    console.log(args);
    actions[args[1]].apply(this, args);
  } else {
    console.log('menu has no action "' + args[1] + '"');
  }
}

function parseCommand (str) {
  if (!str) {
    return false;
  }

  var result = [];
  var input = str.trim().split(' ');
  
  result[0] = function done () {
    console.log('Done.\n');
    actions.options.call();
  };
  result[1] = input.shift().trim();
  result[2] = []; // array of argument objects
  
  input.forEach(function (arg) {
    var argObj = {};
    var arg = arg.trim();
    if (/--/.test(arg) && /\:/.test(arg)) {
      arg = arg.replace('--', '').split(':');
      argObj[arg[0]] = arg[1];
      result[2].push(argObj);
    }
  });
  return result;
}

listen();