export default {
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
	copyrightDocument () {
		//	write code here
		if(FilePicker1Copy.files[0].type.includes("pdf"))
		{
			showModal(CopyRightDocumnetView.name);
		}
		else{
			showModal(CopyRightImageView.name);
		}

	},
	AuthorisedDocument () {
		//	write code here
		if(FilePicker2.files[0].type.includes("pdf"))
		{
			showModal(AuthorisedDocumentView.name);
		}
		else{
			showModal(AuthorisedImageView.name);
		}

	},
	async IdentficationDcoument () {
		//	write code here
		if(FilePicker1.files[0].type.includes("pdf"))
		{
			showModal(IdentificationDocumentView.name);
		}
		else{
			showModal(IdentificationImageView.name);
		}

	},
	async titleDocument (index) {
		//	write code here
		if(ListTitles.titleList[index].FilePicker2Copy[0].type.includes("pdf"))
		{
			await storeValue("TitlePreviewIndex",index);
			showModal(TitlesDocumentView.name);
		}
		else{
			await storeValue("TitlePreviewIndex",index);
			showModal(TitlesImageView.name);
		}

	},
	async titleViewDocument(){
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