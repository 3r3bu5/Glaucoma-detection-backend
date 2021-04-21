const events = require('events');
const audit = require('../model/audit.model');
var emitter = new events.EventEmitter();
// logging
const loggerService = require('../services/logger.service');
var logger = new loggerService('auditEvent');

const auditEvent = 'audit';

emitter.on(auditEvent, async function (auditObj) {
  try {
    const newAudit = await auditObj.save();
    logger.info(`AUDIT: created new audit record`);
    return;
  } catch (err) {
    return logger.error(
      `PATIENT: error creating audit record`,
      err.description || err.message
    );
  }
});

exports.handleAuditing = (actionType, data, status, error, auditBy) => {
  if (!status) status = 500;
  let auditObj = new audit({
    actionType,
    data: data.toString(),
    status,
    error,
    auditBy,
  });
  emitter.emit(auditEvent, auditObj);
};
