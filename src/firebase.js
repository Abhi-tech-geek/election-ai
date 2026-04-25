import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

// Using dummy configuration for Hackathon mock if env variables aren't set
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "election-sahayak.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "election-sahayak",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "election-sahayak.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    // In a real environment, this opens a popup. 
    // We return mock data for the hackathon presentation if no API key is present.
    if (firebaseConfig.apiKey === "mock-api-key") {
        console.warn("Using mock Firebase Auth");
        return { user: { displayName: "Demo Citizen", email: "citizen@india.gov.in" } };
    }
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    console.error("Auth Error", error);
    throw error;
  }
};

export const logOut = async () => {
  if (firebaseConfig.apiKey === "mock-api-key") return;
  return signOut(auth);
};

// Mock function to fetch stations if Firestore is not actually set up with data
export const fetchPollingStations = async (pincode) => {
  if (firebaseConfig.apiKey === "mock-api-key") {
      // Return mock data for the hackathon
      return [
          { id: 1, name: "Govt. Senior Secondary School", address: "Sector 14, Main Road", distance: "0.8 km" },
          { id: 2, name: "Community Center Hall A", address: "Sector 15, Near Park", distance: "1.2 km" }
      ];
  }
  
  const stationsRef = collection(db, "polling_stations");
  const q = query(stationsRef, where("pincode", "==", pincode));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Mock function for Firebase Cloud Storage (Photo Upload)
export const uploadPhotoMock = async (file) => {
  if (!file) throw new Error("No file selected");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, url: "gs://election-sahayak.appspot.com/photos/voter-id-pic.jpg", message: "Successfully uploaded to Firebase Storage" });
    }, 1200); // Simulate network delay
  });
};
