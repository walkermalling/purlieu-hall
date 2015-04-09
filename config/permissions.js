var permissionTypes = [
  'denied',
  'guest',
  'member',
  'dodo',
  'admin'
];

function validate (type) {
  if (permissionTypes.indexOf(type) <= 0) {
    return true;
  } else {
    return false;
  }
}

module.exports.validate = validate;
module.exports = permissionTypes;