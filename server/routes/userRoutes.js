import { Router } from 'express'
import userController from '../controllers/userController.js'
import { body } from 'express-validator'
import protect from '../middlewares/authMiddleware.js'

const { registration, login, logout, activate, refresh, getUsers } = userController

const router = Router()

router
    .route('/registration')
    .post(
        body('email').isEmail(), 
        body('password').isLength({min: 3, max: 24}),
        registration
    )
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/activate/:link').get(activate)
router.route('/refresh').get(refresh)
router.route('/').get(protect, getUsers)

export default router
