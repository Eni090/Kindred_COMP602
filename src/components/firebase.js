import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCiQVO7eHPBPN-76t-kpbBF933zmFEve5A',
	authDomain: 'kindred-comp602.firebaseapp.com',
	projectId: 'kindred-comp602',
	storageBucket: 'kindred-comp602.appspot.com',
	messagingSenderId: '519699364094',
	appId: '1:519699364094:web:c79cd6ff358ce565bd4daf',
	measurementId: 'G-ETPHW3SMV8'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();

export default database;
