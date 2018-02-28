import firebase from 'firebase';
import firebaseConfig from '@/firebase.config';

if(!firebase.apps.length){
	firebase.initializeApp(firebaseConfig);
}

export default function(context){
	firebase.auth().onAuthStateChanged(function(user){
		if (user){
			context.store.commit('setUser', user);
		}
	});
}

