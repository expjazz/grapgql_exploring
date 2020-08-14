const candidate = (parent, args, context) => context.prisma.curriculum.findOne({ where: { id: parent.id } }).candidate();

const pastJobs = (parent, args, context) => context.prisma.job.findMany({
  where: { id: parent.id },
});

module.exports = {
  candidate, pastJobs,
};