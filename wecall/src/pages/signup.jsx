import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import ToastList from '../components/toast_list/toast_list'

const SignUp = () => {

    // navigate
    const navigate = useNavigate();

    const [account, setAccount] = useState('');
    const [displayname, setDisplayname] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [confirmTermofUse, setConfirmTermofUse] = useState(false);

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

    // validation
    const [accountValidate, setAccountValidate] = useState('');
    const [displaynameValidate, setDisplaynameValidate] = useState('');
    const [passwordValidate, setPasswordValidate] = useState('');
    const [repasswordValidate, setRepasswordValidate] = useState('');

    /* handle account change*/
    const handleAccountChange = (e) => {
        setAccount(e);
        const hasSpecialSymbol = /[^a-zA-Z0-9]/.test(e);
        setAccountValidate(hasSpecialSymbol ? 'Account must not contains special symbols' : '');
    }
    /* handle displayname change*/
    const handleDisplaynameChange = (e) => {
        setDisplayname(e);
        console.log(displayname);
        const hasSpecialSymbol = /[^a-zA-Z0-9 ]/.test(e);
        setDisplaynameValidate(hasSpecialSymbol ? 'Displayname must not contains special symbols' : '');
    }
    /* handle password change*/
    const handlePasswordChange = (e) => {
        setPassword(e)
        const hasSpecialSymbol = /[^a-zA-Z0-9]/.test(e);
        setPasswordValidate((e.length < 6 || hasSpecialSymbol) ? 'Password must contains 6 symbols above' : '');
    }
    /* handle repassword change*/
    const handleRepasswordChange = (e) => {
        setRepassword(e)
        setRepasswordValidate((e !== password) ? 'Password not matched' : '');
    }
    const handleConfirmTermofUse = () => {
        setConfirmTermofUse(!confirmTermofUse);
    }
    /* handle signup submitted*/
    const handleSignup = async (e) => {
        e.preventDefault();
        if (accountValidate || passwordValidate || repasswordValidate || displaynameValidate || confirmTermofUse === false) {
            showToast('sign-up failed', 'failure')
        }
        const formData = new URLSearchParams();
        formData.append('Account', account);
        formData.append('Password', password);
        formData.append('Displayname', displayname);

        await axios.post('http://localhost:8000/v1/user/signup', formData, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(function (response) {
            console.log(response);
            navigate('/login');
        }).catch(function (error) {
            if (error.response.data.message === 'Account already exists') {
                setAccountValidate('Account is already exist. Try another name')
            }
        })
    }

    return (
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Sign up</h2>
                        <form method="POST" class="register-form" id="register-form" onSubmit={handleSignup}>
                            <div class="form-group">
                                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="name" placeholder="Your Account" onChange={(e) => handleAccountChange(e.target.value)} />
                            </div>
                            {accountValidate ? <span style={{ color: 'red' }}>{accountValidate}</span> : ''}
                            <div class="form-group">
                                <label for="email"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="email" id="email" placeholder="Your Displayname" onChange={(e) => handleDisplaynameChange(e.target.value)} />
                            </div>
                            {displaynameValidate ? <span style={{ color: 'red' }}>{displaynameValidate}</span> : ''}
                            <div class="form-group">
                                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="pass" id="pass" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} />
                            </div>
                            {passwordValidate ? <span style={{ color: 'red' }}>{passwordValidate}</span> : ''}
                            <div class="form-group">
                                <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" onChange={(e) => handleRepasswordChange(e.target.value)} />
                            </div>
                            {repasswordValidate ? <span style={{ color: 'red' }}>{repasswordValidate}</span> : ''}
                            <div class="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" onChange={handleConfirmTermofUse} />
                                <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                            </div>
                            {confirmTermofUse === false ? <span style={{ color: 'red' }}>Please agree all statements in Terms of service. Thank you</span> : null}
                            <div class="form-group form-button">
                                <input type="submit" name="signup" id="signup" class="form-submit" value="Register" />
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src="../src/assets/images/signup-image.jpg" alt="sing up image" /></figure>
                        <Link to="/login" class="signup-image-link">I am already member</Link>
                    </div>
                </div>
            </div>
            <ToastList data={toasts} position={position} removeToast={removeToast} />
        </section>
    );
}
export default SignUp;