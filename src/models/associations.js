const Users = require("./Users_model");
const Authors = require("./Authors_model");
const Books = require("./Books_model");
const Users_Books = require("./Users_Books_model");

Users.hasMany(Users_Books, {foreignKey: "user"});
Users_Books.belongsTo(Users, {foreignKey: "user"});

Authors.hasMany(Books, {foreignKey: "author"});
Books.belongsTo(Authors, {foreignKey: "author"});

Books.hasMany(Users_Books, {foreignKey: "book"});
Users_Books.belongsTo(Books, {foreignKey: "book"});
