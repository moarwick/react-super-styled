import React from 'react';
import styled, { css } from 'styled-components';

import { Block, Display, Heading, Rule, Text } from './lib/index';
import ComponentDemo from './ComponentDemo';
import DEMO from './demoData';

const CONTAINER_WIDTH = 1280;

const GitHubLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54" width={40} height={40}>
    <path
      fill="white"
      d="M26.9,1.9c-13.8,0-25,11.5-25,25.6c0,11.3,7.2,20.9,17.1,24.3
      c1.3,0.2,1.7-0.6,1.7-1.2c0-0.6,0-2.2,0-4.4c-7,1.5-8.4-3.4-8.4-3.4c-1.1-3-2.8-3.7-2.8-3.7c-2.3-1.6,0.2-1.6,0.2-1.6
      c2.5,0.2,3.8,2.6,3.8,2.6c2.2,3.9,5.9,2.8,7.3,2.1c0.2-1.7,0.9-2.8,1.6-3.4C16.8,38.2,11,36,11,26.2c0-2.8,1-5.1,2.6-6.9
      c-0.3-0.6-1.1-3.3,0.2-6.8c0,0,2.1-0.7,6.9,2.6c2-0.6,4.1-0.9,6.3-0.9c2.1,0,4.3,0.3,6.3,0.9c4.8-3.3,6.9-2.6,6.9-2.6
      c1.4,3.5,0.5,6.1,0.2,6.8c1.6,1.8,2.6,4.1,2.6,6.9c0,9.8-5.8,12-11.4,12.6c0.9,0.8,1.7,2.4,1.7,4.7c0,3.4,0,6.2,0,7
      c0,0.7,0.5,1.5,1.7,1.2c9.9-3.4,17.1-13,17.1-24.3C51.9,13.3,40.8,1.9,26.9,1.9z"
    />
  </svg>
);

const LogoWrapper = styled.span`
  position: absolute;
  right: 20px;
  top: 12px;
`;

const Header = styled.a`
  color: #676;
  display: block;
  text-align: center;
  text-decoration: none;
`;

const styles = {
  title: css`
    font-family: 'Racing Sans One', cursive;
    font-size: 32px;
    margin: 0;
  `,
  titleMd: css`
    font-size: 48px;
  `,
};

function App() {
  return (
    <div>
      <Block container={CONTAINER_WIDTH} styles="position: relative">
        <Header href="https://github.com/moarwick/react-super-styled">
          <Heading normal styles={styles.title} mdStyles={styles.titleMd}>
            &lt; ReactSuperStyled /&gt;
          </Heading>
          <LogoWrapper>
            <Display smShow>
              <GitHubLogo />
            </Display>
          </LogoWrapper>
          <Text center bold medium italic margin="0 * 1">
            Responsive JSX layouts with Styled Components
          </Text>
        </Header>
      </Block>

      <Rule borderStyle="dotted" color="#676" />

      <Block container={CONTAINER_WIDTH}>
        <Heading h3 color="#676" large normal>
          Wrappers &raquo;
        </Heading>
        {DEMO.WRAPPERS.map((demoProps, index) => (
          <ComponentDemo key={'wrappers-' + index} {...demoProps} />
        ))}

        <Heading h3 color="#676" large normal>
          Grid &raquo;
        </Heading>
        {DEMO.GRID.map((demoProps, index) => (
          <ComponentDemo key={'grid-' + index} {...demoProps} />
        ))}

        <Heading h3 color="#676" large normal>
          Typography &raquo;
        </Heading>
        {DEMO.TYPOGRAPHY.map((demoProps, index) => (
          <ComponentDemo key={'type-' + index} {...demoProps} />
        ))}

        <Heading h3 color="#676" large normal>
          Misc &raquo;
        </Heading>
        {DEMO.MISC.map((demoProps, index) => (
          <ComponentDemo key={'misc-' + index} {...demoProps} />
        ))}
      </Block>
    </div>
  );
}

export default App;
