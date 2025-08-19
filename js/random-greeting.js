function randomGreeting(id, texts) {
    const element = document.getElementById(id);
    element.innerHTML = texts[Math.floor(Math.random() * texts.length)];
}

randomGreeting('random-greeting', ['Hello', 'Hi', 'Hey', 'Greetings', 'Hiya', 'Howdy', 'Sup', 'Yo', 'Ello', 'Wassup', 'Ahoy', 'Eyy', 'Hallo', 'G\'day']);
