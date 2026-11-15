import "./globals.css";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090B0A" },
    { media: "(prefers-color-scheme: light)", color: "#F5F7F5" },
  ],
};

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://aayushbuilds.vercel.app"
  ),
  title: "Aayush Singh | AayushBuilds — Developer & Builder",
  description:
    "Aayush Singh's personal portfolio — exploring full-stack development, AI-powered applications, and software engineering.",
  keywords: [
    "Aayush Singh",
    "AayushBuilds",
    "developer portfolio",
    "full-stack developer",
    "AI systems",
    "Next.js",
    "Flask",
    "Python",
  ],
  authors: [{ name: "Aayush Singh" }],
  creator: "Aayush Singh",
  openGraph: {
    title: "Aayush Singh | AayushBuilds — Developer & Builder",
    description:
      "Building software that solves problems, not just demos. Full-stack development, AI-powered systems and developer-focused products.",
    url: "/",
    siteName: "AayushBuilds",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayush Singh | AayushBuilds — Developer & Builder",
    description:
      "Building software that solves problems, not just demos. Full-stack development, AI-powered systems and developer-focused products.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Runs before first paint: restores the saved theme and, when the boot
// intro was already seen this session or the user prefers reduced motion,
// marks the document so the Matrix overlay is skipped instantly.
const themeInitScript = `(function(){try{var t=localStorage.getItem('ab:theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}var b=null;try{b=sessionStorage.getItem('ab:booted');}catch(e){}if(b||window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('boot-skip');}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
