export default {
	async deleteComplaintCart (id) {
		try{
			AddListInput.listArray = AddListInput.listArray.filter(item => item.id !== id);
			console.log(AddListInput.listArray );
		}
		catch(ex)
		{
			console.error(`Error deleting complaint with id ${id}:`, ex);
		}
	},
	async deleteMutipleComplaintCart(ids){
		try{
			AddListInput.listArray = AddListInput.listArray.filter(item => !ids.includes(item.id));
			console.log("multiple",AddListInput.listArray );
		}
		catch(ex)
		{
			console.error(`Error deleting complaint with id ${ids}:`, ex);
		} 
	}
}