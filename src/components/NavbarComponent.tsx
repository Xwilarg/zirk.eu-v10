import { Link, useSearchParams } from "react-router";
import { getNavigationNoHook } from "../utils";
export default function NavbarComponent() {
    const [searchParams] = useSearchParams();
    return <div>
        <Link to={getNavigationNoHook("/", searchParams)} rel="me">Back</Link>
    </div>
}
