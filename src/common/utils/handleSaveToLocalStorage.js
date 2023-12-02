const handleSaveToLocalStorage = (storedName, userInfo) => {
  localStorage.setItem(storedName, `${JSON.stringify({
    token: userInfo.tokens.refresh.token,
    expire: userInfo.tokens.refresh.expire,
    username: userInfo.user.username
  })}`)
}

export default handleSaveToLocalStorage