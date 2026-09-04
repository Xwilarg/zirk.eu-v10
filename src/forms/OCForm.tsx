import { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import QuoteComponent from "../components/QuoteComponent";
import ImageModalForm from "../components/modal/ImageModalForm";

import jsonSanara from "../../data/json/ocs/sanara.json"
import jsonZirk from "../../data/json/ocs/zirk.json"
import jsonYuzu from "../../data/json/ocs/yuzu.json"
import jsonFish from "../../data/json/ocs/fish.json"
import OCBox from "../boxes/impl/OCBox";

export default function OCform() {
    const [preview, setPreview] = useState<string | null>(null);
    const characters = [
        jsonSanara, jsonZirk, jsonYuzu, jsonFish
    ]

    return <>
        <QuoteComponent />
        <NavbarComponent />
        <div className="is-flex flex-center-hor">
            <h2>OCs</h2>
        </div>
        <div className="is-flex flex-center-hor">
            {
                characters.sort(x => x.images.length).map(x => <OCBox item={x} />)
            }
        </div>
        {
            preview !== null ?
            <ImageModalForm image={preview} unsetImage={setPreview} />
            : <></>
        }
    </>
}