import * as mongoose from 'mongoose';
const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },

    public_id: {
      type: String
    }
  },
  {
    _id: false
  }
);
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'John'
      // required: true
    },
    surname: {
      type: String,
      default: 'Doe'
      // required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines

      match: [
        // tslint:disable-next-line:max-line-length
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email'
      ]
    },

    hashedPassword: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    phoneNumber: {
      type: String,
      default: '555-55-55'
    },
    profession: {
      type: String,
      default: 'Computer Scientist'
    },
    address: {
      type: String,
      default: '445 Mount Eden Road, Mount Eden, Auckland'
    },
    web: {
      type: String,
      default: 'johndoe@site.com'
    },
    profilePicture: ImageSchema,
    role: {
      type: String,
      default: 'user'
    }
  },
  {
    versionKey: false
  }
);
export const userDbModel = mongoose.model('User', UserSchema);
