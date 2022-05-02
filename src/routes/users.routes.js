import { Router } from 'express'
import { getUser, getUsers, addUser, deleteUser, updateUser } from '../controllers/users.controllers'


const routes = Router()

routes.get('/',getUsers)
routes.get('/:id',getUser)
routes.post('/',addUser)
routes.put('/:id',updateUser)
routes.delete('/:id',deleteUser)

export default routes