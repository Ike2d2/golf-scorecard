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

async function myFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function renderCourses() {
    const coursesContainer = document.getElementById('courses');
    const courses = await myFetch(coursesUrl);
    console.log(courses);
    courses.forEach(async (e) => {
        const _course = await myFetch(e.url);
        console.log(_course);
        const div = document.createElement('div');
        div.className = 'flex flex-col p-3 backdrop-blur-md text-white items-center rounded-lg hover:scale-[105%] transition-transform bg-primary-transparent w-80 border border-primary';
        div.addEventListener('click', () => {
            coursesContainer.classList.add('hidden');
            setCourse(_course);
            renderTees(course);
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
        span1.innerText = _course.phone;
        div.append(span1);

        coursesContainer.append(div);
    })
}

function renderTees(course) {
    const teesContainer = document.getElementById('tees');
    teesContainer.classList.remove('hidden');
    course.holes[0].teeBoxes.forEach((e, i) => {
        if (e.teeHexColor) {
            const div = document.createElement('div');
            div.className = 'flex justify-between gap-x-6 items-center h-full w-full rounded-lg hover:scale-[105%] transition-transform backdrop-blur-md p-4 bg-primary-transparent border border-primary text-white font-bold';
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
            yardageSpan.style.webkitTextStroke = '1px black';
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
    const playersContainer = document.getElementById('players');
    playersContainer.classList.remove('hidden');

    new Array(4).fill(0).forEach((e, i) => {
        const div = document.createElement('div');
        div.className = 'flex justify-center items-center w-full h-full bg-primary-transparent rounded-lg hover:scale-[105%] transition-transform backdrop-blur-md border border-primary';
        div.addEventListener('click', () => {
            playersContainer.classList.add('hidden');
            setPlayers(i + 1)
            renderHole(tee, players);
        });

        const text = document.createElement('h4');
        text.className = 'text-white font-bold';
        text.innerText = i + 1;

        div.append(text);

        playersContainer.append(div);
    })
};

function renderHole() {
    const holeContainer = document.getElementById('hole');
    holeContainer.innerHTML = null;
    holeContainer.classList.remove('hidden');

    const prev = document.createElement('div');
    prev.className = 'w-10 h-10 rounded-full bg-primary-transparent text-white flex items-center justify-center text-xl border border-primary hover:scale-[105%] transition-transform absolute -left-16';
    prev.addEventListener('click', () => setHole(hole - 1));

    const leftArrow = document.createElement('i');
    leftArrow.className = 'ri-arrow-left-s-line';
    prev.append(leftArrow);

    const next = document.createElement('div');
    next.className = 'w-10 h-10 rounded-full bg-primary-transparent text-white flex items-center justify-center text-xl border border-primary hover:scale-[105%] transition-transform absolute -right-16';
    next.addEventListener('click', () => setHole(hole + 1));

    const rightArrow = document.createElement('i');
    rightArrow.className = 'ri-arrow-right-s-line';
    next.append(rightArrow);

    const scoreCard = document.createElement('div');
    scoreCard.className = "min-w-[60%] border border-primary h-3/4 bg-primary-transparent rounded-lg flex flex-col items-center backdrop-blur-sm font-bold text-white px-4 py-8";

    const currentHole = document.createElement('h1');
    currentHole.innerText = `Hole: ${course.holes[hole].hole}`;

    const currentPar = document.createElement('h1');
    currentPar.innerText = `Par: ${course.holes[hole].teeBoxes[tee].par}`;

    const currentHandicap = document.createElement('h3');
    currentHandicap.className = 'mt-4';
    currentHandicap.innerText = `Handicap: ${course.holes[hole].teeBoxes[tee].hcp}`;

    const holeText = document.createElement('div');
    holeText.append(currentHole, currentPar, currentHandicap);

    const playersHolder = document.createElement('div');
    playersHolder.className = 'flex flex-col gap-y-4 h-full justify-around';

    new Array(players).fill().forEach((e , i) => {
        const player = document.createElement('div');
        player.className = 'flex gap-x-2';

        const span = document.createElement('span');
        span.innerText = `Change Name`;

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Score...');

        player.append(span,input);
        playersHolder.append(player);
    })

    scoreCard.append(holeText, playersHolder);

    hole > 0 && holeContainer.append(prev);
    holeContainer.append(scoreCard);
    hole < 17 && holeContainer.append(next);
}

renderCourses();