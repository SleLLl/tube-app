const uuid = () => {
  const hexDigits = '0123456789abcdef';
  const uuidSections = [8, 4, 4, 4, 12]; // Length of each section in the UUID

  let uuid = '';

  for (const section of uuidSections) {
    for (let i = 0; i < section; i++) {
      uuid += hexDigits[Math.floor(Math.random() * 16)];
    }
    if (section !== 12) {
      uuid += '-';
    }
  }

  // Set the version (4) and variant (8, 9, A, or B) bits
  uuid =
    uuid.substring(0, 14) +
    '4' +
    uuid.substring(15, 18) +
    hexDigits[Math.floor(Math.random() * 4) + 8] +
    uuid.substring(19);

  return uuid;
};

export default uuid;
