export default {
	index: 0,
	async checkBase64FileType(base64Data) {
		const base64Signatures = {
			"JVBERi0": "application/pdf", // PDF
			"iVBORw0KGgo": "image/png",  // PNG
			"/9j/": "image/jpeg"          // JPEG
		};

		for (let s in base64Signatures) {
			if (base64Data.indexOf(s) === 0) {
				return base64Signatures[s];  // Return MIME type
			}
		}
	},
	async updatePreviewTitle(){
		{{FilePicker2Copy.files.length> 0 ?FilePicker2Copy.files[0].data:Table1Copy.triggeredRow.ownershipImage}}

		let mineType ;
		if(FilePicker2Copy.files.length> 0){
			mineType = FilePicker2Copy.files[0].type
		}
		else{
			let TableImageData= getTitleImageQuery.data[0].ownershipImage;
			mineType= await this.checkBase64FileType(TableImageData); 
		}
		if(mineType.includes("pdf"))
		{
			showModal(TitlesUpdateDocumentView.name);
		}
		else{
			showModal(TitlesUpdateImageView.name);
		}

	},
	prviewImage (id) {
		//	write code here
		this.index=id;
		if(ListTitles.titleList[id].FilePicker2[0].type.includes("pdf")){
			showModal(TitlesDocumentView.name);
		}
		else
		{
			showModal(TitlesImageView.name);

		}
	},
	async priviewViewImage(){
		try{
			let TableImageData= getTitleImageQuery.data[0].ownershipImage;
			let mineType= await this.checkBase64FileType(TableImageData);
			if(mineType.includes("pdf"))
			{
				showModal(TitlesViewDocumentView.name);
			}
			else{
				showModal(TitlesViewImageView.name);
			}
		}
		catch(ex)
		{
			showAlert("Error View the Owership Certificate",ex);
			throw ex;
		} 
	}
}