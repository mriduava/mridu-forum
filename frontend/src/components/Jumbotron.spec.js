import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Jumbotron } from './Jumbotron';

describe('Jumbotron', () => {
  describe('Layout', () => { 
    it('has header for jumbotron', () => {
      const { container } = render(<Jumbotron/>);
      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('MRIDU FORUM');
    });
    it('has text after header in jumbotron', () => {
      const { container } = render(<Jumbotron/>);
      const text = container.querySelector('p');
      expect(text).toHaveTextContent('An online discussion site');
    });
   })
});