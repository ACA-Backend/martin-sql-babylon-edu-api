import { sequelize } from "../../config/db.config.js";
import { DataTypes } from "sequelize";
import argon from 'argon2'

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  role: {
    type: DataTypes.ENUM(["user", "admin", "super admin"]),
    defaultValue: "user",
  },
} );

const Aurthur = sequelize.define("Aurthur", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

const Books = sequelize.define("Books", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publicationDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true,
  },

});

const BorrowedBooks = sequelize.define("BorrowedBooks",{
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sequelize,
  modelName: 'User',
});

class Book extends Model {}
Book.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publicationDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Book',
});
class BorrowedBook extends Model {}
BorrowedBook.init({
  borrowedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  returnedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'BorrowedBook',
});
User.beforeCreate( async ( user ) =>
{
    user.password = await argon.hash( user.password );
});

export {User, Aurthur, Books, BorrowedBooks};