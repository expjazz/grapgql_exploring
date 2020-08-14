const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../utils');

const signUp = async (parent, args, context) => {
  args.email = args.email.toLowerCase();
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });
  console.log('ha');
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  context.response.cookie('token', token, {
    httpOnly: true,
  });
  return user;
};

module.exports = { signUp };