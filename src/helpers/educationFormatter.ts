export function eduFormatter(edu: string) {
  if (edu === 'highSchoolDiploma') edu = 'high School Diploma'
  return edu.charAt(0).toUpperCase() + edu.slice(1);
}
