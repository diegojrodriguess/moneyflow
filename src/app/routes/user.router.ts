import { Request, Response, Router } from "express";
import { UserController } from "../controller/UserController";
import { UserService } from "../service/UserService";
import { UserRepository } from "../repositories/UserRepository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const express = require('express')
const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    return userController.getAllUsers(req, res);
}
)

router.get('/:id', (req: Request, res: Response) => {
    return userController.getUserById(req, res);
}
)

router.post('/', (req: Request, res: Response) => {
    return userController.createUser(req, res);
}
)

router.put('/:id', (req: Request, res: Response) => {
    return userController.updateUser(req, res);
}
)

router.delete('/:id', (req: Request, res: Response) => {
    return userController.deleteUser(req, res);
}
)



