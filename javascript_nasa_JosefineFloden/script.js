//skapar en referens till inputfältet och till button raden efter
const spaceName = document.querySelector('#spaceName');
const sendBtn = document.querySelector('#sendBtn');
//Skapar en referens till p-tagen där resultatet sen hamnar
const resultInput = document.querySelector('#resultElement');
const inputValue = spaceName.value;


//API NYCKEL UHyb8U6pjuRgivcZJuSRrWtzZcZvxWuhmN2B8oo1
//BILD LÄNK  //https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos

const apiKey = 'UHyb8U6pjuRgivcZJuSRrWtzZcZvxWuhmN2B8oo1';
const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}&sol=1000`;

//för att kolla om "ingen data finns, fungerar"
// const earthDate = '1950-03-20'; // Ange det önskade datumet här
// const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}&earth_date=${earthDate}`;




// För att hämta data använder vi fetch
//Första then gör om response tll json
//Andra then är vad vi ska göra med datan
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

        //sparar data.photos, namnet på datan i consolen i en variabel.
        //Curositydata är arrayen som innehåller foton
        const curiosityData = data.photos

        //skapar en referens till containern där card ska ligga i HTML - för att få kortet till containern 
        const cardContainer = document.querySelector('#curiosity');

        //Om denna blir sant så finns det data, det finns bilder
        if (curiosityData.length !== 0) {

            //variabel som begränsar datan till 4 
            const limitedData = curiosityData.slice(0, 4);

            limitedData.forEach(element => {
                //anropar på funktionen createCard, som skapar upp ett nytt kort, vi gör funktionen längre ner
                //För att skicka data till en funktion gör man det i parantesen element, vi lägger denna senare i en variabelfrån return
                //createCard(element)
                const newCard = createCard(element)
                //För att lägga till nya card i container
                cardContainer.append(newCard);


            });


        } else {
            // Skapa ett nytt h3-element för att visa meddelandet
            const noDataMessage = document.createElement('h3');
            noDataMessage.textContent = 'No data was found, please come back tomorrow';
            // Lägg till meddelandet i containern
            cardContainer.append(noDataMessage);
        }


        //Fångar om det blir fel 
    }).catch(error => console.log(`Detta är felet: ${error}`));

//Eftersom vi skickar in data i anropet av funktion så måste vi göra en variabel i parantecerna för att kunna ta emot data
function createCard(element) {
    console.log('CreateCard körs');
    //skapar upp alla HTML element

    const article = document.createElement('article');
    //Lägga till klass på article med namnet nasa-card
    article.classList.add('nasa-card');
    const title = document.createElement('h3');
    const imgDiv = document.createElement('div');
    //Lägga till klass på div med namnet nasa-img
    imgDiv.classList.add('nasa-img');
    const img = document.createElement('img');
    const dateInfo = document.createElement('p');


    //för att lägga till datan från nasa i title och dateinfo och i img
    title.textContent = element.rover.name;
    dateInfo.textContent = element.earth_date;
    img.src = element.img_src;


    //lägger img i img div
    imgDiv.append(img);
    //lägger till element i article
    article.append(title, imgDiv, dateInfo);
    imgDiv.append(img);

    console.log(article);

    //för att kunna skicka det nya kortet tillbaka till loop, för att vi ska kumma använda behöver vi spara i en variabel i loopen
    return article;


}


//DARKMODE
const switchBtn = document.querySelector('#switchBtn');
//skapar en referens till body
const bodyRef = document.querySelector('body');
const darkModeKey = 'theme-dark';
const darkModeValue = 'active';


//lyssnare som lyssnar efter när användaren släpper upp en tangent
spaceName.addEventListener('keyup', () => {
    //Spara "hämta längden på värdet i input i en variabel"
    let getValueLength = spaceName.value.length;
    //kontrollera så att användaren skrivit mer än 3 tecken
    //villkoret get value större än 3 då händer detta... annars...
    if (getValueLength > 3) {
        //btn ska bli enabled
        sendBtn.disabled = false;
    } else {
        console.log('mindre');
        //btn ska bli disabled
        sendBtn.disabled = true;

    }
});

//lyssnar efter när input är i focus 
spaceName.addEventListener('focus', () => {
    //lägger till klassen focus, som finns i style
    spaceName.classList.toggle('focusBorder')
});

//lyssnar efter när input är i blur
spaceName.addEventListener('blur', () => {
    //lägga till klassen focus
    spaceName.classList.toggle('focusBorder')


});

//Lyssnare som lyssnar efter klick på btn
sendBtn.addEventListener('click', (event) => {
    //Avbryter btns default beteende, den skickar inte formuläret
    event.preventDefault();
    //rensa input, '' betyder tom sträng
    //Sparar värdet av det som skrivs i inputrutan
    const inputValue = spaceName.value;
    //lägger text + värdet som skrivs 
    resultInput.textContent = "Welcome " + inputValue + " to IMF!";
    spaceName.value = '';
    //kontrollera om spaceName fältet är tomt och sätt btn till disabled
    if (spaceName.value === '') {
        //Om det är tomt
        console.log('tomt');
        //btn ska bli disabled
        sendBtn.disabled = true;
    }

});


//DARKMODE

//kontrollera om det finns något i localStorage
//det jag får i getitem är det samma sak som mitt värde jag bestämt tidigare om jag har jag något i mitt local storage 
if (localStorage.getItem(darkModeKey) === darkModeValue) {
    //vi anropar enabled darkmode
    enabledDarkmode();

}

//BUTTON
switchBtn.addEventListener('click', () => {
    //Anropar funktionen toogleDarkMode
    toggleDarkMode();

});


function toggleDarkMode() {
    //Kontrollera om body har klassen dark, 
    if (bodyRef.classList.contains('dark')) {
        //Om klassen dark finns - ta bort klassen dark, refererar till funktionen
        disabledDarkmode();
    } else {
        console.log('klassen dark finns INTE');
        //Om klassen inte finns - så vill vi lägga till klassen, referarar till fuktionen
        enabledDarkmode();
    }

}

//funktion för att lägga till klassen
function enabledDarkmode() {
    switchBtn.checked = true;
    //lägga till dark på body
    bodyRef.classList.add('dark');
    //sätta localstorage, kan heta vad som helst
    setLocalStorage();
}

//funktion för att ta bort dark mode
function disabledDarkmode() {
    bodyRef.classList.remove('dark');
    //funktion för at ta bort localStorage
    removeLocalStorage();



}

//funktion för att sätta localStorage
function setLocalStorage() {
    //sätter loalStorage med en key och value, se konstanter högst upp 
    //ska kunna se i application att det står theme dark
    localStorage.setItem(darkModeKey, darkModeValue);


}

//funktion för att ta bort localStorage
function removeLocalStorage() {
    console.log('removeLocalStorage körs');
    //Ta bort satt localStorage
    localStorage.removeItem(darkModeKey);
}




