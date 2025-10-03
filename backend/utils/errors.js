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
    super(message, { status: 404, code: 'NOT_FOUND', details }) // <- fix code
  }
}

class TokenError extends AppError {
  constructor(message = 'Token Invalid', details) {
    super(message, { status: 401, code: 'TOKEN_ERROR', details })
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', details) {
    super(message, { status: 403, code: 'ACCESS_FORBIDDEN', details })
  }
}

class ValidationError extends AppError {
  constructor(message = 'ValidationError', details) {
    super(message, { status: 400, code: 'VALIDATION_ERROR', details })
  }
}

module.exports = { AppError, NotFoundError, TokenError, ForbiddenError, ValidationError }