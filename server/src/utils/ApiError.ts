// A small typed error so route/service code can throw `new ApiError(502, '...')`
// and the central error handler knows exactly what HTTP status to respond with,
// instead of every unexpected error collapsing into a generic 500.
export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}
