export const formateDate = (dateString: string | null) => {
  if(!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12:true
  });
  return [`${day}/${month}/${year}`, time];
};
