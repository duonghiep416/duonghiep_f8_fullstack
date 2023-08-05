const paragraph = document.querySelector(".title");
var paragraphText = paragraph.innerText;

function karaoke(paragraphText) {
    const arrPara = paragraphText.split(" ");
    const copyPara = [...arrPara];
    var currentIndex = 0;
    setInterval(() => {
        if (currentIndex < arrPara.length) {
            arrPara[
                currentIndex
            ] = `<span class = "highlight">${arrPara[currentIndex]}</span>`;
            currentIndex++;
            paragraph.innerHTML = arrPara.join(" ");
        } else {
            currentIndex = 0;
        }
        arrPara[currentIndex - 1] = copyPara[currentIndex - 1];
    }, 1000);
}

karaoke(paragraphText);
