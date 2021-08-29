import moment from 'moment';

/**
 * @function isValidEmail
 * @param email
 * @returns Bool
 * @description Check email and returns true if valid else false
 */
export const isValidEmail = (email, strict = false) => {
  // Strict filter with only _ . and - as special character in local part
  const strictFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (strict) return strictFilter.test(email);

  // Loosey comparison where it allows almost everything in local and domain part
  const filter = /\w+\@\w+.\w+/;
  return filter.test(email);
};

export const formatDateFromString = (dateStr, format) => {
  if (!dateStr || !format) return '';
  const date = moment.utc(dateStr, 'HH:mm');
  if (!date) return '';
  const str = date.format(format);
  return str;
};

/**
 * @function formatDate
 * @param date
 * @param format
 * @description Format date based on format provided
 */
export const formatDate = (date, format) => {
  if (!date || !format) return null;

  return moment(date).format(format);
};

/**
 * @function formatTime
 * @param time - can be date object or time stamp
 * @param placeholder - String to be return if date is not present defult ""
 */
export const formatTime = (time, placeholder = '') => {
  if (!time) return placeholder;
  return moment(time).format('HH:mm');
  // return moment(time).format('h:mm a');
};

export const Capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @function getProp
 * @param {*} p
 * @desc it will get the data string from the repsonse
 */
export const getProp = (p) => (o) =>
  p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

/**
 * @function getMeridianTime
 * @param time24
 * @desc convert 24 hour format to 12 hour
 */
export const getMeridianTime = (time24) => {
  const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
  const period = +sHours < 12 ? 'AM' : 'PM';
  const hours = +sHours % 12 || 12;
  return `${hours}:${minutes} ${period}`;
};
