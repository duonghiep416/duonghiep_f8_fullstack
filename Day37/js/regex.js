const phonePattern = /((0|\+84)[0-9]{9})/g;
const emailPattern =
    /([a-zA-Z]{1,}[a-zA-Z-0-9\._-]{5,}@[a-z0-9-_\.]+\.[a-z]{2,})/g;
const youtubePattern =
    /(?:http|https):\/\/www\.(?:youtube\.com\/watch\?v=([\w-]+)|youtu\.be\/([\w-]+))&*(\<|.*? )/g;

export function convertRegex() {
    const articleContainer = document.querySelector(".article-container");
    let html = articleContainer.innerHTML;
    html = html
        .replace(
            emailPattern,
            "<a href='mailto:$1' class='email-link' target='_blank'>$1</a>"
        )
        .replace(
            phonePattern,
            "<a href='tel:$1' class='phone-link' target='_blank'>$1</a>"
        )
        .replace(
            youtubePattern,
            `<iframe width="600" height="315" src="https://www.youtube.com/embed/$2$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>${
                youtubePattern.exec(html)[3] === "<" ? "$3" : ""
            }`
        );

    articleContainer.innerHTML = html;
}
