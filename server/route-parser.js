var _ = require('underscore');
/**
 * Parses target and checks if they are valid
 * 
 */
exports.parser = {
  /**
   * Checks if target route is valid
   * @param {array} routes, {string} target
   * @return boolean
   */
  isValid: function(routes, target) {
    for(var i = 0; i < routes.length; i++) {
      var route = routes[i];
      if(route === target) {
        return true;
      }
      var routeSplit = _.without(route.split('/'), "");

      var targetSplit = _.without(target.split('/'), "");
      if(routeSplit[0] === targetSplit[0] && _.contains(routeSplit, '*')) {
        return true;
      } else {
        return false;
      }
    }

  }


};