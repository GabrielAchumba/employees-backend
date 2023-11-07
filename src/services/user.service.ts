import { Injectable, NotFoundException, OnModuleInit  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt'; //genSaltSync
import { ConfigService } from '@nestjs/config';
//import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User, UserDocument } from '../models/user.model';
import { Constants } from "../utilities/constants"
//private readonly configService: ConfigService,

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>,) {

    }

    async onModuleInit() {
        const admin = {
            firstName: "admin",
            lastName: "admin",
            createdBy: "admin",
            phone: "+2347032488605",
            email: "achumba.gabriel@yahoo.com",
            password: "admin*2023",
            userType: "admin"
        } as User;
        await this.store(admin)
    }


    async login(user: User): Promise<any> {
        

        const foundUser= await this.userModel.findOne(
        { email: user.email }).exec();

        let token = undefined
        if(foundUser){
            const passwordValid = await compare(user.password, foundUser.password)
            const JWT_SECRET = '12345678901234567890123456789012';// this.configService.get('JWT_SECRET')
            if(passwordValid){
                token = sign(
                    { userId: foundUser._id, email: foundUser.email },
                    JWT_SECRET,
                    {
                        expiresIn: "2h",
                    }
                );
            }
        }

        console.log("token: ", token)
        return  {user: foundUser, token}

    }

    async store(user: User): Promise<any> {
        console.log("store user started")
        const foundUser = await this.userModel.findOne ({ email : user.email });
        
        if(foundUser == null || foundUser == undefined){
            const saltOrRounds = 10;
            const hashedPassword = await hash(user.password, saltOrRounds);
            user.password = hashedPassword;
            const newUser = new this.userModel(user);
            const createduser =  newUser.save();
            return createduser;
            
        }else{
            const updatedItem =
             await this.userModel.updateOne({email:user.email},
                user, {new: true});
            return  user
        }
    }

    async findAll(): Promise<UserDocument[]> {
        console.log("findAll")
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<UserDocument> {
        const user = await this.userModel.findById(id);

        if(!user){
            throw new NotFoundException("could not find user.")
        }

        return user;
    }

    async update(id: string, user: User): Promise<UserDocument> {
        const updatedUser = await this.userModel.findById(id);
        if(updatedUser != null || updatedUser != undefined){
            Object.assign(updatedUser, user);
            updatedUser.save();
        }

        return  updatedUser;
    }

    async remove(id: string): Promise<void> {
        await this.userModel.deleteOne({id}).exec();
    }
}
