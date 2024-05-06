const inputSerch = document.querySelector(".js-input-serch");
const btnSearch = document.querySelector(".js-btn-search");
const moviesList = document.querySelector(".js-movies-list");
const moviesListNode = document.querySelector(".js-movies-list");

btnSearch.addEventListener("click", getMovie);

function getMovie() {
  const nameMovie = inputSerch.value.trim();

  if (!nameMovie) {
    alert("Введите название фильма");
    return;
  }

  fetchSearchMovie(nameMovie);

  afterSearch();
  inputSerch.value = "";
}

moviesListNode.addEventListener("click", handelClickMovie);

function fetchSearchMovie(nameMovie) {
  fetch(`https://www.omdbapi.com/?s=${nameMovie}&apikey=f7c7b9db`)
    .then((data) => data.json())
    .then((movie) => {
      const movies = movie.Search;

      moviesList.innerHTML = "";

      movies.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie-elem");
        // Сохраняем imdbID фильма в атрибуте data-imdbid
        movieElement.dataset.imdbid = movie.imdbID;

        const wrapperMovieDiscription = document.createElement("div");
        wrapperMovieDiscription.classList.add("wrapper-movi-discription");

        const imgElem = document.createElement("img");
        imgElem.classList.add("img-movie");
        imgElem.src = movie.Poster;
        movieElement.appendChild(imgElem);

        const titleElem = document.createElement("h2");
        titleElem.classList.add("title-movie");
        titleElem.textContent = movie.Title;
        wrapperMovieDiscription.appendChild(titleElem);

        const yearElem = document.createElement("p");
        yearElem.classList.add("year-movie");
        yearElem.textContent = movie.Year;
        wrapperMovieDiscription.appendChild(yearElem);

        const typeElem = document.createElement("p");
        typeElem.classList.add("type-elem");
        typeElem.textContent = movie.Type;
        wrapperMovieDiscription.appendChild(typeElem);

        const idElem = document.createElement("p");
        idElem.textContent = movie.imdbID;

        movieElement.appendChild(wrapperMovieDiscription);
        moviesList.appendChild(movieElement);
        return moviesList;
      });
    })
    .catch((error) => {
      console.error("Ошибка при загрузке фильма", error);
    });
}

function handelClickMovie(event) {
  const clickedMovie = event.target.closest(".movie-elem");
  if (clickedMovie) {
    const imdbId = clickedMovie.dataset.imdbid;
    const movieUrl = `https://www.omdbapi.com/?i=${imdbId}&apikey=f7c7b9db`;

    const newWindow = window.open("", "_blank");
    fetch(movieUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let clickedMovieData = data;
        renderMivieImdbId(clickedMovieData, newWindow);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке фильма", error);
        window.close();
      });
  }
}

function renderMivieImdbId(clickedMovieData, window) {
  // moviesList.innerHTML = "";
  const wrapperDescriptionFilm = document.createElement("div");

  const actors = document.createElement("p");
  actors.classList.add("actors");
  actors.textContent = `Actors: ${clickedMovieData.Actors}`;
  wrapperDescriptionFilm.append(actors);

  const awards = document.createElement("p");
  awards.classList.add("awards");
  awards.textContent = `Awards: ${clickedMovieData.Awards}`;
  wrapperDescriptionFilm.append(awards);

  const boxOffice = document.createElement("p");
  boxOffice.classList.add("boxOffice");
  boxOffice.textContent = `BoxOffice: ${clickedMovieData.BoxOffice}`;
  wrapperDescriptionFilm.append(boxOffice);

  const country = document.createElement("p");
  country.classList.add("country");
  country.textContent = `Country: ${clickedMovieData.Country}`;
  wrapperDescriptionFilm.append(country);

  const dvd = document.createElement("p");
  dvd.classList.add("dvd");
  dvd.textContent = `DVD: ${clickedMovieData.DVD}`;
  wrapperDescriptionFilm.append(dvd);

  const director = document.createElement("p");
  director.classList.add("director");
  director.textContent = `Director: ${clickedMovieData.Director}`;
  wrapperDescriptionFilm.append(director);

  const genre = document.createElement("p");
  genre.classList.add("genre");
  genre.textContent = `Genre: ${clickedMovieData.Genre}`;
  wrapperDescriptionFilm.append(genre);

  const language = document.createElement("p");
  language.classList.add("language");
  language.textContent = `Language: ${clickedMovieData.Language}`;
  wrapperDescriptionFilm.append(language);

  const metascore = document.createElement("p");
  metascore.classList.add("metascore");
  metascore.textContent = `Metascore: ${clickedMovieData.Metascore}`;
  wrapperDescriptionFilm.append(metascore);

  const plot = document.createElement("p");
  plot.classList.add("plot");
  plot.textContent = `Plot: ${clickedMovieData.Plot}`;
  wrapperDescriptionFilm.append(plot);

  const poster = document.createElement("img");
  poster.classList.add("poster");
  poster.src = `${clickedMovieData.Poster}`;
  wrapperDescriptionFilm.append(poster);

  // moviesList.append(wrapperDescriptionFilm);

  window.document.body.append(wrapperDescriptionFilm)
}

function afterSearch() {
  btnSearch.classList.add("btn-search_black");
}
