import { Request, Response, NextFunction } from 'express'
import {GetRepositoriesState} from '../services/repository.services'

export const getData = function  (req: Request, 
    res: Response,
    next: NextFunction) {
    var repositoriesState = GetRepositoriesState();
    setTimeout(function() {
      res.status(200).json(
        repositoriesState,
    );
    }, 100);
  };