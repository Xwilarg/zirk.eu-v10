import { type ReactElement, useEffect, useState } from "react";
import QuoteComponent from "../components/QuoteComponent";
import { Link, useSearchParams } from "react-router";
import { getNavigationNoHook, randInt } from "../utils";

const links = [
    "https://youtu.be/eC5j9NO3Lmc", // Minecraft Science
    "https://youtu.be/b2F-DItXtZs", // MongoDB
    "https://youtu.be/vc-kThNPVnc", // Trains
    "https://youtu.be/bsXcoDSFJQM", // Japan:tm:
    "https://youtu.be/xsw3ldAjHlQ", // Kiwi card
    "https://youtu.be/P9-SUS1j1vE", // Just wait a moment
    "https://youtu.be/o333VVbi-bs", // Don't fight the music
    "https://youtu.be/G2_GfuDIgYY", // Bag brother
    "https://youtu.be/nsPQvZm_rgM", // Google tulip
    "https://youtu.be/zYkLgxkXUB8", // Andenayon
    "https://youtu.be/jtMq-Vra7dY", // Tsurara
    "https://youtu.be/a-dQc134Z-Q", // Le mans
    "https://youtu.be/jcBqPla5Mfo", // Portal chamber too hard
    "https://youtu.be/jFCD9KB-COQ", // Souran bushi
    "https://youtu.be/4Ym-oPuVkj8", // Dutch commercial
    "https://youtu.be/hWTFG3J1CP8", // Tetris
    "https://youtu.be/oY2nVQNlUB8", // Scott Sterling
    "https://youtu.be/6Ajhzlq42f0", // Super spice bros 2
    "https://youtu.be/o0u4M6vppCI", // Shia LaBeouf
];

export default function MainForm() {
    const [searchParams] = useSearchParams();
    const [index, setIndex] = useState(randInt(links.length));

    return <div>
        <QuoteComponent />
        <h1>Ohno what happened to everything?</h1>
        <p>
            It's the time of the year where website need to be remade, it'll be back soon as I'm porting all modules
        </p>
        <h1>What can I see in the meantime?</h1>
        <p>
            Feel free to check the modules that are online:<br/>
            <Link to={getNavigationNoHook("/gamejam", searchParams)} rel="me" className="button">Gamejam</Link>
        </p>
        <h1>Anything else?</h1>
        <p>
            <Link onClick={_ => setIndex(randInt(links.length))} to={links[index]} rel="external" target="_blank">Not really</Link>
        </p>
    </div>
}