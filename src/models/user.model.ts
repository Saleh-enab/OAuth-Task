import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email?: string;
    appId?: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    appId: { type: String, unique: true },
});


const UserModel = mongoose.model<IUser>('User', UserSchema);

export { UserModel };