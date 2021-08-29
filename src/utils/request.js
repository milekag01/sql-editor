import {RequestStatus} from './constants';

/**
 * @function isProcessing
 * @param status
 * @description Check is api is currenlty running or not. If status is started
 * then api is currently running.
 */
export const isProcessing = (status) => status === RequestStatus.STARTED;

/**
 * @function isError
 * @param prevStatus
 * @param status
 * @description Check if api completed with error. If previously api status
 * was started but current status is Failure. That means api completed with
 * error.
 */
export const isError = (prevStatus, status) =>
  prevStatus === RequestStatus.STARTED && status === RequestStatus.FAILURE;

/**
 * @function isSuccess
 * @param prevStatus
 * @param status
 * @description Check if api completed successfully. If previously api status
 * was started but current status is Success. That means api completed
 * successfully.
 */
export const isSuccess = (prevStatus, status) =>
  prevStatus === RequestStatus.STARTED && status === RequestStatus.SUCCESS;

/**
 * @function isCompleted
 * @param prevStatus
 * @param status
 * @description Check if api was started and now api has been completed
 * either success or failure
 */
export const isCompleted = (prevStatus, status) =>
  prevStatus === RequestStatus.STARTED && status !== RequestStatus.STARTED;

/**
 * @function getErrorMessage
 * @param error
 * @description Method to handle error response
 */
export const getErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  const errorMessages = flatten(Object.values(error));
  // return errorMessages.join(', ');
  return errorMessages[0];
};

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten,
    );
  }, []);
}
