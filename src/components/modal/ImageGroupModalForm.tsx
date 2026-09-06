import { useEffect } from "react";
import { isNsfw } from "../../utils";

export interface ImagePreviewInfo
{
    image: string
    nsfw: boolean
}

interface ImageGroupModalFormProps {
    images: ImagePreviewInfo[] | null;
    unsetImage: React.Dispatch<React.SetStateAction<ImagePreviewInfo[] | null>>
}

export default function ImageGroupModalForm({ images, unsetImage }: ImageGroupModalFormProps) {
    useEffect(() => {
        window.addEventListener("mousedown", (e) => { if (e.button === 0) unsetImage(null) })
    }, []);

    if (!images) {
        return <></>
    }

    const pageNsfw = isNsfw();

    return (
        <div className='box modal is-flex flex-center-hor modal-scroll'>
            {images.map(image =>
                image.image.endsWith(".mp4")
                ? <video key={image.image} className={image.nsfw && pageNsfw === "SFW" ? "blur" : ""} src={image.image} autoPlay loop muted />
                : <img key={image.image} className={image.nsfw && pageNsfw === "SFW" ? "blur" : ""} src={image.image} />
            )}
        </div>
    )
}