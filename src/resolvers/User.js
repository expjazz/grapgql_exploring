const curriculum = (parent, args, context) => context.prisma.user.findOne({ where: { id: parent.id } }).curriculum();


module.exports = {
  curriculum,
};