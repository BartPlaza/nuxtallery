export default function(context){
	if(context.store.getters.isAuthenticated){
		if(context.route.path == '/auth'){
			context.redirect('/');
		}
	}
}