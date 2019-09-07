import * as httpError from 'http-errors';

export const requireAdmin = () => {
  return (request, response, next) => {
    const usr = request.user;

    if (usr && usr.role === 'admin') {
      next();
    } else {
      const err = new httpError(401);
      response.status(401).send(err);
    }
  };
};
