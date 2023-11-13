const handleSaveTokens = (tokens) => {
  console.log('arrived tokens: ', tokens);
  localStorage.setItem('refreshToken', `${tokens.refresh.token}`)
  localStorage.setItem('accessToken', `${tokens.access.token}`)
}

export default handleSaveTokens