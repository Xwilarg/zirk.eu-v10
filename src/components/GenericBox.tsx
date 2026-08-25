import { isNsfw } from "../utils";

interface GenericBoxProps
{
    name: string,
    image: string | null,
    nsfw: boolean,

    imageCssModifiers: string,

    onMouseEnter: React.MouseEventHandler<HTMLImageElement> | undefined,
    onMouseLeave: React.MouseEventHandler<HTMLImageElement> | undefined
}

export default function GenericBox({ name, image, nsfw, imageCssModifiers, onMouseEnter, onMouseLeave } : GenericBoxProps) {
    let nsfwStatus = isNsfw();
    let hideNsfw = nsfw && nsfwStatus !== "NSFW";

    return <div className="card" id={`box-${name}`}>
        <p className={"text-center box-name"}>{hideNsfw ? "" : name}</p>
        <div className={"box-img is-flex flex-center-hor " + imageCssModifiers}>
            <img className={hideNsfw && image !== null  ? "blur" : ""} src={image === null ? "/img/ComingSoon.png" : image}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        </div>
    </div>
}
