import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ToastList from '../components/toast_list/toast_list'

const Login = () => {

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    
    /* navigate */
    const navigate = useNavigate();

    // toast notify
    const [toasts, setToasts] = useState([]);
    const [autoClose, setAutoClose] = useState(true);
    const [autoCloseDuration, setAutoCloseDuration] = useState(5);
    const [position, setPosition] = useState("bottom-right");

    /* show toast notify */
    const showToast = (message, type) => {
        const toast = {
            id: Date.now(),
            message,
            type,
        };
        setToasts((prevToasts) => [...prevToasts, toast]);
        if (autoClose) {
            setTimeout(() => {
                removeToast(toast.id);
            }, autoCloseDuration * 1000);
        }
    };

    const removeToast = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    /* handle account change */
    const handleAccountChange = (e) => {
        setAccount(e);
    }
    /* handle password change */
    const handlePasswordChange = (e) => {
        setPassword(e);
    }
    /* handle login submitted */
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to your login API
            const data = await fetch("http://localhost:8000/v1/user/login", {
                method: "POST",
                body: JSON.stringify({ Account: account, Password: password }),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // Handle the API response
            if (data.status === 201) {
                navigate('/home');
            }
            if (data.status === 400) {
                showToast('Login failed', 'failure')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src="../src/assets/images/signin-image.jpg" alt="sing up image" /></figure>
                        <Link to="/signup" class="signup-image-link">Create an account</Link>
                    </div>
                    <div class="signin-form">
                        <h2 class="form-title">Login to CallMe now!</h2>
                        <form method="POST" class="register-form" id="login-form" onSubmit={handleLogin}>
                            <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="your_name" id="your_name" placeholder="Your Account" onChange={(e) => handleAccountChange(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="your_pass" id="your_pass" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} />
                            </div>
                            {/* <div class="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                            </div> */}
                            <div class="form-group form-button">
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Log in" />
                            </div>
                        </form>
                        <div class="social-login">
                            <span class="social-label">Or login with</span>
                            <ul class="socials">
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ToastList data={toasts} position={position} removeToast={removeToast} />
        </section>
    );
}
export default Login;