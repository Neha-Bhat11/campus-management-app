const bcrypt = require('bcryptjs');

const password = 'admin123'; // The password you want for admin
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log(hashedPassword);
