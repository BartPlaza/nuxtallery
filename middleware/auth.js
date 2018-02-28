export default function(context){
	if(process.isClient && !context.store.getters.isAuthenticated){
		context.redirect('/auth');
	} 
}