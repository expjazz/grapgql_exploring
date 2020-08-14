const users = (a, b, context) => context.prisma.user.findMany();

module.exports = { users };