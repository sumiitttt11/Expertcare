import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

interface MiddlewareOptions {
  validations: ValidationChain[];
}

const validateRequest = ({ validations }: MiddlewareOptions) => {
  if (!Array.isArray(validations) || validations.length === 0) {
    throw new Error("Validations must be a non-empty array of ValidationChain.");
  }

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
