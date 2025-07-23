import { Header } from "./Header";
import "./page.css";
import "./client";
import { DelayConfigurator } from "./DelayConfigurator";

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
    <html
      lang="en"
      className="min-h-screen flex flex-col scrollbar-stable scrollbar-both-edges"
    >
      <head>
        <title>Parcel React Server App</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="TODO List with React Server Components and Parcel" />
      </head>
      <body className="min-h-screen flex flex-col scrollbar-stable scrollbar-both-edges">
        <div className="container mx-auto w-full max-w-3xl flex flex-col">
          <Header />
          <main className="p-3 flex flex-col gap-6">{children}</main>
        </div>
        <DelayConfigurator />
      </body>
    </html>
  );
};
