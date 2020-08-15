const users = (_, __, context) => context.prisma.user.findMany();

const currentUser = (parent, args, context) => {
  if (!context.request.userId) {
    return null;
  }
  return context.prisma.user.findOne({
    where: { id: context.request.userId },
  });
};
const currentCurriculum = (_, args, context) => context.prisma
  .curriculum.findOne({ where: { id: args.curriculumId } });

module.exports = { users, currentCurriculum, currentUser };