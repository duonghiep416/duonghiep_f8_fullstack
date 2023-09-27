F8.component("counter-app", {
    data: () => ({
        count: 0,
        title: "Counter App",
    }),
    template: `
        <h1>{{title}}</h1>
        <p>Count: {{count}}</p>
        <button v-on:click="count--">-</button>
        <button v-on:click="count++">+</button>
        <button v-on:dblclick="title='Hello F8'">Change Title</button>
    `,
});
