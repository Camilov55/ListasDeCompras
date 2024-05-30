import { BrowserRouter, Routes, Route } from "react-router-dom" 
import ListBuy from "./pages/ListBuy"

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="" element={<ListBuy />}></Route>
            </Routes>
        </BrowserRouter>
    );
 };
 export default App;
