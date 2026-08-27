import { useEffect, useState } from "react";
import gamejamData from "../../data/json/gamejam.json"
import { useSearchParams } from "react-router";
import type { GameJamItem } from "../models/Gamejam";
import type { SketchFormProps } from "../computer/SketchForm";
import GameJamBox from "../boxes/impl/GameJamBox";
import QuoteComponent from "../components/QuoteComponent";
import SketchForm from "../computer/SketchForm";
import { isNsfw } from "../utils";
import GenericBox from "../boxes/GenericBox";
import NavbarComponent from "../components/NavbarComponent";
import GameJamFiltersComponent from "../components/GameJamFiltersComponent";

export default function GameJamForm() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [shownSketch, setShownSketch] = useState<GameJamItem | null>(null);
    const [computerProps, setComputerProps] = useState<SketchFormProps | null>(null);
    
    const [embedGotUserClick, setEmbedGotUserClick] = useState(false);

    const nsfw = isNsfw();

    // Filters
    const [showFilters, setShowFilters] = useState<boolean>(false);

    useEffect(() => {
        const game = searchParams.get("share")?.toUpperCase();

        if (game) {
            let target = gamejamData.jams.find(x => x.name?.toUpperCase() === game);
            if (target && target.sketch) {
                setShownSketch(target);
            } else {
                setShownSketch(null);
            }
        } else {
            setShownSketch(null);
        }
    }, [searchParams]);
    
    useEffect(() => {
        if (shownSketch) {
            setComputerProps({
                isOn: true,
                loadedGame: {
                    defaultResFolder: shownSketch.sketch!.folder,
                    defaultFilename: shownSketch.sketch!.filename!,
                    defaultEngine: shownSketch.engine,
                    defaultUnityVersion: shownSketch.version
                },
                buttons: [],
                isFullscreen: false,
                onLoad: null
            });
        } else {
            setComputerProps(null);
        }
    }, [ shownSketch ]);

    if (computerProps !== null && shownSketch !== null)
    {
        return <>
            <div className="is-flex flex-center-hor">
            {
                embedGotUserClick ?
                    <SketchForm
                        isOn={computerProps.isOn}
                        loadedGame={computerProps.loadedGame}
                        buttons={[]}
                        isFullscreen={false}
                        onLoad={null}
                    />
                    : <div id="screen-container" className="is-flex flex-center-hor flex-center-ver">
                        <button className="big" onClick={() => setEmbedGotUserClick(true)}>Play</button>
                    </div>
            }
            </div>
            <div className="is-flex flex-center-hor">
                <GenericBox name="Controls" text={shownSketch!.controls.join("<br/>")} nsfw={false} />
                <GenericBox name="Help" text={shownSketch!.help.join("<br/>")} nsfw={false} />
            </div>
        </>
    }

    return (
        <>
            <QuoteComponent />
            <NavbarComponent />
            <div className="is-flex flex-center-hor">
            {
                showFilters
                ? <GameJamFiltersComponent />
                : <button onClick={() => setShowFilters((x: boolean) => !x)}>Show filters</button>
            }
            </div>
            <h3 className="text-center">{gamejamData.jams.length} entr{gamejamData.jams.length > 1 ? "ies" : "y"}</h3>
            <div className="is-flex flex-center-hor">
                {
                    gamejamData.jams
                        .filter(x => !x.nsfw || nsfw !== "FullSFW")
                        .map((x: GameJamItem) => <GameJamBox key={x.fullName} item={x} loadGame={() => {
                            setSearchParams(sp => {
                                sp.set("share", x.name);
                                return sp;
                            });
                        }} />)
                }
            </div>
        </>
    )
}