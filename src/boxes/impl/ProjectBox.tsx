import GenericBox from "../GenericBox";
import type { ProjectItem } from "../../models/Project";

interface ProjectItemFormProps
{
    item: ProjectItem,
}

export default function ProjectBox({ item }: ProjectItemFormProps)
{
    return <GenericBox name={item.name} image={`/data/img/projects/${item.images[0].name}`} nsfw={item.nsfw}
            buttons={item.links.slice(0, 2).map(x => ({ type: "Link", label: x.name, link: x.content }))}
        ></GenericBox>
};