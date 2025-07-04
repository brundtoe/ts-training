// noinspection JSUnusedLocalSymbols

export default function (err, req, res, _next) {
  let actual = {}

  if (err.error) {
    actual.error = err.error
  } else {
    actual = {
      error: {
        type: err.type || 'APPLICATION_ERROR',
        description:
          [ err.message,
            req.url ]
      }
    }
  }

  // render the error
  res.status(err.status || 500)
  res.json(actual)
}
