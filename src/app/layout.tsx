import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, useTheme } from "@/contextProviders/ThemeProvider"

export const metadata: Metadata = {
  title: "Meemi",
  description: "Meemi is a Web3-native, AI-powered micro-insurance platform that makes it simple for users to purchase short-term, on-demand insurance for everyday items and activities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

// // Sample Component (For Testing Theme Usage)
// const SampleComponent = () => {
//   const { colors, tailwindClasses, typography } = useTheme();

//   return (
//     <div className={`${tailwindClasses.backgroundLight} p-6`}>
//       <h1 className={`${typography.headings} ${tailwindClasses.primary}`}>
//         Welcome!
//       </h1>
//       <p className={`${typography.body} ${tailwindClasses.textMuted}`}>
//         This is a sample component using the theme.
//       </p>
//     </div>
//   );
// };
