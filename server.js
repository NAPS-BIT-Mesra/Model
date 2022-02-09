var value = null;

const getDB = ()=>{
  return value;
}

const setDB = (newValue)=>{
  value = newValue;
}

module.exports = {"get":getDB, "set": setDB}
