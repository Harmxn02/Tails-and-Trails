import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";

const displayFont = DM_Serif_Display({
	variable: "--font-display",
	subsets: ["latin"],
	weight: ["400"],
});

const bodyFont = Manrope({
	variable: "--font-body",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata = {
	title: "Tails and Trails",
	description: "Swipe through dogs and save your favorites.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>{children}</body>
		</html>
	);
}
