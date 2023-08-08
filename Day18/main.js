// const paragraph = document.querySelector(".title");
// var paragraphText = paragraph.innerText;

// function karaoke(paragraphText) {
//     const arrPara = paragraphText.split(" ");
//     const copyPara = [...arrPara];
//     var currentIndex = 0;
//     setInterval(() => {
//         if (currentIndex < arrPara.length) {
//             arrPara[
//                 currentIndex
//             ] = `<span class = "highlight">${arrPara[currentIndex]}</span>`;
//             currentIndex++;
//             paragraph.innerHTML = arrPara.join(" ");
//         } else {
//             currentIndex = 0;
//         }
//         arrPara[currentIndex - 1] = copyPara[currentIndex - 1];
//     }, 1000);
// }

// karaoke(paragraphText);
var keyword = "d";

var title = `<p>Từ khóa tìm kiếm: ${keyword}</p>`;
var content = `<p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi dolores, Dương Hiệp totam earum suscipit dolore minima. totam earum suscipit dolore minima. totam Dương hiệp earum suscipit dolore Dương Hiệp minima.
</p>`;

var position = content.toLowerCase().indexOf(keyword.toLowerCase());
var result = "";

while (position !== -1) {
    result +=
        content.slice(0, position) +
        `<span class="highlight">${content.slice(
            position,
            position + keyword.length
        )}</span>`;

    content = content.slice(position + keyword.length);

    position = content.toLowerCase().indexOf(keyword.toLowerCase());
}
result += content;

document.write(result);
