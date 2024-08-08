export const getInitials = (fullName) => {
  const nameParts = fullName.split(" ");

  const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
  const lastInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : "";

  return `${firstInitial}${lastInitial}`;
};

export const getFirstName = (fullName) => {
  const nameParts = fullName.split(" ");

  return nameParts[0] || "Admin";
};
