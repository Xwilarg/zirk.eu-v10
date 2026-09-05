import GenericBox from "../GenericBox";
import type { OCInfo } from "../../models/OC";
import { useState } from "react";
import type { Button } from "../../models/Button";

interface OCItemFormProps
{
    item: OCInfo
}

export default function OCBox({ item }: OCItemFormProps)
{
    const [showInfo, setShowInfo] = useState(false);

    const category = item.images.find(x => x.default);
    const image = category?.images.find(x => x.default)!;

    
    let buttons: Button[] = [
        {
            color: "Default",
            label: "info",
            labelType: "GoogleIcon",
            type: "Custom",
            action: () => { setShowInfo(x => !x) }
        }
    ];
    
        if (showInfo) {
            return <GenericBox key={item.name} name={item.name} nsfw={false}
                    icons={[{
                        icon: "globe",
                        label: item.metadata.location
                    }, {
                        icon: "transgender",
                        label: item.metadata.gender
                    }, {
                        icon: "height",
                        label: (item.metadata.height / 100).toFixed(2) + "m"
                    }, {
                        icon: "explicit",
                        label: item.metadata.orientation
                    }, {
                        icon: "person",
                        label: item.metadata.species
                    }, {
                        icon: "visibility",
                        label: item.metadata.power ?? ""
                    }]}
                    buttons={buttons}
                ></GenericBox>
        }

    return <GenericBox key={item.name} name={item.name} image={`/data/previews/ocs/${item.metadata.folder}/${image.link}`} nsfw={image.nsfw}
            imageCssModifiers={`top ${category?.type === "pixel" ? "pixel" : ""}`} buttons={buttons}
        ></GenericBox>
};