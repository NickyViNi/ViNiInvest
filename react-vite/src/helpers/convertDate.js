function convertDate(dateString) {
    // Use the Date object to parse the date string

    const date = new Date(dateString);

    // Get the year, month, and day as zero-padded strings
    const year = date.getUTCFullYear().toString().padStart(4, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');

    // Return the formatted date
    return `${year}-${month}-${day}`;
  }

  export default convertDate;

  // export const convertDate = inputDate => {
  //   const parts = inputDate.split(" ");
  //   if (parts.length !== 2) return;
  //   const date = parts[0];
  //   const [year, month, day] = date.split("-");
  //   return `${year}-${`${month}`.padStart(2, '0')}-${`${day}`.padStart(2, '0')}`;
  // };
  // export const formattedTime = inputDate => {
  //   const parts = inputDate.split(" ");
  //   if (parts.length !== 2) return;
  //   const time = parts[1].split('.')[0];
  //   const [hour, min, sec] = time.split(":");
  //   return `${hour.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
  // };
