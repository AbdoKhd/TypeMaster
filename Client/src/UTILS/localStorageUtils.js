

const getLocalStorageUser = () =>{
    console.log("in getLocal");
    const parseUser = JSON.parse(localStorage.getItem("user"));
    return parseUser;
}

const setLocalStorageUser = (user) =>{
    console.log("in letLocal");
    localStorage.setItem("user", JSON.stringify(user));
    console.log(JSON.stringify(user))
}

const getToken = () => {
    const parsedUser = getLocalStorageUser();
    return parsedUser.token;
  };

module.exports = {
    getLocalStorageUser,
    setLocalStorageUser,
    getToken,
}