import { type ReactElement, useEffect, useState } from "react";
import { Icon } from "../component/Icon";

export default function MainForm() {
    return <div className="icon-list is-flex">
        <Icon icon="joystick" label="Gamejam" link="gamejam" />
        <Icon icon="deployed_code" label="Projects" link="project" />
        <Icon icon="circle_circle" label="Katsis" link="katsis" />
        <Icon icon="person" label="OC" link="oc" />
        <Icon icon="box" label="Boxes" link="box" />
        <Icon icon="help" label="Info" link="info" />
    </div>
}