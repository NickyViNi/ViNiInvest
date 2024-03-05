function convertDate(dateString) {
    // Use the Date object to parse the date string

    const date = new Date(dateString);

    // Get the year, month, and day as zero-padded strings
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // Return the formatted date
    return `${year}-${month}-${day}`;
  }

  export default convertDate;
