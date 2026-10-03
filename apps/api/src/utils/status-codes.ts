/**
 * Standard HTTP Status Codes.
 * Used to indicate the outcome of an HTTP request.
 */
enum STATUS {
  /**
   * The request has succeeded.
   * Standard response for successful HTTP requests.
   */
  OK = 200,

  /**
   * The request has succeeded and a new resource has been created as a result.
   */
  CREATED = 201,

  /**
   * The request has been received but not yet acted upon.
   * Typically used for asynchronous processing or batch jobs.
   */
  ACCEPTED = 202,

  /**
   * There is no content to send for this request, but the headers may be useful.
   */
  NO_CONTENT = 204,

  /**
   * The URL of the requested resource has been changed permanently.
   * The new URL is given in the response.
   */
  MOVED_PERMANENTLY = 301,

  /**
   * The requested resource resides temporarily under a different URI.
   */
  FOUND = 302,

  /**
   * Indicates to the client that the response has not been modified,
   * so the client can continue to use the same cached version of the response.
   */
  NOT_MODIFIED = 304,

  /**
   * The server cannot or will not process the request due to something
   * that is perceived to be a client error (e.g., malformed request syntax).
   */
  BAD_REQUEST = 400,

  /**
   * The client must authenticate itself to get the requested response.
   */
  UNAUTHORIZED = 401,

  /**
   * The client does not have access rights to the content.
   * unlike 401 Unauthorized, the client's identity is known to the server.
   */
  FORBIDDEN = 403,

  /**
   * The server cannot find the requested resource.
   */
  NOT_FOUND = 404,

  /**
   * The request conflicts with the current state of the server.
   */
  CONFLICT = 409,

  /**
   * The server understands the content type of the request entity,
   * but was unable to process the contained instructions (e.g., validation errors).
   */
  UNPROCESSABLE_ENTITY = 422,

  /**
   * The user has sent too many requests in a given amount of time ("rate limiting").
   */
  TOO_MANY_REQUESTS = 429,

  /**
   * The server has encountered a situation it does not know how to handle.
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * The server, while working as a gateway or proxy, got an invalid response
   * from the upstream server.
   */
  BAD_GATEWAY = 502,

  /**
   * The server is not ready to handle the request.
   * Common causes are a server that is down for maintenance or that is overloaded.
   */
  SERVICE_UNAVAILABLE = 503,

  /**
   * The server, while acting as a gateway or proxy, did not get a response
   * in time from the upstream server.
   */
  GATEWAY_TIMEOUT = 504,
}

export { STATUS }
