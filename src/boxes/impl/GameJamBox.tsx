import { useState } from "react";
import { isNsfw } from "../../utils";
import type { GameJamItem } from "../../models/Gamejam";
import type { Button } from "../../models/Button";
import GenericBox from "../GenericBox";

interface GameJamItemFormProps
{
    item: GameJamItem,
    loadGame: () => void
}

function prettifyDuration(h: number): string {
    h = Math.floor(h);
    const d = Math.floor(h / 24);

    if (h === 1) return "1 hour";
    if (d < 7) return `${h} hours`;
    return `${d} days`;
}

function getOverallScore(item: GameJamItem): number | null {
    if (!item.rating || !item.rating.scores) return null;

    const entries = item.rating.entriesRated ?? item.rating.entries;
    if (!entries) return null;
    if ("Overall" in item.rating.scores)
    {
        const o = item.rating.scores["Overall"];
        if (!o || !o.rank) return null;
        return item.rating.scores["Overall"]!.rank! / entries;
    }
    return null;
}

export default function GameJamBox({ item, loadGame }: GameJamItemFormProps)
{
    let [previewGif, setPreviewGif] = useState<boolean>(false);

    let format = previewGif ? "webp" : (item.format ?? "jpg");
    let nsfwStatus = isNsfw();
    let hideNsfw = item.nsfw && nsfwStatus !== "NSFW";

    let pos = "";
    let comp = previewGif ? item.gifPosOverrides : item.imagePosOverrides;
    if (comp === "up") pos = "top";
    else if (comp === "down") pos = "bottom";
    else if (comp === "left") pos = "left";
    else if (comp === "right") pos = "right";

    let score = getOverallScore(item);

    let buttons: Button[] = [];
    if (!hideNsfw)
    {
        if (item.sketch)
        {
            buttons.push({
                color: "Primary",
                label: "play_arrow",
                labelType: "GoogleIcon",
                type: "Custom",
                action: loadGame
            })
        }
        if (item.website)
        {
            buttons.push({
                color: "Default",
                label: "language",
                labelType: "GoogleIcon",
                type: "Link",
                link: item.website
            })
        }
        if (item.github)
        {
            buttons.push({
                color: "Default",
                label: "github.svg",
                labelType: "LocalIcon",
                type: "Link",
                link: item.github
            })
        }
    }

    return <GenericBox name={item.fullName} image={item.name === null ? null : `/data/img/gamejam/${item.name}.${format}`} nsfw={item.nsfw} imageCssModifiers={pos}
            onMouseEnter={_ => { if (!hideNsfw) setPreviewGif(true); }}
            onMouseLeave={_ => { setPreviewGif(false) } }
            buttons={buttons}
        ></GenericBox>
};