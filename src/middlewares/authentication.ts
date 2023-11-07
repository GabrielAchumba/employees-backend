import { Constants } from "../utilities/constants"
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'No token, login to continue' });
    }

    const token = authorization.split(" ")

    if(token.length<2){
        
      return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Bad token format, login to continue' });
    }

    const isValid = verify(token[1], Constants.JWT_SECRET);
    if (!isValid) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials, login to continue' });
    }

    next();
  }
}