// File: src/components/ScrollToTop.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that forces the window to scroll to the top 
 * every time the route changes.
 */
function ScrollToTop() {
    // useLocation provides the current URL path
    const { pathname } = useLocation();

    useEffect(() => {
        // When 'pathname' (the URL) changes, scroll to the top
        window.scrollTo(0, 0);
    }, [pathname]); // Dependency array: runs only when the path changes

    // This component renders nothing; it only handles a side effect (scrolling)
    return null; 
}

export default ScrollToTop;