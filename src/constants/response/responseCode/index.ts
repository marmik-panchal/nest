export const HttpResponse: Record<string, string> = {
  '200': 'OK',

  // SUCCESS
  '201': 'Created',
  '202': 'Accepted',
  '204': 'No Content',

  // REDIRECTION
  '301': 'Move Permanently',
  '302': 'Found',
  '304': 'Not Modified',
  '307': 'Temporary Redirect',
  '308': 'Permanent Redirect',

  // CLIENT ERROR
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Not Allowed Method',
  '406': 'Not Acceptable',
  '413': 'Payload To Large',
  '414': 'Uri To Large',
  '415': 'Unsupported Media Type',
  '422': 'Unprocessable Entity',
  '429': 'Too Many Request',

  // SERVER ERROR
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
};
