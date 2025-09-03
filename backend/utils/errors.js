class AppError extends Error {
  constructor(message, { status = 500, code = 'INTERNAL_ERROR', details } = {}) {
    super(message)
    this.status = status
    this.code = code
    this.details = details
    this.isOperational = true
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not Found', details) {
    super(message, { status: 401, code: 'AUTH_ERROR', details })
  }
}

module.exports = { AppError, NotFoundError }