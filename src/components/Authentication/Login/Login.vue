<script>
import initilizationAuthentication from "@/firebase/firebase.init";
import { useStore } from "@/store/taskStore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
initilizationAuthentication()
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
export default {
    name: 'Login',
    data() {
        return {
            store: useStore(),
            isValidation: false,
            email: null,
            password: null
        }
    },
    methods: {
        handleLogin() {
            if(!this.email || !this.password) {
                this.isValidation=true;
                alert("Please fill up required field");
                return;
            }
            else {
                signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // console.log(user)
                    this.isValidation=false;
                    this.store.setUser(user);
                    sessionStorage.setItem('user', JSON.stringify(user));
                    this.$router.push({ name: 'Home' })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
            }
        },
        handleGoogleLogin() {
            signInWithPopup(auth, googleProvider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    this.store.setUser(user);
                    sessionStorage.setItem('user',JSON.stringify(user));
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
        }
    },
    created() {
        // Watch for changes in authentication state
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                this.store.setUser(user);
                if (sessionStorage.getItem('user') || this.store.user) {
                    this.$router.push({ name: 'Home' })
                }
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    },
}
</script>

<template>
    <!-- Single Page Header start -->
    <div class="container-fluid page-header py-5 comp-intro-style">
        <h1 class="text-center text-white display-6">Login</h1>
        <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Pages</a></li>
            <li class="breadcrumb-item active text-white">Login</li>
        </ol>
    </div>
    <!-- Single Page Header End -->
    <!-- Contact Start -->
    <section class="login-section-style container">
        <div class="d-flex justify-content-center mb-3 component-nav-style">
            <h4 class="me-5 text-primary">Login</h4>
            <RouterLink :to="{name: 'Registration'}" style="text-decoration: none; color: black;">
                <h4>Registration</h4>
            </RouterLink>
        </div>
        <!-- login form section  -->
        <div class="form-control-style">
            <p class="text-center">Login Your Account</p>
            <label for="Login">Email</label>
            <input 
            v-model.trim="email" 
            :class="{'is-validate': isValidation && !this.email}"
            type="email" 
            id="Login" 
            required 
            placeholder="Enter Your Email">

            <label for="password">Password</label>
            <input v-model.trim="password" 
            type="password" 
            id="password" 
            :class="{'is-validate': isValidation && !this.password}"
            required
            placeholder="Enter Your Password">
            <!-- <div v-if="getError !== null" class="alert alert-danger" role="alert">
                {{ getError }}
            </div> -->
            <button @click="handleLogin" type="button" class="singin-btn">
                Log In
            </button>
            <h6 class="text-center or-text-style">Or</h6>
            <div class="text-center">
                <!-- google signin start -->
                <button @click="handleGoogleLogin" class="gsi-material-button">
                    <div class="gsi-material-button-state"></div>
                    <div class="gsi-material-button-content-wrapper">
                        <div class="gsi-material-button-icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                                xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                                <path fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                                </path>
                                <path fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
                                </path>
                                <path fill="#FBBC05"
                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
                                </path>
                                <path fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                                </path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </div>
                        <span class="gsi-material-button-contents">Continue with Google</span>
                        <span style="display: none;">Continue with Google</span>
                    </div>
                </button>
                <!-- google signin end -->
            </div>
            <div class="forgot-pass-style">
                <span class="material-icons">
                    lock
                </span>
                <p>Forgot Password</p>
                
            </div>
            <p>Are you not register? please <RouterLink :to="{name: 'Registration'}" style="text-decoration: none;">Register</RouterLink></p>
        </div>
    </section>
    <!-- Contact End -->
</template>

<style scoped>
.comp-intro-style h1 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.comp-intro-style li {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.login-section-style {
    background: #F1F1F1;
    width: 100%;
}

.form-control-style {
    box-sizing: border-box;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 418px;
    padding: 42px 28px;
    margin: auto;
    border-radius: 10px;
    z-index: 22;
}

.form-control-style p,
label {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.component-nav-style h4 {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    margin-top: 20px;
    cursor: pointer;
}

.form-control-style input {
    width: 100%;
    height: 42px;
    margin-bottom: 15px;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    padding-left: 5px;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.form-control-style input:focus {
    border: 2px solid #1F5DA0 !important;
    outline: none;
}

.or-text-style {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.singin-btn {
    height: 42px;
    width: 100%;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    background: #1F5DA0;
    color: #FFFFFF;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.singin-btn:hover {
    background: #2D76C4;
    outline: #2D76C4;
}

.forgot-pass-style {
    margin-top: 15px;
    display: flex;
    justify-content: center;
}

.forgot-pass-style p {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    cursor: pointer;
}


/* google sign in start css code  */
.gsi-material-button {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-appearance: none;
    background-color: WHITE;
    background-image: none;
    border: 1px solid #747775;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #1f1f1f;
    cursor: pointer;
    font-family: 'Roboto', arial, sans-serif;
    font-size: 14px;
    height: 40px;
    letter-spacing: 0.25px;
    outline: none;
    overflow: hidden;
    padding: 0 12px;
    position: relative;
    text-align: center;
    -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
    transition: background-color .218s, border-color .218s, box-shadow .218s;
    vertical-align: middle;
    white-space: nowrap;
    width: auto;
    max-width: 400px;
    min-width: min-content;
}

.gsi-material-button .gsi-material-button-icon {
    height: 20px;
    margin-right: 12px;
    min-width: 20px;
    width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
    -webkit-align-items: center;
    align-items: center;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
    height: 100%;
    justify-content: space-between;
    position: relative;
    width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
    -webkit-flex-grow: 1;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.gsi-material-button .gsi-material-button-state {
    -webkit-transition: opacity .218s;
    transition: opacity .218s;
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
}

.gsi-material-button:disabled {
    cursor: default;
    background-color: #ffffff61;
    border-color: #1f1f1f1f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
    opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
    opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state,
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
    background-color: #303030;
    opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
    -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
    background-color: #303030;
    opacity: 8%;
}

.is-validate {
    border: 1px solid red !important;
}

@media only screen and (max-width: 2560px) {
    .login-section-style {
        max-width: 2300px !important;
        margin: auto;
        margin-top: 30px;
        padding-bottom: 30px;
    }
}

@media only screen and (max-width: 1920px) {
    .login-section-style {
        max-width: 1800px !important;
        margin: auto;
        margin-top: 30px;
        padding-bottom: 30px;
    }
}

@media only screen and (max-width: 1440px) {
    .login-section-style {
        max-width: 1300px !important;
        margin: auto;
        margin-top: 30px;
        padding-bottom: 30px;
    }
}

@media only screen and (max-width: 1024px) {
    .login-section-style {
        max-width: 950px !important;
        margin: auto;
        margin-top: 30px;
        padding-bottom: 30px;
    }

}

@media only screen and (max-width: 768px) {
    .login-section-style {
        max-width: 100% !important;
        margin: auto;
        margin-top: 30px;
        padding-bottom: 30px;
    }

}

@media only screen and (max-width: 540px) {
    .login-section-style {
        max-width: 100% !important;
        margin: auto;
        margin-top: 30px;
        padding-bottom: 30px;
    }

    .form-control-style {
        box-sizing: border-box;
        background: #FFFFFF;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        padding: 42px 28px;
        margin: auto;
        border-radius: 10px;
        z-index: 22;
    }
}

/* google sign in end css code  */
</style>