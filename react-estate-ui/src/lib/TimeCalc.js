/**
 * Converts a date to a string representing how long ago it was.
 * @param {Date|string|number} date - The date to convert
 * @returns {string} A string representing how long ago the date was
 */
export default function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
  
    const elapsed = now - past;
  
    if (elapsed < msPerMinute) {
      const seconds = Math.round(elapsed / 1000);
      return seconds <= 1 ? 'just now' : `${seconds} seconds ago`;
    }
  
    else if (elapsed < msPerHour) {
      const minutes = Math.round(elapsed / msPerMinute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
  
    else if (elapsed < msPerDay) {
      const hours = Math.round(elapsed / msPerHour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  
    else if (elapsed < msPerMonth) {
      const days = Math.round(elapsed / msPerDay);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  
    else if (elapsed < msPerYear) {
      const months = Math.round(elapsed / msPerMonth);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
  
    else {
      const years = Math.round(elapsed / msPerYear);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }
  