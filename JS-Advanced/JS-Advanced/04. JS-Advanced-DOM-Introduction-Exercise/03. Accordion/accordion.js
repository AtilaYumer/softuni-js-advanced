function toggle() {
    console.log('TODO:...');
    const button = document.querySelector('#accordion .button');
    button.textContent = button.textContent === 'More' ? 'Less' : 'More';

    const div = document.getElementById('extra');
    div.style.display = div.style.display === 'none' || div.style.display === '' ? 'block' : 'none';
}