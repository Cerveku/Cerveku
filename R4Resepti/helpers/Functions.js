export const convertTimeStampToJS = (time) => {
  // Convert timestamp into a user-friendly view
  if (time !== null && time !== undefined) {
    const firebaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000
    );
    return (
      firebaseTime.getDate() +
      "." +
      (firebaseTime.getMonth() + 1) +
      "." +
      firebaseTime.getFullYear() +
      String(" klo ") +
      firebaseTime.getHours() +
      "." +
      String(firebaseTime.getMinutes()).padStart(2, "0") 
    );
  }
};
