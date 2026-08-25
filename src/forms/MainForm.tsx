import { type ReactElement, useEffect, useState } from "react";
import QuoteComponent from "../components/QuoteComponent";

export default function MainForm() {
    return <div className="container">
        <QuoteComponent />
        <h1>Ohno what happened to everything?</h1>
        <p>
            Don't worry Indra, I'm remaking my website, it'll be back soon
        </p>
    </div>
}