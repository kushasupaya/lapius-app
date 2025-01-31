export const isEmpty = (val) => val === "" || val === undefined;

export const removeEmpty = (val) => {
  if (Array.isArray(val)) {
    return val
      .map((val) => (typeof val === "object" ? removeEmpty(val) : val))
      .filter((val) => !isEmpty(val));
  } else if (val && typeof val == "object") {
    return Object.entries(val)
      .map(([k, v]) => [k, removeEmpty(v)])
      .reduce((acc, [k, v]) => {
        if (!isEmpty(v)) {
          acc[k] = v;
        }
        return acc;
      }, {});
  }
  return val;
};

export const parseNum = (num, defaultVal = 0) =>
  isNaN(num) || !num ? defaultVal : Number(num);
