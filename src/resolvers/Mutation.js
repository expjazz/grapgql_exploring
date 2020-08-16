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
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  context.response.cookie('token', token, {
    httpOnly: true,
  });
  return user;
};

const createCurriculum = async (parent, args, context) => {
  const newCurriculum = await context.prisma.curriculum.create({
    data: {
      aboutMe: args.aboutMe,
      candidate: { connect: { id: args.candidateId } },
    },
  });
  args.pastJobs.forEach(async (pastJob) => {
    await context.prisma.job.create({
      data: {
        start: pastJob.start,
        finish: pastJob.finish,
        curriculum: { connect: { id: newCurriculum.id } },

      },
    });
  });
  return newCurriculum;
};

const login = async (parent, { email, password }, context) => {
  const user = await context.prisma.user
    .findOne({ where: { email } });
  if (!user || email.length === 0) {
    throw new Error(`Wrong information for ${email}`);
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid Password');

  const token = jwt.sign({
    userId: user.id,
  }, process.env.APP_SECRET);

  context.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 100 * 60 * 60 * 24 * 365,
  });
  return user;
};

const signOut = async (_, __, context) => {
  context.response.clearCookie('token');
  return { message: 'Goodbye' };
};

module.exports = {
  signUp, createCurriculum, login, signOut,
};
