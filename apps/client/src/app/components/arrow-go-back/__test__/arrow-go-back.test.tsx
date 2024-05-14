import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { ArrowGoBack } from '../arrow-go-back';

describe('ArrowGoBack testing', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <ArrowGoBack />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
