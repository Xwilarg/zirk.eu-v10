import { useEffect, useState } from "react";
import gamejamData from "../../data/json/gamejam.json"
import { useSearchParams } from "react-router";
import GameJamBox from "../boxes/GamejamBox";
import type { GameJamItem } from "../models/Gamejam";

export default function GameJamForm() {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <h3 className="text-center">{gamejamData.jams.length} entr{gamejamData.jams.length > 1 ? "ies" : "y"}</h3>
            <div className="is-flex flex-center-hor">
                {
                    gamejamData.jams
                        .map((x: GameJamItem) => <GameJamBox key={x.fullName} item={x} showComputer={() => {
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