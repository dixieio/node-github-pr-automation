const auths = [];

const authIsSet = (id, type) => {
  return auths.findIndex(auth => auth.id === id && auth.type === type) > -1;
};

const setAuth = auth => {
  if (authIsSet(auth.id, auth.type)) {
    return;
  }

  auths.push(auth);
}

const getAuth = (id, type) => auths.find(auth => auth.id === id && auth.type === type);

module.exports = {
  setAuth: setAuth,
  getAuth: getAuth
}
