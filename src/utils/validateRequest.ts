import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

interface MiddlewareOptions {
  validations: ValidationChain[];
}

const validateRequest = (middlewareOptions: MiddlewareOptions) => {
  const { validations } = middlewareOptions;

  return [
    ...validations,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

export default validateRequest;