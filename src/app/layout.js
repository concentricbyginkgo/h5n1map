import "./globals.css";

export const metadata = {
  title: "H5N1 Map",
  description: "H5N1 Map",
  name: "H5N1 Map",
  content: "width=device-width, initial-scale=1.0"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <body>{children}</body>
    </html>
  );
}
