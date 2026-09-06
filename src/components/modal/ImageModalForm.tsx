import { useEffect } from "react";
import { isNsfw } from "../../utils";

interface ImageModalFormProps {
    image: string | null;
    unsetImage: React.Dispatch<React.SetStateAction<string | null>>
}

export default function ImageModalForm({ image, unsetImage }: ImageModalFormProps) {
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
            <img src={image} />
        </div>
    )
}