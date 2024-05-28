import { render } from '@testing-library/react';

import { Header } from '../header';
import { App } from '../../../app';

describe('Header testing', () => {
  it('should contain correct heading', () => {
    const { getByText } = render(
      <App>
        <Header />
      </App>
    );

    expect(getByText(/EXPENSES/i)).toBeTruthy();
  });
});
