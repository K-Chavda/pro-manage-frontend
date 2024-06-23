function formatDate(date) {
  const suffixes = ["th", "st", "nd", "rd"];
  const dateObj = new Date(date);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  // Determine the suffix for the day
  const suffixIndex =
    day % 10 <= 3 && ![11, 12, 13].includes(day % 100) ? day % 10 : 0;
  const suffix = suffixes[suffixIndex];

  return `${day}${suffix} ${month}, ${year}`;
}

export default formatDate;
