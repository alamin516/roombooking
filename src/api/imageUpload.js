export const getImageUrl = async image =>{
    const formData = new FormData();
    formData.append('image', image)

    const url = `https://api.imgbb.com/1/upload?key=a03210f63fbbbdc692228cd4de6e37a8`;

    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })

    const data = await response.json()
    return data.data.display_url
}