const coursesUrl = 'https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json';

let hole = 0;
function setHole(x) {
    hole = x;
    renderHole();
}

let tee = 0;
function setTee(x) {
    tee = x;
}

let players = 0;
function setPlayers(x) {
    players = x;
}

let course = null;
function setCourse(x) {
    course = x;
}

let page = null;
function setPage(x) {
    page = x;
    renderTitle();
}

let playersArray = [];
// localStorage.getItem('playersArray') && (playersArray = JSON.parse(localStorage.getItem('playersArray')))

async function myFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function renderCourses() {
    setPage('course');
    const coursesContainer = document.getElementById('courses');
    const courses = await myFetch(coursesUrl);
    console.log(courses);
    courses.forEach(async (e) => {
        const _course = await myFetch(e.url);
        console.log(_course);
        const div = document.createElement('div');
        div.className = 'flex flex-col p-3 backdrop-blur-md items-center rounded-lg hover:scale-[105%] transition-transform bg-primary-transparent w-80 border border-primary';
        div.addEventListener('click', () => {
            coursesContainer.classList.add('hidden');
            setCourse(_course);
            renderTees();
        })

        const imgWrap = document.createElement('div');
        imgWrap.className = 'rounded-md border border-primary overflow-hidden h-64';

        const img = document.createElement('img');
        img.setAttribute('src', _course.thumbnail);
        img.className = 'object-none h-full w-full'
        imgWrap.append(img);
        div.append(imgWrap);

        const header = document.createElement('h5');
        header.className = 'font-bold';
        header.innerText = _course.name;
        div.append(header);

        const span1 = document.createElement('span');
        const phoneDigitsInit = [..._course.phone.matchAll(/\d+/g)];
        const phoneDigits = phoneDigitsInit.reduce((x, y) => x + y, '');
        span1.innerText = `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 10)}`;
        div.append(span1);

        let totalPar = 0;
        _course.holes.forEach((e) => {
            totalPar += e.teeBoxes[0].par;
        })

        const span2 = document.createElement('span');
        span2.innerText = `Par: ${totalPar}`;
        div.append(span2);

        coursesContainer.append(div);
    })
}

function renderTees() {
    setPage('tee');
    const teesContainer = document.getElementById('tees');
    teesContainer.classList.remove('hidden');
    course.holes[0].teeBoxes.forEach((e, i) => {
        if (e.teeHexColor) {
            const div = document.createElement('div');
            div.className = 'flex justify-between gap-x-6 items-center h-full w-full rounded-lg hover:scale-[105%] transition-transform backdrop-blur-md p-4 bg-primary-transparent border border-primary font-bold';
            div.addEventListener('click', () => {
                teesContainer.classList.add('hidden');
                setTee(i);
                renderPlayers();
            })

            const circle = document.createElement('div');
            circle.className = 'rounded-full border-2 border-primary flex items-center justify-center px-4';
            circle.style.backgroundColor = e.teeHexColor;

            const yardageSpan = document.createElement('span');
            yardageSpan.className = 'text-xl';
            yardageSpan.style.filter = 'drop-shadow(0 0 1px black)';
            let yardage = 0;
            course.holes.forEach((e) => {
                yardage += e.teeBoxes[i].yards;
            })
            yardageSpan.innerText = yardage + ' yards';
            circle.append(yardageSpan);

            const tee = document.createElement('span');
            tee.innerText = e.teeType[0].toUpperCase() + e.teeType.slice(1);

            div.append(circle, tee);
            teesContainer.append(div);
        }
    })
}

function renderPlayers() {
    setPage('players');
    const playersContainer = document.getElementById('players');
    playersContainer.classList.remove('hidden');

    new Array(4).fill(0).forEach((e, i) => {
        const div = document.createElement('div');
        div.className = 'flex justify-center items-center w-full h-full bg-primary-transparent rounded-lg hover:scale-[105%] transition-transform backdrop-blur-md border border-primary';
        div.addEventListener('click', () => {
            playersContainer.classList.add('hidden');
            setPlayers(i + 1)
            storePlayers();
            renderHole();
        });

        const text = document.createElement('h4');
        text.className = ' font-bold';
        text.innerText = i + 1;

        div.append(text);

        playersContainer.append(div);
    })

    function storePlayers() {
        new Array(players).fill().forEach((e, i) => {
            playersArray.push({ id: i, name: '', scores: new Array(18).fill(0) });
        })
        localStorage.setItem('playersArray', JSON.stringify(playersArray));
    }
};

