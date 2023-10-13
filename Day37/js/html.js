export const loginPage = `
    <div id="container" class="login-page">
        <div class="form-container sign-up-container">
            <form action="#" class="signup-form">
                <h1>Create Account</h1>
                <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Name" class="name-signup"/>
                <input type="email" placeholder="Email" class="email-signup"/>
                <input type="password" placeholder="Password" class="password-signup"/>
                <button>Sign Up</button>
            </form>
        </div>
        <div class="form-container sign-in-container">
            <form action="#" class="signin-form">
                <h1>Sign in</h1>
                <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your account</span>
                <input type="email" placeholder="Email" class="email-signin"/>
                <input type="password" placeholder="Password" class="password-signin"/>
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button class="ghost" id="signIn">Sign In</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button class="ghost" id="signUp">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
`;

export const homePage = `
    <div class="container">
        <div class="verified">
            <ul class="profile">
                <li>Chào bạn: <b><span class="name"></span></b></li>
                <li><a href="#" class="logout">Đăng xuất</a></li>
            </ul>
            <form class="post-article">
                <div class="form-group">
                    <label for="title" class="label-form">Tiêu đề bài viết</label>
                    <input id="title" placeholder="Nhập tiêu đề bài viết"/>
                </div>
                <div class="form-group">
                    <label for="content" class="label-form">Nhập nội dung bài viết</label>
                    <textarea name="" id="content" cols="30" rows="10"></textarea>
                </div>
                <button class="submit-article">Submit</button>
            </form>
        </div>
        <div class="unverified">
            <button class="show-login-page">Login</button>
        </div>
        <div class="article-container"></div>
    </div>
`;
