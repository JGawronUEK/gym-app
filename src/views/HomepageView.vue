<template>
  <div class="logo">
    <img src="https://firebasestorage.googleapis.com/v0/b/gym-app-auth-e127d.appspot.com/o/logo%2FGymAppLogo.png?alt=media&token=3146e134-728d-4e3d-9293-41ea55d64715" alt="logo"/>
  </div>
  <div class="membership-info">
    <h1>Your current membership</h1>
    <p>{{ membershipName }}</p>
  </div>
  <div class="membership-info">
    <h1>Your current trainer</h1>
    <p>{{ trainerName }}</p>
  </div><br>
  <h1 class="text-center">Find our Gym</h1>
  <div id="mapid"></div>
  <br>
  <div>
    <h1 class="text-center">Light your way up</h1>
    <button @click="toggleFlashlight" class="mx-auto d-block flashlight-btn" :class="{ 'flashlight-btn-active': isFlashlightOn }">{{ isFlashlightOn ? 'Turn off' : 'Turn on' }} flashlight</button>
  </div>
  <button class="signout-btn mx-auto d-block" @click="handleSignOut">Logout</button>
</template>

<style scoped>
.logo {
  max-width: 400px;
  height: auto;
  margin: 0 auto;
  text-align: center;
}

.logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.membership-info {
  text-align: center;
  background-color: #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
}

.signout-btn {
  background-color: #9c9393;
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
#mapid {
  margin-top: 20px;
  height: 400px;
  border-radius: 20px;
}
.leaflet-routing-container-hide {
  display: none;
}

.flashlight-btn {
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
  .flashlight-btn-active {
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
  import { onUnmounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { auth, db } from '../firebase/firebaseInit';
  import { collection, query, where, getDocs } from "firebase/firestore";
  import L from 'leaflet';
  import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
  import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';

  const setupMap = () => {
    const mapElement = document.getElementById('mapid');
    if (!mapElement) {
      return;
    }
    const map = L.map(mapElement).setView([0, 0], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const marker = L.marker([0, 0]).addTo(map);

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      marker.setLatLng([latitude, longitude]);
      map.setView([latitude, longitude], 13);

      // Add route
      L.Routing.control({
        waypoints: [
          L.latLng(latitude, longitude),
          L.latLng(50.06236087912351, 19.968371132390573), // Coordinates for Aleja Pokoju 16, Kraków
        ],
        router: L.Routing.osrmv1({
          serviceUrl: 'https://routing.openstreetmap.de/routed-car/route/v1', // Use an OSRM routing server
        }),
        routeWhileDragging: false,
      }).addTo(map);
      document.querySelector('.leaflet-routing-container').classList.add('leaflet-routing-container-hide');
    }, (error) => {
      console.error(error);
    });
  };


  export default {

    data() {
      return {
        isFlashlightOn: false
      }
    },

    methods: {
      async toggleFlashlight() {
        try {
          await navigator.permissions.query({ name: 'camera' });
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          const track = stream.getVideoTracks()[0];
          if (!this.isFlashlightOn) {
            await track.applyConstraints({ advanced: [{ torch: true }] });
            navigator.vibrate(100); // vibration with 100ms duration
          } else {
            await track.applyConstraints({ advanced: [{ torch: false }] });
            navigator.vibrate([50, 100, 50]); // vibration with 3 cycles of 50ms on, 100ms off, 50ms on
          }
          this.isFlashlightOn = !this.isFlashlightOn;
        } catch (error) {
          console.error(error);
        }
      },
    },

    setup() {
      const router = useRouter();
      const membershipName = ref('');
      const trainerName = ref('');

      const handleSignOut = async () => {
        try {
          await auth.signOut();
          router.push('/signin');
          console.log('Successfully signed out!');
        } catch (error) {
          console.error(error);
        }
      };

      const checkMembership = async (userEmail) => {
        try {
          const q = query(collection(db, "users-memberships"), where("email", "==", userEmail));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const membershipDoc = querySnapshot.docs[0];
            membershipName.value = membershipDoc.data().name;
          } else {
            membershipName.value = 'None';
          }
        } catch (error) {
          console.error(error);
        }
      };

      const checkTrainer = async (userEmail) => {
        try {
          const q = query(collection(db, "users-trainers"), where("email", "==", userEmail));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const trainerDoc = querySnapshot.docs[0];
            trainerName.value = trainerDoc.data().name;
          } else {
            trainerName.value = 'None';
          }
        } catch (error) {
          console.error(error);
        }
      };

      auth.onAuthStateChanged((user) => {
        if (user) {
          checkMembership(user.email);
          checkTrainer(user.email);
        }
      });

      onUnmounted(() => {
        // Clean up any Firebase listeners, etc.
      });

      return {
        handleSignOut,
        membershipName,
        trainerName,
      };
    },
    mounted() {
      setupMap();
    }
  };
</script>
