export const convertDate = (iso) => {
    const monthsArr = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const convertedDate = new Date(iso);
    return `${
      monthsArr[convertedDate.getMonth()]
    } ${convertedDate.getDate()}, ${convertedDate.getFullYear()}`;
  };