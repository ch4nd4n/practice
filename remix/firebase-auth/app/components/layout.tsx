import FirebaseLogin from "./firebase-login";
import { CgCoffee } from "@react-icons/all-files/cg/CgCoffee";
import { Link } from "remix";

export default function Layout(props: any) {
  return (
    <>
      <header className="bg-cyan-900 shadow-md text-cyan-100">
        <div className="flex justify-between container mx-auto p-1 items-center">
          <div className="flex items-center">
            <CgCoffee className="mr-2 text-2xl" />
            <Link to="/">
              <h1 className="text-lg">Fud-Mnu</h1>
            </Link>
          </div>
          <nav className="flex items-center">
            <Link to="/menus" className="pr-5">
              Menu
            </Link>
            <FirebaseLogin />
          </nav>
        </div>
      </header>
      <main className="container mx-auto md:pt-10 md:pb-10 p-1">
        {props.children}
      </main>
      <footer className="border-t  p-1">
        <div className="container mx-auto pt-5">I am just a footer</div>
      </footer>
    </>
  );
}
