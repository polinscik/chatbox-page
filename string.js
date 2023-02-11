const mainForm = document.forms.main;

const nameInput = mainForm.name;
const imageInput = mainForm.avatar;
const textareaInput = mainForm.textarea;

const errorMessage = document.getElementById("error");

const anonCheckbox = mainForm.anon;

const button = document.getElementById("submit");
const chatBox = document.getElementById("chatbox");

//управление чекбоксом
anonCheckbox.addEventListener("change", function () {
    clearErrorMessage();
    if (anonCheckbox.checked) {
        nameInput.value = "Username";
        nameInput.setAttribute("disabled", "true");
    } else if (!anonCheckbox.checked) {
        nameInput.removeAttribute("disabled");
        nameInput.value = "";
    }
});

//при нажатии Отправить: проверяет оба случая анонимного/неанон комментария, фиксит регистр букв в имени, добавляя все слова в массив,
//потом чистит пустые элементы массива, и очищает текстовое поле при публикации комментария
button.addEventListener("click", function () {
    if (
        (!anonCheckbox.checked && nameInput.value && textareaInput.value) ||
        (anonCheckbox.checked && textareaInput.value)
    ) {
        const namesArr = nameInput.value.split(" ");
        console.log(namesArr);
        let namesArrCorrected = [];
        namesArr.forEach(function (element) {
            element = makeFirstLetterBig(element);
            namesArrCorrected.push(element);
        });
        const namesArrFiltered = namesArrCorrected.filter(function (el) {
            return el != "";
        });
        const fullName = namesArrFiltered.join(" ").trim();
        createChatLog(fullName);
        clearInput();
    } else {
        errorMessage.textContent = "Вы не заполнили нужные поля.";
    }
});

//убирает сообщение об ошибке
function clearErrorMessage() {
    errorMessage.textContent = "";
}
textareaInput.addEventListener("focus", function () {
    clearErrorMessage();
});
nameInput.addEventListener("focus", function () {
    clearErrorMessage();
});

//создание элементов в доме + присвоение классов и информации из формы
function createChatLog(username) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("chatlog");
    chatBox.appendChild(newDiv);

    const divForUserInfo = document.createElement("div");
    divForUserInfo.classList.add("chatlog__userInfo");
    newDiv.appendChild(divForUserInfo);

    const divForMessage = document.createElement("div");
    divForMessage.classList.add("chatlog__message");
    newDiv.appendChild(divForMessage);
    divForMessage.textContent = checkSpam(textareaInput.value);

    const imgForUserimg = document.createElement("img");
    imgForUserimg.classList.add("chatlog__userImage");
    if (imageInput.value.includes("http")) {
        imgForUserimg.setAttribute("src", imageInput.value);
    } else {
        assignRandomImg(imgForUserimg);
    }
    divForUserInfo.appendChild(imgForUserimg);

    const paraForUserName = document.createElement("p");
    paraForUserName.classList.add("chatlog__userName");
    paraForUserName.textContent = username;
    divForUserInfo.appendChild(paraForUserName);

    const paraForTime = document.createElement("p");
    paraForTime.classList.add("chatlog__time");
    paraForTime.textContent = getTimeAndDate();
    divForUserInfo.appendChild(paraForTime);
}

function makeFirstLetterBig(string) {
    let newString =
        string.toUpperCase().slice(0, 1) + string.slice(1).toLowerCase();
    return newString;
}

//опции для даты
let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
};

function getTimeAndDate() {
    const date = new Date();
    const viewDate = date.toLocaleString("ru", options);
    return viewDate;
}

function clearInput() {
    textareaInput.value = "";
}

function checkSpam(string) {
    let stringChecked;
    stringChecked = string.replace(/viagra/gim, "***");
    stringChecked = stringChecked.replace(/xxx/gim, "***");
    return stringChecked;
}

function assignRandomImg(element) {
    element.setAttribute(
        "src",
        avatars[Math.floor(Math.random() * avatars.length)]
    );
}

const avatars = [
    "/assets/images/pfp-butterflies.jpg",
    "/assets/images/pfp-cat.jpg",
    "/assets/images/pfp-clouds.jpg",
    "/assets/images/pfp-devil.jpg",
    "/assets/images/pfp-orange-sky.jpg",
    "/assets/images/pfp-sunset.jpg",
];
