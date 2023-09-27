class F8 {
    static component(name, callback) {
        let data = callback.data();
        //Template
        const templateEl = document.createElement("template");
        templateEl.innerHTML = callback.template;
        const templateNode = templateEl.content.cloneNode(true);
        const variables = getVariables(callback.template);
        for (let i = 0; i < templateNode.children.length; i++) {
            for (let j = 0; j < variables.length; j++) {
                const variableName = `{{${variables[j]}}}`;
                if (templateNode.children[i].innerHTML.includes(variableName)) {
                    templateNode.children[i].innerHTML = templateNode.children[
                        i
                    ].innerHTML.replace(variableName, data[variables[j]]);
                }
            }
        }
        const templateNodeChildren = [...templateNode.children];
        templateNodeChildren.forEach((child) => {
            // Chuỗi đầu vào
            const inputString = child.outerHTML;

            // Sử dụng biểu thức chính quy để tìm chuỗi 'click'
            const regex = /v-on:([a-zA-Z-]+)\s*=\s*["']([^"']+)["']/;
            const matches = inputString.match(regex);
            // Lấy giá trị của sự kiện
            if (matches && matches.length >= 3) {
                const eventName = matches[1]; // Lấy tên sự kiện
                const eventValue = matches[2]; // Lấy giá trị sự kiện

                const valueRegex = /([a-zA-Z-]+)([+\-]{2})/;
                const valueMatches = eventValue.match(valueRegex);
                if (valueMatches && valueMatches.length >= 3) {
                    const variableName = valueMatches[1]; // Lấy tên biến ('count')
                    const operator = valueMatches[2]; // Lấy phép toán ('--' hoặc '++')

                    child.addEventListener(eventName, () => {
                        if (operator === "--") {
                            data[variableName]--;
                            console.log(data);
                        } else if (operator === "++") {
                            data[variableName]++;
                            console.log(data);
                        }
                    });
                } else {
                    console.log("Không tìm thấy sự kiện.");
                }
            }
        });

        customElements.define(
            name,
            class extends HTMLElement {
                constructor() {
                    super();
                }

                connectedCallback() {
                    this.append(templateNode);
                }
            }
        );
    }
}

// new F8();

// F8.component("counter-app");
// console.log(F8);

function getVariables(html) {
    const results = html.match(/{{.+?}}/g);
    const variables = results.map((result) =>
        result.replace("{{", "").replace("}}", "").trim()
    );
    return variables;
}
