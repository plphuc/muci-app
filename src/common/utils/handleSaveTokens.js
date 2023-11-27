const handleSaveTokens = (tokens) => {
  console.log('arrived tokens: ', tokens);
  localStorage.setItem('refreshToken', `${tokens.refresh.token}`)
}

export default handleSaveTokens