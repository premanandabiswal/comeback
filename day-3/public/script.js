const visual = document.querySelector('.visual');
const motionToggle = document.querySelector('.motion-toggle');
const buttonIcon = document.querySelector('.button-icon');
const buttonLabel = document.querySelector('.button-label');

motionToggle.addEventListener('click', () => {
    const isPaused = visual.classList.toggle('is-paused');

    motionToggle.setAttribute('aria-pressed', String(isPaused));
    buttonIcon.textContent = isPaused ? '▶' : 'Ⅱ';
    buttonLabel.textContent = isPaused ? 'Resume rotation' : 'Pause rotation';
});