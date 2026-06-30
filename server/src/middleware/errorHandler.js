export const notFoundHandler = (_request, response) => {
  response.status(404).json({ message: 'API route not found.' });
};

export const errorHandler = (error, _request, response, _next) => {
  console.error(error);
  response.status(error.status || 500).json({
    message: error.status ? error.message : 'An unexpected server error occurred.'
  });
};
