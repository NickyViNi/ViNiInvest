function convertDateTime(dateString) {
    // Use the Date object to parse the date string
    const date = new Date(dateString);

    // Get year, month, day, hours, minutes, and seconds
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Return the formatted date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  export default convertDateTime;
