import React from 'react';
import styled, { css } from 'styled-components';

import { Block, Heading, Text } from './lib/index';
import ComponentDemo from './ComponentDemo';
import DEMO from './demoData';

const Logo = styled.div`
  background: linear-gradient(to right, firebrick, gold);
  color: #fff;
  font-family: 'Racing Sans One', cursive;
  font-size: 48px;
  text-align: center;
`;

const styles = {
  container: css`
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  `
};

function App() {
  return (
    <Block padding="0 2" styles={styles.container}>
      <Logo>&lt; React Super Styled &gt;</Logo>
      <Text center color="#D4752C" bold medium italic margin="1 - 2">
        Responsive JSX layouts with Styled Components
      </Text>

      <Heading h3 color="#999" large>
        Wrappers &raquo;
      </Heading>
      {DEMO.WRAPPERS.map((demoProps, index) => (
        <ComponentDemo key={'wrappers-' + index} {...demoProps} />
      ))}

      <Heading h3 color="#999" large>
        Grid &raquo;
      </Heading>
      {DEMO.GRID.map((demoProps, index) => <ComponentDemo key={'grid-' + index} {...demoProps} />)}

      <Heading h3 color="#999" large>
        Typography &raquo;
      </Heading>
      {DEMO.TYPOGRAPHY.map((demoProps, index) => (
        <ComponentDemo key={'type-' + index} {...demoProps} />
      ))}

      <Heading h3 color="#999" large>
        Misc &raquo;
      </Heading>
      {DEMO.MISC.map((demoProps, index) => <ComponentDemo key={'misc-' + index} {...demoProps} />)}
    </Block>
  );
}

export default App;
