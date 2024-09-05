// dateParser.js
import { parse } from 'date-fns';

// Function to parse date strings with different formats
export function parseDate(dateString) {
  const generalFormat = 'yyyy-MM-dd HH:mm:ss';
  // const customFormat = 'M/d/yyyy h:mm:ss a';

  // Try parsing with the general format first
  let parsedDate = parse(dateString, generalFormat, new Date());

  // If parsing fails, try the custom format
  if (isNaN(parsedDate)) {
    let parsedDate = parse(convertDateFormat(dateString),generalFormat, new Date());
    return parsedDate
  }

  return parsedDate;
}
function convertDateFormat(originalDate) {
  // Parse the original date
  var dt = new Date(originalDate);
  
  // Convert to the new format
  var year = dt.getFullYear();
  var month = ("0" + (dt.getMonth() + 1)).slice(-2); // Months are zero based
  var day = ("0" + dt.getDate()).slice(-2);
  var hours = ("0" + dt.getHours()).slice(-2);
  var minutes = ("0" + dt.getMinutes()).slice(-2);
  var seconds = ("0" + dt.getSeconds()).slice(-2);
  
  var newDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  
  return newDate;
  }

const dateString = "9/1/2024  11:48:35 PM";
console.log(parseDate(dateString));

