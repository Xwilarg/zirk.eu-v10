import gamejamData from "../../data/json/projects.json"
import { useSearchParams } from "react-router";
import type { GameJamItem } from "../models/Gamejam";
import GameJamBox from "../boxes/impl/GameJamBox";
import QuoteComponent from "../components/QuoteComponent";
import NavbarComponent from "../components/NavbarComponent";
import type { ProjectItem } from "../models/Project";
import ProjectBox from "../boxes/impl/ProjectBox";

export default function ProjectForm() {
    return (
        <>
            <QuoteComponent />
            <NavbarComponent />
            <h3 className="text-center">Projects</h3>
            <div className="is-flex flex-center-hor">
                {
                    gamejamData
                        .map((x: ProjectItem) => <ProjectBox key={x.name} item={x} />)
                }
            </div>
        </>
    )
}