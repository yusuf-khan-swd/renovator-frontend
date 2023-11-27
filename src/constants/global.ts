export const ratingOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];

export const bookingStatusOptionsForAdmin = [
  { label: "Pending", value: "pending" },
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
  { label: "USER", value: "user" },
];

export const roleOptionsForAdmin = [
  { label: "ADMIN", value: "admin" },
  { label: "USER", value: "user" },
];

export const roleOptionsForUser = [{ label: "USER", value: "user" }];

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
