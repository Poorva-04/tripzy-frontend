export const TRIP_STATUS = {
  PLANNED: "PLANNED",
  ONGOING: "ONGOING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const getTripStatusLabel = (status) => {
  switch (status) {
    case TRIP_STATUS.ONGOING:
      return "Ongoing";
    case TRIP_STATUS.COMPLETED:
      return "Completed";
    case TRIP_STATUS.CANCELLED:
      return "Cancelled";
    case TRIP_STATUS.PLANNED:
    default:
      return "Planned";
  }
};

export const getTripStatusClass = (status) =>
  `status-${String(status || TRIP_STATUS.PLANNED).toLowerCase()}`;