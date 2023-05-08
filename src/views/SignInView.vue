<template>
    <div class="container">
      <div class="box">
        <h1>Sign In</h1>
        <div class="form-group">
          <label>Email</label>
          <input type="text" placeholder="Email" v-model="email" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" placeholder="Password" v-model="password" />
          <p v-if="errMsg">{{ errMsg }}</p>
        </div>
        <button class="submit-btn" @click="signIn">Sign In</button><br>
        <button class="google-btn" @click="signInWithGoogle">Sign In with Google</button>
        <div> <br>
          Don't have an account? <br><button class="register-btn"><router-link to="/register" style="text-decoration: none; color: white;">Register</router-link></button>
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
    .register-btn {
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
  import { defineComponent, ref } from "vue";
  import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
  } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  export default defineComponent({
    name: "SignInPage",
    setup() {
      const email = ref("");
      const password = ref("");
      const router = useRouter();
      const errMsg = ref(null);
  
      const signIn = () => {
        signInWithEmailAndPassword(getAuth(), email.value, password.value)
          .then(() => {
            console.log("Successfully signed in!");
            router.push("/");
          })
          .catch((error) => {
            console.log(error.code);
            switch (error.code) {
              case "auth/invalid-email":
                errMsg.value = "Invalid email";
                break;
              case "auth/user-not-found":
                errMsg.value = "No account with that email was found";
                break;
              case "auth/wrong-password":
                errMsg.value = "Incorrect password";
                break;
              default:
                errMsg.value = "Email or password was incorrect";
                break;
            }
          });
      };
  
      const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
          .then(() => {
            console.log("Successfully signed in with Google!");
            router.push("/");
          })
          .catch((error) => {
            console.log(error.code);
            errMsg.value = "Error signing in with Google";
          });
      };
  
      return {
        email,
        password,
        errMsg,
        signIn,
        signInWithGoogle,
      };
    },
  });
  </script>
  