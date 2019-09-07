import * as httpError from 'http-errors';

export const requireOwner = () => {
  return (request, response, next) => {
    const usrID = request.user._id.toString();
    const toDoOwnwer = request.body.uid.toString();

    if (usrID === toDoOwnwer) {
      next();
    } else {
      const err = new httpError(401);
      response.status(401).send(err);
    }
  };
};
