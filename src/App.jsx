import React, { useEffect } from 'react'

import { Route, Routes } from 'react-router-dom';
import { RenderSite, RenderSiteClientSide, AllSites } from './pages';
import { useAppContext } from './context/appContext';
import { returnAllComponentNames } from './utils';

function App() {
  const { updateComponentIndex } = useAppContext()

  useEffect(() => {
    const components = returnAllComponentNames();
    updateComponentIndex(components)
  }, [])


  return (
    <>
      <Routes>
        <Route path="/" index element={'Dynamic Component Client'} />
        <Route path="/sites/server/:id" element={<RenderSite />} />

        <Route path="/sites" element={<AllSites />} />
        <Route path="/sites/render" element={<RenderSiteClientSide />} />

        <Route path="*" element={'404 Not Found'} />
      </Routes>
    </>
  )
}

export default App
