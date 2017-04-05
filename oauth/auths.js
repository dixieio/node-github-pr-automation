const fs = require('fs');

const AUTH_FILE_PATH = `${__dirname}/auths.json`;
const getStoredAuths = () => JSON.parse(fs.readFileSync(AUTH_FILE_PATH, 'utf-8'));

const createOrInsertAuth = auth => {
  const authsObj = Object.assign({}, getStoredAuths());

  const authExsists = (auths, auth) => {
    return auths.findIndex(a => a.id === auth.id && a.type === auth.type) > -1
  }

  if (!authsObj.hasOwnProperty(auth.type)) {
    authsObj[auth.type] = [auth];
    return authsObj;
  } else {
    if (authExsists(authsObj[auth.type], auth)) {
      return authsObj;
    }

    authsObj[auth.type].push(auth);
    return authsObj;
  }
}

const setAuth = auth => {
  fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(createOrInsertAuth(auth)), 'utf-8', (err) => {
    if (err) {
      throw err;
    }
  });
}

const getAuth = (id, type) => {
  const auths = getStoredAuths();
  if (!auths[type]) {
    return null;
  }

  return auths[type].find(auth => auth.id === id && auth.type === type);
}

module.exports = {
  setAuth: setAuth,
  getAuth: getAuth
}
