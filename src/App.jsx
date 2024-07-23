import React, { useEffect } from 'react'

import { Route, Routes } from 'react-router-dom';
import { RenderSite, RenderSiteClientSide, LinkBasedSiteBuilderPage } from './pages';
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
        <Route path="/" element={<LinkBasedSiteBuilderPage />} />
        <Route path="/sites/render" element={<RenderSiteClientSide />} />
        <Route path="*" element={'404 Not Found'} />
      </Routes>
    </>
  )
}

export default App
