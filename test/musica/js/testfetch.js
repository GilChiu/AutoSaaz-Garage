fetch("https://devbox.musica.co.uk/datafunctions/getData.php?xml=1&mode=getSonglist&by=song&prefix=a&user=31|126-710-102|MzEtMTI2LTcxMC0xMDI=", {
  credentials: 'include'
})
  .then(res => res.text()) // it's likely XML, not JSON
  .then(data => console.log(data))
  .catch(err => console.error(err));