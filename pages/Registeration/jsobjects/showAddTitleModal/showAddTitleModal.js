export default {
	resetWidgets() {
		// removeValue();\
		ListTitles.titleList = [{
			id:1,
			titleName:"",
			FilePicker2Copy: []
		}]
		resetWidget("List2",true);
	},
	async titleModal() {
		showModal(Modal2.name); // Corrected: Use the modal's name as a string
		this.resetWidgets(); // Corrected: No additional ()
	},
};
