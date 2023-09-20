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
const inputTypeColor = $('input[type="color"]');
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

fileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    activeBoxDownload();
});

document.addEventListener("click", (e) => {
    btnDropdown.classList.remove("active");
    isActiveBoxDownload = false;
});

function countWord() {
    if (textEditor.innerText.length === 0) {
        $(".quantity-words").innerText = 0;
        $(".quantity-characters").innerText = 0;
        return;
    }
    const cleanedText = textEditor.innerText.replace(/\s+/g, " ");
    const quantityWords = cleanedText.trim().split(" ").length;
    const quantityCharacters = cleanedText.split("").length;
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

// Tạo link download txt
function createLinkDownloadTxt() {
    const nameFile = getNameFile();
    const blob = new Blob([textEditor.innerText], { type: "text/plain" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${nameFile}.txt`;
    return link;
}

// Tạo link download PDF
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

inputTypeColor.addEventListener("input", () => {
    document.execCommand("foreColor", false, inputTypeColor.value);
});

// Xóa định dạng mặc định của văn bản khi paste
textEditor.addEventListener("paste", (e) => {
    e.preventDefault();
    var text = e.clipboardData.getData("text/plain");

    document.execCommand("insertText", false, text);
});

// //Check caret
textEditor.addEventListener("keyup", () => {
    getCaretPosition(textEditor);
});
textEditor.addEventListener("mouseup", () => {
    getCaretPosition(textEditor);
});

textEditor.addEventListener("input", () => {
    getCaretPosition(textEditor);
});
textEditor.addEventListener("paste", () => {
    getCaretPosition(textEditor);
});
textEditor.addEventListener("cut", () => {
    getCaretPosition(textEditor);
});

textEditor.addEventListener("select", () => {
    getCaretPosition(textEditor);
});
textEditor.addEventListener("selectstart", () => {
    getCaretPosition(textEditor);
});

function getCaretPosition(element) {
    let caretPosition = 0;
    let selection = window.getSelection();

    if (selection.rangeCount > 0) {
        let range = selection.getRangeAt(0);
        let preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretPosition = preCaretRange.toString().length;
    }
    return caretPosition;
}

// function setCaretPosition(element, caretPos) {
//     let range = document.createRange();
//     let sel = window.getSelection();

//     range.setStart(element.innerText, caretPos);
//     range.collapse(true);

//     sel.addRange(range);

//     element.focus();
// }
