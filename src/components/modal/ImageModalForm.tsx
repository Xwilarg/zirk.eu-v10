import { useEffect } from "react";
import { isNsfw } from "../../utils";

interface ImageModalFormProps {
    image: string | null;
    nsfw: boolean
    unsetImage: React.Dispatch<React.SetStateAction<string | null>>
}

export default function ImageModalForm({ image, unsetImage, nsfw }: ImageModalFormProps) {
    useEffect(() => {
        window.addEventListener("mousedown", (e) => { if (e.button === 0) unsetImage(null) })
        window.addEventListener("scroll", () => unsetImage(null))
    }, []);

    if (!image) {
        return <></>
    }

    const pageNsfw = isNsfw();

    return (
        <div className='modal is-flex flex-center-hor'>
            <img className={nsfw && pageNsfw === "SFW" ? "blur" :""} src={image} />
        </div>
    )
}