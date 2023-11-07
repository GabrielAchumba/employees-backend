import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User, UserDocument } from '../models/user.model';
import { UserService } from '../services/user.service';
import { EmailConfirmationService } from '../services/emailConfirmation.service';
import { CONTROLLER, GET_USERS, GET_USER,
    STORE, DELETE, LOGIN } from "../routes/user.route";

@Controller(CONTROLLER)
export class UserController {

    constructor(
        private readonly userService: UserService) {

    }

    @Post(LOGIN)
    async login(@Body() user: User) {
        return await this.userService.login(user);
    }

    @Post(STORE)
    async create(@Body() user: User) {
        const user_ =  await this.userService.store(user);
        return user_;
    }

    @Get(GET_USER)
    findOne(@Param('id') id: string): Promise<UserDocument> {
        return this.userService.findOne(id);
    }
  
    @Get(GET_USERS)
    async findAll(): Promise<UserDocument[]> {
        console.log("findAll")
        const ans = await this.userService.findAll()
        console.log("SEEN")
        return ans;
    }

    @Delete(DELETE)
    remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    } 
}
