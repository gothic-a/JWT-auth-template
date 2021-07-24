import { Router } from 'express'

import userController from '../controllers/userController.js'
const { registration, login, logout, activate, refresh, getUsers } = userController

const router = Router()

router.route('/registration').post(registration)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/activate/:link').get(activate)
router.route('/refresh').get(refresh)
router.route('/').get(getUsers)

export default router
