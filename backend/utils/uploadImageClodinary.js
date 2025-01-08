import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name :'ddwxvk7mq',
    api_key : '589467373673676',
    api_secret : 'ag7qn-gqkksD7MLabSNA2wOqFgg'
})

const uploadImageClodinary = async(image)=>{
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

    const uploadImage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({ folder : "quicko"},(error,uploadResult)=>{
            return resolve(uploadResult)
        }).end(buffer)
    })

    return uploadImage
}

export default uploadImageClodinary
