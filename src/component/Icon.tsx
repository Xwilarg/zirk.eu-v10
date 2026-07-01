import { forwardRef } from "react";
import { Link } from "react-router";

interface IconProps
{
    icon: string
    label: string
    link: string
}
export const Icon = forwardRef((
    { icon, label, link }: IconProps,
    _
) => {
    return <Link to={link} className="computer-icon is-flex">
        <span className="material-symbols-outlined">{ icon }</span>
        <label>{ label }</label>
    </Link>
});