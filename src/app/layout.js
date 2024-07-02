import "./globals.css";

export const metadata = {
  title: "Map",
  description: "H5N1 Map",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
