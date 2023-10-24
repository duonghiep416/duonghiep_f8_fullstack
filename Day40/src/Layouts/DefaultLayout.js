export const DefaultLayout = () => {
    return `
        <header class="header border-b-2 border-orange-400">
            <div class="flex items-center justify-between header-inner max-w-screen-2xl mx-auto py-4">
                <a href="/" class="logo flex items-center gap-1 basis-1/6" data-navigo>
                    <img src="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png" class="w-10 h-10 rounded-lg" alt="Học lập trình để đi làm"/>
                    <h1 class="slogan text-black font-bold ml-2">Học lập trình để đi làm</h1>
                </a>
                <nav class="navbar basis-4/6">
                    <ul class="flex justify-center nav-list">
                        <li class="nav-item">
                            <a href="/" class="nav-link px-10 py-3 font-medium" data-navigo>Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="/about" class="nav-link px-10 py-3 font-medium" data-navigo>About</a>
                        </li>
                        <li class="nav-item">
                            <a href="/courses" class="nav-link px-10 py-3 font-medium" data-navigo>Courses</a>
                        </li>
                        <li class="nav-item">
                            <a href="/blogs" class="nav-link px-10 py-3 font-medium" data-navigo>Blogs</a>
                        </li>
                    </ul>
                </nav>
                <div class="user basis-1/6">
                    <img src="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png" alt="avatar" class="user-avatar rounded-full w-10 h-10" />
                </div>
            </div>
        </header>
        <main class="main max-w-screen-2xl mx-auto" id="main"></main>
    `;
};
