import createError from 'http-errors';

module.exports = {
  notFound (req, res, next) {
    const httpError = createError(404, 'Resource not found')
    next(httpError)
  },
// eslint-disable-next-line no-unused-vars
  errorResponse (err, req, res, next) {

    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error
    res.status(err.status || 500)
    res.json(err)
  }
}
