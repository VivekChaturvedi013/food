import { model, Schema } from "mongoose";

export interface User {
    id:string;
    email:string;
    name:string;
    address:string;
    password:string;
    isAdmin:string;
}

export const UserSchema = new Schema<User>({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    address: {type:String, required:true},
    isAdmin: {type:String, required:true},
},
{
    timestamps:true,
    toJSON : {
        virtuals:true
    },
    toObject : {
        virtuals:true
    }
});

export const UserModel = model<User>('user', UserSchema);

