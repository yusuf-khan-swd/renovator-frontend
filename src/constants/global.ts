export const bookingStatusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Cancel", value: "canceled" },
  { label: "Accept", value: "accepted" },
  { label: "Reject", value: "rejected" },
];

export const serviceStatusOptions = [
  { label: "Available", value: "available" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Booked", value: "booked" },
];

export const roleOptionsForSuperAdmin = [
  { label: "SUPER_ADMIN", value: "super_admin" },
  { label: "ADMIN", value: "admin" },
  { label: "User", value: "user" },
];

export const roleOptionsForAdmin = [
  { label: "ADMIN", value: "admin" },
  { label: "User", value: "user" },
];

export const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Others",
    value: "others",
  },
];

export const bloodGroupOptions = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = months.map((month: string) => {
  return {
    label: month,
    value: month,
  };
});

export const days = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];
export const daysOptions = days.map((day: string) => {
  return {
    label: day,
    value: day,
  };
});
