import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { About } from './About';

describe('About', () => {
  describe('Layout', () => { 
    it('has header of about info', () => {
      const { container } = render(<About/>);
      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('THIS IS AN ABOUT PAGE')
    });
   })
});