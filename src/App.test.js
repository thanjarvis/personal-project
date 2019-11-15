import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const {sum, logout} = require('../server/controllers/ctrlUser')

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// describe('testing ctrlUser on the server side', () => {
//   test('testing logout response', () => {
//     expect(logout()).toBe({})
//   })
// })

describe ('testing tests', () => {
  test('addition', () => {
    expect(sum(1,2)).toBe(3)
  })
})