export const useImage = async (fileImage: string | Blob) => {
	const url = process.env.URL_CLOUDINARY_RES;
	const formData = new FormData();
	formData.append('file', fileImage as string | Blob);
	formData.append('upload_preset', process.env.PRESET_HEADER_INFO as string);

	const res = await fetch(url as string, {
		method: 'POST',
		body: formData,
	});

	const imageData = await res.json();
	return imageData.secure_url;
};
