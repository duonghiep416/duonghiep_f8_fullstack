const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const fileBtn = $("#file-btn");
const btnDropdown = $(".btn-dropdown");
const textDownloadBtn = $("#text-download-btn");
const pdfDownloadBtn = $("#pdf-download-btn");
const textEditor = $(".text-editor");
const btnBold = $("#btn-bold");
const btnUnderline = $("#btn-underline");
const btnItalic = $("#btn-italic");
const btnControlStyle = $(".btn-control-style");
const inputNameFile = $(".name-file");
let isActiveBoxDownload = false;
function activeBoxDownload() {
    if (!isActiveBoxDownload) {
        btnDropdown.classList.add("active");
        isActiveBoxDownload = true;
    } else {
        btnDropdown.classList.remove("active");
        isActiveBoxDownload = false;
    }
}

fileBtn.addEventListener("click", activeBoxDownload);

function countWord() {
    if (textEditor.innerText.trim() === "") {
        $(".quantity-words").innerText = 0;
        $(".quantity-characters").innerText = 0;
        return;
    }
    const quantityWords = textEditor.innerText.trim().split(" ").length;
    const quantityCharacters = textEditor.innerText.split("").length;
    $(".quantity-words").innerText = quantityWords;
    $(".quantity-characters").innerText = quantityCharacters;
}
textEditor.addEventListener("input", countWord);

function setBold() {
    document.execCommand("bold", false, null);
}

function setItalic() {
    document.execCommand("italic", false, null);
}

function setUnderline() {
    document.execCommand("underline", false, null);
}

btnBold.addEventListener("click", setBold);
btnItalic.addEventListener("click", setItalic);
btnUnderline.addEventListener("click", setUnderline);

// Get name file
function getNameFile() {
    const nameFile = inputNameFile.value;
    return nameFile;
}
inputNameFile.addEventListener("input", getNameFile);

function createLinkDownloadTxt() {
    const nameFile = getNameFile();
    const blob = new Blob([textEditor.innerText], { type: "text/plain" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${nameFile}.txt`;
    return link;
}

function createLinkDownloadPdf() {
    const nameFile = getNameFile();

    let opt = {
        filename: `${nameFile}.pdf`,
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(textEditor).save();
}

textDownloadBtn.addEventListener("click", () => {
    const link = createLinkDownloadTxt();
    link.click();
});

pdfDownloadBtn.addEventListener("click", () => {
    createLinkDownloadPdf();
});

// //Check caret
// textEditor.addEventListener("keyup", checkcaret); // Every character written

// textEditor.addEventListener("mousedown", checkcaret); // Click down
// textEditor.addEventListener("touchstart", checkcaret); // Mobile
// textEditor.addEventListener("input", checkcaret); // Other input events
// textEditor.addEventListener("paste", checkcaret); // Clipboard actions
// textEditor.addEventListener("cut", checkcaret);
// textEditor.addEventListener("mousemove", checkcaret); // Selection, dragging text
// textEditor.addEventListener("select", checkcaret); // Some browsers support this event
// textEditor.addEventListener("selectstart", checkcaret); // Some browsers support this event

// let pos = 0;
// function checkcaret() {
//     const newPos = textEditor.selectionStart;
//     if (newPos !== pos) {
//         console.log("change to " + newPos);
//         pos = newPos;
//     }
// }
