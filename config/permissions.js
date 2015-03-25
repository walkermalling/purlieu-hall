var permissionTypes = [
  'guest',
  'member',
  'dodo',
  'admin'
];

function validate (type) {
  if (permissionTypes.indexOf(type) !== -1) {
    return true;
  } else {
    return false;
  }
}

module.exports.validate = validate;
module.exports = permissionTypes;