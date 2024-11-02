import React from 'react';
import Search from '../ui/search/Search';

import Aside from '../ui/aside/Aside';
import RelatedSkills from '../sections/RelatedSkills';

function Page2() {
  return (
    <>
      <Search />
      <div className="mainWrapper">
        <h1 className="mainTitle">4th Grade Math Teacher</h1>
        <div className="common_grid">
          <RelatedSkills />

          <Aside />
        </div>
      </div>
    </>
  );
}

export default Page2;
