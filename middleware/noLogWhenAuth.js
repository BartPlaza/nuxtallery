import firebase from 'firebase';

export default function(context){
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			context.redirect('/');
		}
	})
}
