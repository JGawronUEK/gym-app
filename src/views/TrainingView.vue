<template>
    <div class="trainer-page">
      <h1 class="text-center">Choose Your Personal Trainer</h1>
      <div class="personal-trainer-options">
        <div v-for="trainer in trainers" :key="trainer.name" class="personal-trainer-option" @click="selectTrainer(trainer.name)">
          <h2>{{ trainer.name }}</h2>
          <img :src="trainer.image" alt="">
          <p>Rate per session: ${{ trainer.rate }}</p>
          <p>Experience: {{ trainer.experience }}</p>
          <p>Specialty: {{ trainer.specialty }}</p>
        </div>
      </div>
      <div v-if="selectedTrainer" class="selected-personal-trainer-option">
        <h2 class="text-center">You have selected {{ selectedTrainer }}</h2>
        <p class="text-center" v-if="!registrationComplete">Click the button below to start working with your personal trainer!</p>
        <p class="text-center" v-else>Thank you!</p>
        <button class="pay-btn mx-auto d-block" @click="completeRegistration" v-if="!registrationComplete">Book trainer</button>
        <button class="pay-btn-active mx-auto d-block" v-else>Trainer booked</button>
      </div>
    </div>
</template>
  
    
<style>
    
    .personal-trainer-options {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 20px;
    }
  
    .personal-trainer-option {
      background-color: #f4f4f4;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      padding: 20px;
      cursor: pointer;
    }

    .selected-personal-trainer-option {
      background-color: #e0e0e0;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-top: 20px;
      cursor: pointer;
    }
  
    .personal-trainer-option:hover {
      background-color: #e0e0e0;
    }

    .pay-btn {
      background-color: #06c3c8;
      color: white;
      border-radius: 20px;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
    }

    .pay-btn-active {
      background-color: #039ea3;
      color: white;
      border-radius: 20px;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
    }

    img {
      border-radius: 20px;
    }
  
</style>

<script>

/* eslint-disable */
  import { db, auth } from '../firebase/firebaseInit'
  import { doc, query, where, collection, getDocs, addDoc, updateDoc } from "firebase/firestore";

export default {
  data() {
    return {
      trainers: [
        {
          name: "John Doe",
          image: "https://firebasestorage.googleapis.com/v0/b/gym-app-auth-e127d.appspot.com/o/trainers%2Fjohn.jpg?alt=media&token=37a843ff-0165-4641-b1fb-616ab6d72791",
          experience: "5 years",
          specialty: "Weight Loss",
          rate: 80,
        },
        {
          name: "Jake Smith",
          image: "https://firebasestorage.googleapis.com/v0/b/gym-app-auth-e127d.appspot.com/o/trainers%2Fjake.jpg?alt=media&token=1b29d549-95ff-48ca-83ed-494b6322214b",
          experience: "3 years",
          specialty: "Muscle Gain",
          rate: 90,
        },
        {
          name: "Mike Tyson",
          image: "https://firebasestorage.googleapis.com/v0/b/gym-app-auth-e127d.appspot.com/o/trainers%2Fmike.jpg?alt=media&token=87ca7f02-c535-4207-98a4-5ccc275edb8e",
          experience: "10 years",
          specialty: "Endurance Training",
          rate: 100,
        },
        {
          name: "Sarah Lee",
          image: "https://firebasestorage.googleapis.com/v0/b/gym-app-auth-e127d.appspot.com/o/trainers%2Fsarah.jpg?alt=media&token=aa8a621d-8fd3-471b-bb1f-b563a9f36496",
          experience: "2 years",
          specialty: "Yoga",
          rate: 70,
        },
      ],
      selectedTrainer: "",
      registrationComplete: false,
    };
  },
  methods: {
    selectTrainer(name) {
      this.selectedTrainer = name;
      this.registrationComplete = false;
      setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }, 200);
    },
    async completeRegistration() {
        const user = auth.currentUser;
        if (user) {
          const email = user.email;
          const usersTrainersRef = collection(db, "users-trainers");
          const querySnapshot = await getDocs(query(usersTrainersRef, where("email", "==", email)));
          if (querySnapshot.size > 0) {
            // User already has a membership, so update the membership name in the existing document
            const docId = querySnapshot.docs[0].id;
            try {
              await updateDoc(doc(usersTrainersRef, docId), { name: this.selectedTrainer });
              console.log("Trainer successfully updated in Firestore");
            } catch (e) {
              console.error("Error updating trainer in Firestore: ", e);
            }
          } else {
            // User doesn't have a membership yet, so create a new document
            const data = {
              name: this.selectedTrainer,
              email: email
            };
            try {
              await addDoc(usersTrainersRef, data);
              console.log("Trainer successfully added to Firestore");
            } catch (e) {
              console.error("Error adding trainer to Firestore: ", e);
            }
          }
          this.registrationComplete = true;
        }
    }

  },
};

</script>
