import type { ReactElement } from "react";
import type { Button } from "../models/Button";
import { isNsfw } from "../utils";
import { Link } from "react-router";

interface GenericBoxProps
{
    name: string

    text?: string
    image?: string | null

    nsfw: boolean

    imageCssModifiers?: string

    buttons?: Button[]

    onClick?: React.MouseEventHandler<HTMLImageElement> | undefined
    onMouseEnter?: React.MouseEventHandler<HTMLImageElement> | undefined
    onMouseLeave?: React.MouseEventHandler<HTMLImageElement> | undefined
}

export default function GenericBox({ name, text, image, nsfw, buttons, imageCssModifiers, onClick, onMouseEnter, onMouseLeave } : GenericBoxProps) {
    let nsfwStatus = isNsfw();
    let hideNsfw = nsfw && nsfwStatus !== "NSFW";

    let btnHtml: ReactElement[] = [];
    if (buttons)
    {
        for (const b of buttons)
        {
            if (b.type === "Link")
            {
                btnHtml.push(<Link key={`btn-${b.label}`} to={b.link!} target="_blank" className="button">{b.label}</Link>)
            }
            else if (b.type === "Custom")
            {
                btnHtml.push(<button key={`btn-${b.label}`} onClick={b.action}>{b.label}</button>)
            }
        }
    }

    return <div className="card">
        <p className={"text-center card-name"}>{hideNsfw ? "" : name}</p>
        {
            image ?
            <div className={"card-img is-flex flex-center-hor " + imageCssModifiers}>
                <img className={(hideNsfw && image !== null ? "blur" : (onClick ? "clickable" : ""))} src={image === null ? "/img/ComingSoon.png" : image}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onClick={onClick}
                />
            </div>
            : <p className="card-text" dangerouslySetInnerHTML={{ __html: text! }}></p>
        }
        <div className="card-buttons is-flex">{ btnHtml }</div>
    </div>
}