function renderHole() {
    setPage('hole');
    const holeContainer = document.getElementById('hole');
    holeContainer.innerHTML = null;
    holeContainer.classList.remove('hidden');

    const cardViewToggle = document.createElement('button');
    cardViewToggle.className = 'hover:scale-[105%] transition-transform w-10 h-10 rounded-full bg-primary-transparent flex items-center justify-center text-3xl border border-primary hover:scale-[105%] transition-transform fixed top-6 right-6';
    cardViewToggle.addEventListener('click', () => {
        holeContainer.classList.add('hidden');
        renderCard()
    })

    const cardIcon = document.createElement('i');
    cardIcon.className = 'ri-table-fill';

    cardViewToggle.append(cardIcon);

    const prev = document.createElement('button');
    prev.className = 'hover:scale-[105%] transition-transform backdrop-blur-md w-10 h-10 rounded-full bg-primary-transparent flex items-center justify-center text-3xl border border-primary hover:scale-[105%] transition-transform absolute left-0 bottom-0 sm:-left-16 sm:bottom-[calc(50%_-_2rem)]';
    prev.addEventListener('click', () => setHole(hole - 1));

    const leftArrow = document.createElement('i');
    leftArrow.className = 'ri-arrow-left-s-line font-bold';
    prev.append(leftArrow);

    const next = document.createElement('button');
    next.className = 'hover:scale-[105%] transition-transform backdrop-blur-md w-10 h-10 rounded-full bg-primary-transparent flex items-center justify-center text-3xl border border-primary hover:scale-[105%] transition-transform absolute right-0 bottom-0 sm:-right-16 sm:bottom-[calc(50%_-_2rem)]';
    next.addEventListener('click', () => setHole(hole + 1));

    const rightArrow = document.createElement('i');
    rightArrow.className = 'ri-arrow-right-s-line font-bold';
    next.append(rightArrow);

    const scoreCard = document.createElement('div');
    scoreCard.className = "w-full border border-primary h-5/6 sm:min-h-[50%] bg-primary-transparent rounded-lg flex flex-col items-center backdrop-blur-md font-bold px-2 py-4";

    const currentHole = document.createElement('h3');
    currentHole.innerText = `Hole: ${course.holes[hole].hole}`;

    const currentPar = document.createElement('h3');
    currentPar.innerText = `Par: ${course.holes[hole].teeBoxes[tee].par}`;

    const holePar = document.createElement('div');
    holePar.className = 'flex flex-col';
    holePar.append(currentHole, currentPar);

    const currentHandicap = document.createElement('h5');
    currentHandicap.innerText = `Handicap: ${course.holes[hole].teeBoxes[tee].hcp}`;

    const currentYardage = document.createElement('h5');
    currentYardage.innerText = `Yardage: ${course.holes[hole].teeBoxes[tee].yards}`

    const handYards = document.createElement('div');
    handYards.className = 'flex flex-col';
    handYards.append(currentHandicap, currentYardage);

    const holeText = document.createElement('div');
    holeText.className = 'flex items-start justify-between w-full';
    holeText.append(holePar, handYards);

    const playersHolder = document.createElement('div');
    playersHolder.className = 'flex flex-col gap-y-2 w-full h-full justify-around items-center';

    playersArray.forEach((e, i) => {
        console.log(e);
        const player = document.createElement('div');
        player.className = 'flex items-center justify-between w-full';

        const playerName = document.createElement('input');
        playerName.value = e.name;
        playerName.className = 'outline-none bg-transparent placeholder:text-white placeholder:opacity-80';
        playerName.placeholder = `Enter Name…`;
        playerName.addEventListener('change', () => {
            playersArray[i].name = playerName.value;
            save();
        })

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('inputmode', 'numeric');
        input.setAttribute('maxlength', '2')
        input.setAttribute('pattern','[0-9]*')
        input.value = e.scores[hole];
        input.addEventListener('change',() => {
            playersArray[i].scores[hole] = input.value;
            save();
        })
        input.className = 'bg-transparent outline-none border-2 border-white invalid:border-red-50 rounded-md p-2 text-center text-3xl w-14 sm:w-16 aspect-square';

        player.append(playerName, input);
        playersHolder.append(player);
    })

    scoreCard.append(holeText, playersHolder);

    hole > 0 && holeContainer.append(prev);
    holeContainer.append(cardViewToggle, scoreCard);
    hole < 17 && holeContainer.append(next);
}

function renderCard() {
    setPage('card');
    const cardContainer = document.getElementById('card');
    cardContainer.innerHTML = null;
    cardContainer.classList.remove('hidden');

    const cardViewToggle = document.createElement('button');
    cardViewToggle.className = 'hover:scale-[105%] transition-transform w-10 h-10 rounded-full bg-primary-transparent flex items-center justify-center text-3xl border border-primary hover:scale-[105%] transition-transform fixed top-6 right-6';
    cardViewToggle.addEventListener('click', () => {
        cardContainer.classList.add('hidden');
        renderHole()
    })

    const cardIcon = document.createElement('i');
    cardIcon.className = 'ri-table-fill';

    cardViewToggle.append(cardIcon);

    cardContainer.append(cardViewToggle);
}

function renderTitle() {
    const title = document.getElementById('title');
    title.innerHTML = null;

    const titleContainer = document.createElement('div');
    titleContainer.className = 'border border-primary px-4 py-2 backdrop-blur-md bg-primary-transparent rounded-lg items-center justify-center flex';

    const h1 = document.createElement('h1');
    h1.className = 'text-center';

    let text;
    switch (page) {
        case 'course':
            text = 'Select Course';
            break;
        case 'tee':
            text = 'Select Tee';
            break;
        case 'players':
            text = 'How Many Players?';
            break;
        case 'hole':
            text = 'Scorecard';
            h1.className = 'text-xl';
            break;
        case 'card':
            text = 'Scorecard';
            h1.className = 'text-xl';
            break;
    }
    h1.innerText = text;
    titleContainer.append(h1);
    title.append(titleContainer);
}

function save() {
    localStorage.setItem('playersArray', JSON.stringify(playersArray));
    playersArray = JSON.parse(localStorage.getItem('playersArray'));
}

renderCourses();