import { Router } from 'express';
import { companyRoutes } from './companyRoutes';
import { employeeRoutes } from './employeeRoutes';

const routes = Router();

routes.use('/companies', companyRoutes);
routes.use('/employees', employeeRoutes);

export { routes };
