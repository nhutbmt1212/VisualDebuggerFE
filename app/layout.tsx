import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "VisualDebugger - Debug Flow Visualization",
    description: "Visualize and debug your application's execution flow in real-time",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
