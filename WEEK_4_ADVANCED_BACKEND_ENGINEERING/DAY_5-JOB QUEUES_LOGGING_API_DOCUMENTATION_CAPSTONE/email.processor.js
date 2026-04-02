module.exports = async (job) => {
  const { to, subject, template, data } = job.data;

  console.log('📧 Sending email');
  console.log({ to, subject, template, data });

  return { success: true };
};

// Email processor: BullMQ worker process handling email job execution and logging
