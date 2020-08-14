const users = (_, __, context) => context.prisma.user.findMany();

const currentCurriculum = (_, args, context) => context.prisma.curriculum.findOne({ where: { id: args.curriculumId } });

module.exports = { users, currentCurriculum };