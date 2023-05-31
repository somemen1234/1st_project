const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODgwYmIzNjA5MDMyMGY5MzJjMDM4MzdhOTFlYzQ3MCIsInN1YiI6IjY0NzU2MWJiNjc0M2ZhMDEzNmVlYTM4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wqy-TYuti_eNtAxsJ2ogjiehKSjfEJOJlQijhu9u8ys'
    }
  };
  
//필요한 html정보를 qeurySelector로 가져와 변수 선언
const section = document.querySelector("#card") //본문 부분
const searchBtn = document.querySelector("#searchbtn") //검색 버튼
const arr = []; //복사본 배열

  //해당 url에서 Authorization이 인가된 사용자일 경우 정보를 가져와서 해당 정보를 출력
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)    //language : ko로 바꾸면 바뀜
    .then(res => res.json())
    .then(data => {
        //검색을 위해 받은 정보를 복사함(rows를 전역 변수로 주고 받아보았는데 실패 - 그래서 따로 복사본 배열을 만들어 복사)
        arr.push(data['results'])
        
        //배열 형태로 정보의 results 값을 받아옴(여기에 영화정보가 들어 있음)
        let rows = data['results'];
        rows.forEach(arr  => {
            
            let title = arr.title
            let overview = arr.overview
            let path = arr.poster_path
            let star = arr.vote_average
            let id = arr.id //showId()함수를 위해 id값도 같이 받아옴

            //출력(div를 클릭할 때 showId(this)를 넣어 this binding을 해서 현재 id값을 showId()로 보냄)
            let temp_html = `<div class="posterCard" id=${id} onclick=showId(this)>
                                <img id="movieImage" src="https://image.tmdb.org/t/p/w500${path}">
                                <h2 id="movieTitle">${title}</h2>
                                <p class="overview">${overview}</p>
                                <p id="movieStar">평점 : ${star}</p>
                            </div>`
            section.innerHTML += temp_html
        });
    })

    //현재 영화 id 보여주는 함수(this binding한 id값을 변수로 줘 해당 변수를 출력하는 방식으로 구현)
    function showId(para) {
        let id = para.id
        alert(`영화 id: ${id}`)
    }

    //검색 기능(버튼을 클릭시 작동하도록 설정 - submit으로 넘어가지 않게 하기 위해 button type을 설정하지 않음)
    //검색 알고리즘은 입력받은 text를 정규형 생성자로 선언(대소문자를 구분하지 않고 검색하기 위해서)
    //해당 정규형을 통해 각 영화 이름들을 비교해 true로 반환되는 값(포함되는 이름)만 따로 배열로 만들어 해당 배열을 출력하는 방식으로 구현
    //여기에 event는 클릭 시의 PointerEvent정보가 출력(매개변수를 받지 않아도 자동으로 들어와 있음)
    function searchMovie(event) {               
        // event.preventDefault();              //button type을 submit으로 바꾼다면 해당 form이 submit되는 default값을 막음
        let text = document.querySelector("#searchMV").value; 

        //조건 설정: 제목이 입력되지 않았거나 글자가 두 글자 이하일 경우에는 검색이 되지 않도록 설정함.
        if(!text.length) {
            alert('영화 제목의 일부분을 입력해주세요.')
            return;
        } else if(text.length <= 2) {
            alert('조금 더 길게 입력해주세요.')
            return;
        }

        //정규 표현식을 생성해 비교
        let reg = new RegExp(text, "i")
        let findMovies = [];
        arr[0].forEach((movie)=> {
            if(reg.test(movie.title)) {
                findMovies.push(movie)
            } 
        })
        
        //기존에 section을 초기화(비운 후 다시 포함된 내용만 출력하게끔)
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


//버튼을 클릭할 때 이벤트 발생(searchMovie함수를 실행)
searchBtn.addEventListener("click", searchMovie)
