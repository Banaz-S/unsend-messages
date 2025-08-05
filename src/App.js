import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Loader from "./components/Loader";

// Code-split pages
const HomePage = lazy(() => import("./pages/HomePage"));
const CreateLetterPage = lazy(() => import("./pages/CreateLetterPage"));

function RouteChangeSpinner({ children }) {
  const location = useLocation();
  const [navLoading, setNavLoading] = useState(false);

  useEffect(() => {
    // show spinner on every route change
    setNavLoading(true);
    // let the new route render; hide shortly after (tweak as needed)
    const id = setTimeout(() => setNavLoading(false), 350);
    return () => clearTimeout(id);
  }, [location]);

  return (
    <>
      {navLoading && <Loader />}
      {children}
    </>
  );
}

function InitialLoadGate({ children }) {
  const [ready, setReady] = useState(document.readyState === "complete");

  useEffect(() => {
    if (ready) return;
    const onLoad = () => setReady(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [ready]);

  return ready ? children : <Loader />;
}

export default function App() {
  return (
    <Router>
      <InitialLoadGate>
        <RouteChangeSpinner>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreateLetterPage />} />
            </Routes>
          </Suspense>
        </RouteChangeSpinner>
      </InitialLoadGate>
    </Router>
  );
}
