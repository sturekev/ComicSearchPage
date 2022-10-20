let search_res = await fetch(
    `https://api.open5e.com/monsters/?search=fir`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.error(err));