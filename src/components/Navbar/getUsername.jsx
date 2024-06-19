import { auth, db } from '../firebaseInit';

const getUserName = async () => {
  if (!auth.currentUser) {
    throw new Error('No user is currently signed in');
  }
  const uid = auth.currentUser.uid;
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      return userData.username;
    } else {
      throw new Error('No such user document');
    }
  } catch (error) {
    console.error('Error fetching username:', error);
    throw error;
  }
};

export default getUserName;
