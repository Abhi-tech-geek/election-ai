export const validateVoterAge = (dob, referenceDate = new Date()) => {
  const birthDate = new Date(dob);
  let age = referenceDate.getFullYear() - birthDate.getFullYear();
  const m = referenceDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && referenceDate.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age >= 18) {
    return { eligible: true, message: "Eligible for registration", status: "READY" };
  } else if (age === 17) {
    return { eligible: false, advance: true, message: "Eligible for advance registration", status: "ADVANCE" };
  } else {
    return { eligible: false, message: "Not eligible", status: "UNDERAGE" };
  }
};
