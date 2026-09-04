import GenericBox from "../GenericBox";
import type { OCInfo } from "../../models/OC";
import { useState } from "react";

interface OCItemFormProps
{
    item: OCInfo
}

export default function OCBox({ item }: OCItemFormProps)
{
    const [index, setIndex] = useState(item.images.indexOf(item.images.filter(x => x.default)[0]));

    const category = item.images.find(x => x.default);
    const image = category?.images.find(x => x.default)!;

    return <GenericBox key={item.name} name={item.name} image={`/data/previews/ocs/${item.metadata.folder}/${image.link}`} nsfw={image.nsfw}
            imageCssModifiers={`top ${category?.type === "pixel" ? "pixel" : ""}`} buttons={[]}
        ></GenericBox>
};