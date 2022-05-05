export const getValueFromLs = (key) => { 
  return localStorage.getItem(key)
}

export const setValueInLs = ( key,value) => { 
  return localStorage.setItem(key, value);
}