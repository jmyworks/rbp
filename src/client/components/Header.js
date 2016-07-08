/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import Link from 'react-router/lib/Link.js';

var Header = React.createClass({
   render: function() {
       return (
           <div>
               <nav>
                   <Link to="/" className="nav home">Home</Link>
                   <Link to="/Document" className="nav document">Document</Link>
                   <Link to="/Download" className="nav download">Download</Link>
                   <Link to="/Discuss"className="nav discuss">Discuss</Link>
                   <Link to="/About" className="nav about">About</Link>
               </nav>
           </div>
       );
   }
});

export default Header;
