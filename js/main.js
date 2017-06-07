var studentClick = document.querySelector('.showcase');
studentClick.addEventListener('click', toggleCourses);

var courseListing = document.querySelector('.course-listings');

function toggleCourses(evt) {

    if (courseListing.classList.contains('hidden')) {
        courseListing.classList.remove('hidden');
        evt.preventDefault();
    } else {
        courseListing.classList.add('hidden');
    }
    evt.preventDefault();
}