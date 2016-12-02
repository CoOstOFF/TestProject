class Auth {
    static skipAuth() {
        localStorage.setItem('skipAuth', true);
    }

    static isAuthSkipped() {
        return localStorage.getItem('skipAuth') !== null;
    }

    static removeSkipAuth() {
        localStorage.removeItem('skipAuth');
    }
}
export default Auth;