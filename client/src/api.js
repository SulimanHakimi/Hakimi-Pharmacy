import axios from 'axios';
export const loginWithGoogle = () => axios.get('http://localhost:5000/auth/google');
