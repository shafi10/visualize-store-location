export function findBlockByType(data, targetType) {
  if (typeof data === "object" && data !== null) {
    // Check if the current level has a 'type' key and its value matches the targetType
    if (data.type === targetType) {
      return data;
    }

    // Recursively search in the values of the object
    for (const key in data) {
      const result = findBlockByType(data[key], targetType);
      if (result !== null) {
        return result;
      }
    }
  } else if (Array.isArray(data)) {
    // Recursively search in the elements of the array
    for (let i = 0; i < data.length; i++) {
      const result = findBlockByType(data[i], targetType);
      if (result !== null) {
        return result;
      }
    }
  }

  // Return null if the targetType is not found
  return null;
}
