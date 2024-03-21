import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import SubmitForm from "./pages/SubmitForm";
import ViewSubmissions from "./pages/ViewSubmissions";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Layout />}
                >
                    <Route
                        path=""
                        element={<SubmitForm />}
                    />
                    <Route
                        path="getSubmissions"
                        element={<ViewSubmissions />}
                    />
                </Route>
            </Routes>
            <Toaster />
        </>
    );
}

export default App;
