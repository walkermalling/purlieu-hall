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
  var input = parseCommand(input);
  if (actions.hasOwnProperty(input.command)) {
    actions[input.command].apply(null, input.args);
  } else {
    console.log('menu has no action "' + input.command + '"');
  }
}

function parseCommand (str) {
  if (!str) {
    return false;
  }

  var result = {};
  var input = str.trim().split(' ');
  
  result.command = input.shift().trim();
  result.args = [];

  var re = /--/;
  
  input.forEach(function (arg) {
    var argObj = {};
    var arg = arg.trim();
    if (/--/.test(arg) && /\:/.test(arg)) {
      arg = arg.replace('--', '').split(':')
      argObj[arg[0]] = arg[1];
      result.args.push(argObj);
    }
  });
  console.log(result);
  return result;
}

listen();



