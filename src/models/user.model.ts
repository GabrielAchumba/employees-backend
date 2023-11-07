import * as mongoose from 'mongoose';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class User {
    createdBy: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    userType: string;
    isEmailConfirmed: boolean;

	//===========Residential Address============//
	stateOfResidence: string
	city: string
	address: string

	//==========Next of Kin=================//
	nOKFullName: string
	nOKRelationship: string
	nOKEmail:string
	nOKPhone:string
	nOKAddress: string
}



export interface UserDocument extends mongoose.Document, User { }

export const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: false },
    lastName: {type: String, required: false },
    userType: {type: String, required: false },
    password: {type: String, required: true },
    email: {type: String, required: true },
    isEmailConfirmed: {type: String, required: false },
    stateOfResidence: {type: String, required: false },
    city: {type: String, required: false },
    address: {type: String, required: false },
    nOKFullName: {type: String, required: false },
    nOKRelationship: {type: String, required: false },
    nOKEmail: {type: String, required: false },
    nOKPhone: {type: String, required: false },
    nOKAddress: {type: String, required: false },
  });
