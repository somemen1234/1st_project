const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODgwYmIzNjA5MDMyMGY5MzJjMDM4MzdhOTFlYzQ3MCIsInN1YiI6IjY0NzU2MWJiNjc0M2ZhMDEzNmVlYTM4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wqy-TYuti_eNtAxsJ2ogjiehKSjfEJOJlQijhu9u8ys'
    }
  };
  
let rows;
const section = document.querySelector("#card")
const searchBtn = document.querySelector("#searchbtn")
const arr = []; //복사본 배열

  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)    //language : ko로 바꾸면 바뀜
    .then(res => res.json())
    .then(data => {
        arr.push(data['results'])
        rows = data['results'];
        rows.forEach(arr  => {
            
            let title = arr.title
            let overview = arr.overview
            let path = arr.poster_path
            let star = arr.vote_average
            let id = arr.id
            let temp_html = `<div class="posterCard" id=${id} onclick=showId(this)>
                                <img id="movieImage" src="https://image.tmdb.org/t/p/w500${path}">
                                <h2 id="movieTitle">${title}</h2>
                                <p class="overview">${overview}</p>
                                <p id="movieStar">평점 : ${star}</p>
                            </div>`
            section.innerHTML += temp_html
        });
    })
    function showId(para) {
        let id = para.id
        alert(`영화 id: ${id}`)
    }

    function searchMovie(event) {
        // event.preventDefault();              //button type을 submit으로 바꿨기에 default값인 제출을 막음
        let text = document.querySelector("#searchMV").value;
        if(!text.length) {
            alert('영화 제목의 일부분을 입력해주세요.')
            return;
        } else if(text.length <= 2) {
            alert('조금 더 길게 입력해주세요.')
            return;
        }
        let reg = new RegExp(text, "i")
        let findMovies = [];
        arr[0].forEach((movie)=> {
            if(reg.test(movie.title)) {
                findMovies.push(movie)
            } 
        })
        //배열안에 배열이 있어서 오류 발생했었음
        section.innerHTML = ""
        findMovies.forEach(arr => {
   
            let temp_html = `<div class="posterCard" id=${arr.id} onclick=showId(this)>
                                    <img id="movieImage" src="https://image.tmdb.org/t/p/w500${arr.poster_path}">
                                    <h2 id="movieTitle">${arr.title}</h2>
                                    <p class="overview">${arr.overview}</p>
                                    <p id="movieStar">평점 : ${arr.vote_average}</p>
                            </div>`
            section.innerHTML += temp_html
        })
    }


    
searchBtn.addEventListener("click", searchMovie)
