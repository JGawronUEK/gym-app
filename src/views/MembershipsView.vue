<template>
  <div class="membership-page">
    <h1 class="text-center">Choose Your Gym Membership</h1>
    <div class="membership-options">
      <div v-for="membership in memberships" :key="membership.name" class="membership-option" @click="selectMembership(membership.name)">
        <h2>{{ membership.name }} Membership</h2>
        <p>${{ membership.pricePerMonth }}/month</p>
        <ul>
          <li v-for="benefit in membership.benefits" :key="benefit">{{ benefit }}</li>
        </ul>
      </div>
    </div>
    <div v-if="selectedMembership" class="selected-membership-option">
      <h2 class="text-center">You have selected the {{ selectedMembership }} membership</h2>
      <p class="text-center" v-if="!registrationComplete">Click the button below to complete your registration and start enjoying your membership benefits!</p>
      <p class="text-center" v-else>Thank you!</p>
      <button class="pay-btn mx-auto d-block" @click="completeRegistration" v-if="!registrationComplete">Complete Registration</button>
      <button class="pay-btn-active mx-auto d-block" v-else>Registration completed</button>
    </div>
  </div>
</template>
  
<style>
    
    .membership-options {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 20px;
    }
  
    .membership-option {
      background-color: #f4f4f4;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 20px;
      cursor: pointer;
    }

    .selected-membership-option {
      background-color: #e0e0e0;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-top: 20px;
      cursor: pointer;
    }
  
    .membership-option:hover {
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


</style>
  
<script>
  /* eslint-disable */
  import { db, auth } from '../firebase/firebaseInit'
  import { doc, query, where, collection, getDocs, addDoc, updateDoc } from "firebase/firestore";

  export default {
    name: 'MembershipPage',
    created() {
      this.getMemberships()
    },
    data() {
      return {
        selectedMembership: null,
        registrationComplete: false,
        memberships: []
      }
    },
    methods: {
      selectMembership(membership) {
        this.selectedMembership = membership;
        this.registrationComplete = false;
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }, 200);
      },
      async completeRegistration() {
        const selectedMembershipObject = this.memberships.find((membership) => membership.name === this.selectedMembership);
        const selectedMembershipData = JSON.stringify(selectedMembershipObject);
        const user = auth.currentUser;
        if (user) {
          const email = user.email;
          const usersMembershipsRef = collection(db, "users-memberships");
          const querySnapshot = await getDocs(query(usersMembershipsRef, where("email", "==", email)));
          if (querySnapshot.size > 0) {
            // User already has a membership, so update the membership name in the existing document
            const docId = querySnapshot.docs[0].id;
            try {
              await updateDoc(doc(usersMembershipsRef, docId), { name: this.selectedMembership });
              console.log("Membership successfully updated in Firestore");
            } catch (e) {
              console.error("Error updating membership in Firestore: ", e);
            }
          } else {
            // User doesn't have a membership yet, so create a new document
            const data = {
              name: this.selectedMembership,
              email: email
            };
            try {
              await addDoc(usersMembershipsRef, data);
              console.log("Membership successfully added to Firestore");
            } catch (e) {
              console.error("Error adding membership to Firestore: ", e);
            }
          }
          this.registrationComplete = true;
        }
      },
      async getMemberships() {
        const querySnapshot = await getDocs(query(collection(db, "memberships")));
        querySnapshot.forEach((doc) => {
          this.memberships.push(doc.data())
        });
        this.memberships.sort((a, b) => a.pricePerMonth - b.pricePerMonth); // Sort by price
      }
    }
  }
</script>
