import FirebaseLogin from "~/components/firebase-login";

export default function Index() {
  return (
    <div>
      <header className="bg-cyan-900 shadow-md text-cyan-100">
        <div className="flex justify-between container mx-auto pt-2 pb-2">
          <h1 className="text-3xl">Firebase Authentication</h1>
          <nav>
            <FirebaseLogin />
          </nav>
        </div>
      </header>
      <main className="container mx-auto pt-10 pb-10">
        <div>
          <h2 className="text-3xl pt-5 pb-5">Hero Unit Title</h2>
          <h3 className="text-xl">Subtitle under it</h3>
        </div>
      </main>
      <footer className="border-t">
        <div className="container mx-auto pt-5">I am just a footer</div>
      </footer>
    </div>
  );
}
