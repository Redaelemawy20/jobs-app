import React from 'react';
import Search from '../ui/search/Search';

import AllJobs from '../sections/AllJobs';
import Aside from '../ui/aside/Aside';

function Page1() {
  return (
    <>
      <Search />
      <div className="mainWrapper">
        <h1 className="mainTitle">Front-End jobs (18)</h1>
        <div className="common_grid">
          <AllJobs />
          <Aside />
        </div>
      </div>
    </>
  );
}

export default Page1;
