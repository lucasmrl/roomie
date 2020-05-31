module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err)); //"fn(req, res, next)" -> Since this function is "async", it returns a promisse. If this promisse is rejected, the "catch()" available for promisses will be called passing the error.
  };
};
