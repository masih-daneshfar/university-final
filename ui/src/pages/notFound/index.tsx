import CenterLayout from "@layouts/center";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as any;
    console.error(error);

    return (
        <CenterLayout>
            <div className="center">
                <h1>اوپس!</h1>
                <p>
                    <kbd>{error.statusText || error.message}</kbd>
                </p>
            </div>
        </CenterLayout>
    );
}