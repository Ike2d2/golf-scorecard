const coursesUrl = 'https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json';

async function myFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function renderCourses() {
    coursesContainer = document.getElementById('courses');
    const courses = await myFetch(coursesUrl);
    console.log(courses);
    courses.forEach(async (e) => {
        const course = await myFetch(e.url);
        console.log(course);
        const div = document.createElement('div');
        div.className = 'flex flex-col p-3 backdrop-blur-md text-white items-center rounded-lg hover:scale-[105%] transition-transform bg-primary-transparent w-80';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'rounded-md border-2 border-primary overflow-hidden h-64';

        const img = document.createElement('img');
        img.setAttribute('src', course.thumbnail);
        img.className = 'object-none h-full w-full'
        imgWrap.append(img);
        div.append(imgWrap);

        const header = document.createElement('h5');
        header.className = 'font-bold';
        header.innerText = course.name;
        div.append(header);

        const span1 = document.createElement('span');
        span1.innerText = course.phone;
        div.append(span1);

        coursesContainer.append(div);
    })
}

renderCourses();