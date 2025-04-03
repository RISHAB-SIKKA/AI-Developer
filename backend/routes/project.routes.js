import {Router} from 'express';
const router = Router();
import {body} from 'express-validator';
import * as projectController from '../controller/project.controller.js';
import * as authMiddleWare from '../middleware/auth.middleware.js'

router.post('/create',
    authMiddleWare.authUser,
    body('name').isString().withMessage("Name is required!"),
    projectController.createProject
 )

 router.get('/all', 
    authMiddleWare.authUser,
    projectController.getAllProjects
 )

 router.put('/add-user', 
    authMiddleWare.authUser,
    body('projectId').isString().withMessage('ProjectId is required'),
    body('users').isArray({min: 1}).withMessage('Users must be an array of strings').bail()
    .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
    projectController.addUserToProject
 )

export default router;
