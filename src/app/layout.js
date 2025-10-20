import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';


export const metadata = {
  title: "AI Calendar",
  description: "A demonstration of a calendar that uses natural language to schedule events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
