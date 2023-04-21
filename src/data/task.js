let keys = Object.keys(localStorage);
export const tasks = keys.map((key) => {
  let { title, description, creationDate, creationHour } = JSON.parse(
    localStorage.getItem(key)
  );
  return { id: key, title, description, creationDate, creationHour };
});
