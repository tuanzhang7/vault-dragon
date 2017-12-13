export default {
  isValidUnixTimestamp(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  isValidKeyValue(obj) {
    console.log(Object.keys(obj));
    if (Array.isArray(obj)){
      return false;
    }
    if (Object.keys(obj) && Object.keys(obj)[0]){
      return true;
    }
    return false;
  },
  isValidJson(json) {
    try {
      JSON.parse(json);
      return true;
    } catch (e) {
      return false;
    }
  },
  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
};
