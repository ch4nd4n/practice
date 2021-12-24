import FirebaseLogin from "./firebase-login";
import { FaHamburger } from "@react-icons/all-files/fa/FaHamburger";
import { Link } from "remix";

export default function Layout(props: any) {
  return (
    <>
      <header className="bg-cyan-900 shadow-md text-cyan-100">
        <div className="flex justify-between container mx-auto pt-2 pb-2">
          <div className="flex">
            <FaHamburger />
            <Link to="/">
              <h1 className="text-sm">App</h1>
            </Link>
          </div>
          <nav>
            <Link to="/menus" className="pr-5">
              Menu
            </Link>
            <FirebaseLogin />
          </nav>
        </div>
      </header>
      <main className="container mx-auto pt-10 pb-10">{props.children}</main>
      <footer className="border-t">
        <div className="container mx-auto pt-5">I am just a footer</div>
      </footer>
    </>
  );
}
