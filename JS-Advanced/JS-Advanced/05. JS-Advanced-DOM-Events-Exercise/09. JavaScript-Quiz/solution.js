function solve() {
  const rightAnswers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents'];
  let rightAnswersCounter = 0;
  const results = document.getElementById('results');
  const quizzie = document.getElementById('quizzie');
  quizzie.addEventListener('click', handleAnswer);

  function handleAnswer(event) {
    const target = event.target;
    if (target.tagName === 'P') {
      if (rightAnswers.includes(target.textContent)) {
        rightAnswersCounter++;
      }
      const currentSection = target.parentNode.parentNode.parentNode.parentNode;
      currentSection.style.display = 'none';
      const nextSection = currentSection.nextElementSibling;
      console.log(nextSection.tagName);
      if (nextSection.tagName === 'SECTION') {
        nextSection.style.display = 'block';
      } else {
        results.style.display = 'block';
        if (rightAnswersCounter === 3) {
          results.firstElementChild.firstElementChild.textContent = 'You are recognized as top JavaScript fan!';
        } else {
          results.firstElementChild.firstElementChild.textContent = `You have ${rightAnswersCounter} right answers`;
        }
      }
    }
  }
}
