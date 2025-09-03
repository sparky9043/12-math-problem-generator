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
    super(message, { status: 404, code: 'AUTH_ERROR', details })
  }
}

class TokenError extends AppError {
  constructor(message = 'Token Invalid', details) {
    super(message, { status: 401, code: 'TOKEN_ERROR', details })
  }
}

module.exports = { AppError, NotFoundError, TokenError }