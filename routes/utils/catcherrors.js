// catch async await promise rejections
exports.catcherrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};
