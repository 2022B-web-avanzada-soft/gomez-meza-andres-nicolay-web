import React from 'react';
import './App.css';
import Layout from "./module/Layout";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import CompanyList from "./module/Company/CompanyList";
import CompanyForm from "./module/Company/CompanyForm";
import VideogameList from "./module/Videogame/VideogameList";
import VideogameForm from "./module/Videogame/VideogameForm";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/company" element={<CompanyList />}></Route>
                <Route path="/addCompany" element={<CompanyForm />}></Route>
                <Route
                    path="/editCompany/:id"
                    element={<CompanyForm isEditForm={true} />}
                ></Route>
                <Route path="/videogame" element={<VideogameList />}></Route>
                <Route path="/addVideogame" element={<VideogameForm />}></Route>
                <Route
                    path="/editVideogame/:id"
                    element={<VideogameForm isEditForm={true} />}
                ></Route>
            </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
