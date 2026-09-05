import { type ReactElement, useEffect, useState } from "react";
import QuoteComponent from "../components/QuoteComponent";
import { Link, useSearchParams } from "react-router";
import { getNavigationNoHook, isNsfw, randArrayElement, randInt } from "../utils";
import GenericBox from "../boxes/GenericBox";
import sheepData from "../../data/json/sheep.json"
import ImageModalForm from "../components/modal/ImageModalForm";
import SketchForm from "../computer/SketchForm";

export default function MainForm() {
    const [searchParams] = useSearchParams();
    const [showMore, setShowMore] = useState(false);
    const [showSheep, setShowSheep] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const nsfw = isNsfw();

    return <div>
        <QuoteComponent />
        <div className="is-flex flex-center-hor">
            <GenericBox name="Sketch" nsfw={false} custom={ <SketchForm isOn={false} loadedGame={null} buttons={[]} isFullscreen={false} onLoad={null} /> } />
            <GenericBox name="Intro" nsfw={false} custom={<div>
                <h3>Welcome on <span className="gradient-highlight">my amazing website</span>, I am Zirk, a game and software developer</h3>
                <br/>
                I am probably mostly known for <span className="katsis-highlight">Katsis</span> (which I co-created with Fractal) and <Link to={getNavigationNoHook("/gamejam", searchParams)}>participating at gamejams</Link><br/>
                <br/>
                I overall like to work on lot of different projects, this website being on of them!<br/>
                It's still slowly being remade from the previous iteration but feel free to explore around!<br/>
                <br/>
                And if you have any question or so, feel free to contact me on <a href="mailto:xwilarg@protonmail.com">xwilarg@protonmail.com</a> or on Discord (zirk)<br/>
                <br/>
                <br/>
                <br/>
                If you scrolled down there, why not contributing to my <a onClick={_ => setShowSheep(x => !x)}>sheep collection</a>?
            </div>} />
            {
                showSheep ?
                <GenericBox name="Sheep" nsfw={false} custom={<div className="is-flex">
                    {
                        sheepData.map(x =>
                            <div className="sheep-img" key={x.name}>
                                {
                                    x.link.value.startsWith("https://")
                                    ? <a className="ignore" target="_blank" href={x.link.value}><p>{x.name}</p></a>
                                    : <p onClick={() => { alert(`${x.link.name}: ${x.link.value}`); }}>{x.name}</p>
                                }
                                <img className="clickable" src={`/data/img/sheep/${x.image}`} onClick={() => setPreview(`/data/img/sheep/${x.image}`)} />
                            </div>
                        )
                    }
                </div>} />
                : <></>
            }
            <GenericBox name="Navigation" nsfw={false} custom={<>    
                <Link to={getNavigationNoHook("/gamejam", searchParams)} rel="me" className="button">Gamejam</Link>
                <Link to={getNavigationNoHook("/project", searchParams)} rel="me" className="button">Projects</Link>
                {
                    showMore
                    ? <>
                        <Link to={getNavigationNoHook("/game", searchParams)} rel="me" className="button">Games</Link>
                        <Link to={getNavigationNoHook("/oc", searchParams)} rel="me" className="button">OCs</Link>
                    </>
                    : <button onClick={() => setShowMore(true)}>More</button>
                }
            </>} />
            <GenericBox name="Gamejam" nsfw={false}
                image={`/data/img/recap/${randArrayElement(nsfw === "SFW" ? [ "Gamejam-01.png", "Gamejam-02.png", "Gamejam-03.png" ] : [ "Gamejam-01.png", "Gamejam-02.png", "Gamejam-03-NSFW.png" ])}`}
                buttons={[{label: "See more", type: "Link", labelType: "Text", color: "Primary", link: "/gamejam" }]}
            />
            <GenericBox name="Projects" nsfw={false}
                image={`/data/img/projects/${randArrayElement([ "Intranet-01.png", "GameGuesser-01.png", "Shika-01.png" ])}`}
                buttons={[{label: "See more", type: "Link", labelType: "Text", color: "Primary", link: "/project" }]}
            />
            <GenericBox name="Katsis" nsfw={false}
                image={`/data/img/recap/${randArrayElement(nsfw === "SFW" ? [ "Katsis-01.png", "Katsis-02.png", "Katsis-03.png" ] : [ "Katsis-01-NSFW.png", "Katsis-02.png", "Katsis-03-NSFW.png" ])}`}
            />
        </div>
        {
            preview !== null ?
            <ImageModalForm image={preview} nsfw={true} unsetImage={setPreview} />
            : <></>
        }
    </div>
}