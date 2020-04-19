
import React from 'react';
import logo from './logo.svg';

import JupViewer from './JupViewer'

const ipynb = require('./HeatMap.ipynb')

class notebook extends React.Component {
  render() {
    return (
      <div className="notebooks">
        <JupViewer
          title="Jupyter as a Blog!"
          subtitle="I've always wanted to publish my jupyter notebooks as blogs. Finally I can."
          // coverImg="https://notionpress.com/blog/wp-content/uploads/2018/06/Cover-design.png"
          // file={ipynb}
          file="https://raw.githubusercontent.com/jakevdp/PythonDataScienceHandbook/master/notebooks/00.00-Preface.ipynb"
          // file="https://raw.githubusercontent.com/fastai/course-v3/master/nbs/dl1/00_notebook_tutorial.ipynb"
        />
      </div>
    )
  }
}


export default App;