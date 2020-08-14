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
  const newJob = await context.prisma.job.create({
    data: {
      start: args.pastJobs[0].start,
      finish: args.pastJobs[0].finish,
      curriculum: { connect: { id: newCurriculum.id } },

    },
  });
  return newCurriculum;
};

module.exports = { signUp, createCurriculum };
