<template>
    <div class="container">
      <div class="box">
        <h1>Create an Account</h1>
        <div class="form-group">
          <label>Email</label>
          <input type="text" placeholder="Email" v-model="email" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <button class="submit-btn" @click="register">Register</button><br>
        <button class="google-btn" @click="signInWithGoogle">Register with Google</button>
        <div> <br>
          Already have an account? <br><button class="login-btn"><router-link to="/signin" style="text-decoration: none; color: white;">Sign In</router-link></button>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 89vh;
    }
  
    .box {
      text-align: center;
      background-color: #f4f4f4;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 400px;
      max-width: 90%;
    }
  
    .form-group {
      margin: 10px 0;
    }
  
    label {
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
      text-align: left;
      font-size: 14px;
    }
  
    input {
      display: block;
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 16px;
      margin-top: 5px;
      box-sizing: border-box;
    }
  
    .submit-btn {
      background-color: #06c3c8;
      color: white;
      border-radius: 20px;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      margin-top: 20px;
    }
    .login-btn {
      background-color: #06c3c8;
      color: white;
      border-radius: 20px;
      padding: 10px 20px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      margin-top: 10px;
    }
  
    .google-btn {
      background-color: #06c3c8;
      color: white;
      border-radius: 20px;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      margin-top: 10px;
    }
</style>
  
<script>
  /* eslint-disable */
  import { defineComponent, ref } from 'vue'
  import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
  import { useRouter } from 'vue-router'
  
  export default defineComponent({
    name: 'RegisterPage',
    setup() {
      const email = ref("")
      const password = ref("")
      const router = useRouter()
  
      const register = () => {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
          console.log("Succesfuly registered!")
          router.push('/')
        })
        .catch((error) => {
          console.log(error.code)
          alert(error.message)
        })
      }
  
      const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            console.log("Successfully signed in with Google");
            router.push('/');
          })
          .catch((error) => {
            console.log(error.code);
            alert(error.message);
          });
      }
  
      return {
        email,
        password,
        register,
        signInWithGoogle
      }
    }
  })
  </script>
