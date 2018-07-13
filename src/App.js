import React from 'react';
import styled, { css } from 'styled-components';

import { Block, Display, Flex, Heading, Rule, Section, Span, Text, withMedia } from './lib/index';
import ComponentDemo from './ComponentDemo';
import DEMO from './demoData';
import { version } from '../package.json';

const CONTAINER_WIDTH = 1280;

const RssLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={40} height={40}>
    <g>
      <path fill="#676" d="M634.5 481.5L319 633 4.5 481.5v-327L319 6l315.5 146.5z" />
      <path
        fill="#ccb"
        d="M33.5 439.5l43-236h101c29 0 48.1 17.2 53 33 5 16 3 52-9 68-9 12-23 22-33 26 12 33 36 109 36 109h-72l-28-103-19 103h-72zm109-131c6 0 14-5 18-13 5.4-10.8 9-30 9-40s-1-23-12-23h-14l-15 76h14z"
      />
      <path
        fill="#ccb"
        d="M240.5 367.5h58v26c0 9 6 19 16 19 7 0 16-3 22-17 5.5-12.8 4-33-11-38-11.1-3.7-37-12-48-21s-25-23-25-53 18-57 41-69 49-16 68-15 44 6 59 19c-4 24-7 39-10 55h-54c0-11 2-27-1-34-2.1-4.9-11-9-20-7s-14 8-16 16-3 19.7 4 29c6 8 22 12 40 17s33.1 15.4 40 30c9 19 10 53-2 74-10 17.6-26 32-53 41-21 7-59 5-71 2-24-6-37-12-47-21 5-25 10-53 10-53zM424.5 367.5h58v26c0 9 6 19 16 19 7 0 16-3 22-17 5.5-12.8 4-33-11-38-11.1-3.7-37-12-48-21s-25-23-25-53 18-57 41-69 49-16 68-15 44 6 59 19c-4 24-7 39-10 55h-54c0-11 2-27-1-34-2.1-4.9-11-9-20-7s-14 8-16 16-3 19.7 4 29c6 8 22 12 40 17s33.1 15.4 40 30c9 19 10 53-2 74-10 17.6-26 32-53 41-21 7-59 5-71 2-24-6-37-12-47-21 5-25 10-53 10-53z"
      />
    </g>
  </svg>
);

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

const RssLogoWrapper = styled.span`
  position: absolute;
  left: 0;
  top: 12px;
`;

const GitHubLogoWrapper = styled.span`
  position: absolute;
  right: 0;
  top: 12px;
`;

const Header = styled.a`
  color: #676;
  display: block;
  text-align: center;
  text-decoration: none;
`;

const styles = {
  section: css`
    background-color: #fff;
    box-shadow: 1px 1px 10px 0 rgba(0, 100, 0, 0.2);
    margin-bottom: 20px;
  `,
  title: {
    xs: css`
      font-family: 'Racing Sans One', cursive;
      font-size: 3.2rem;
      margin: 0;
    `,
    md: css`
      font-size: 4.8rem;
    `,
  },
};

class App extends React.Component {
  componentWillMount() {
    console.time('App Render');
  }

  componentDidMount() {
    console.timeEnd('App Render');
  }

  render() {
    return (
      <div>
        <Block container={CONTAINER_WIDTH} styles="position: relative">
          <Header href="https://github.com/moarwick/react-super-styled">
            <Heading normal styles={styles.title}>
              &lt; ReactSuperStyled /&gt;
            </Heading>
            <RssLogoWrapper>
              <Display show={{ sm: true }}>
                <Flex alignItems="center">
                  <RssLogo />&nbsp;&nbsp;
                  {version}
                </Flex>
              </Display>
            </RssLogoWrapper>
            <GitHubLogoWrapper>
              <Display show={{ sm: true }}>
                <GitHubLogo />
              </Display>
            </GitHubLogoWrapper>
            <Text center bold large italic margin="0 0 1rem">
              Responsive JSX layouts with Styled Components
            </Text>
          </Header>
        </Block>

        <Rule borderStyle="dotted" color="#676" />

        <Block container={CONTAINER_WIDTH}>
          <Heading h3 color="#676" xLarge normal>
            Wrappers &raquo;
          </Heading>
          {DEMO.WRAPPERS.map((demoProps, index) => (
            <ComponentDemo key={`wrappers-${index}`} {...demoProps} />
          ))}

          <Heading h3 color="#676" xLarge normal>
            Grid &raquo;
          </Heading>
          {DEMO.GRID.map((demoProps, index) => (
            <ComponentDemo key={`grid-${index}`} {...demoProps} />
          ))}

          <Heading h3 color="#676" xLarge normal>
            Typography &raquo;
          </Heading>
          {DEMO.TYPOGRAPHY.map((demoProps, index) => (
            <ComponentDemo key={`type-${index}`} {...demoProps} />
          ))}

          <Heading h3 color="#676" xLarge normal>
            Misc &raquo;
          </Heading>
          {DEMO.MISC.map((demoProps, index) => (
            <ComponentDemo key={`misc-${index}`} {...demoProps} />
          ))}

          <Heading h3 color="#676" xLarge normal>
            Utilities &raquo;
          </Heading>

          <Section styles={styles.section}>
            <Block padding="1rem 2rem">
              <Heading color="firebrick" margin={0} inline xLarge normal>
                withMedia&nbsp;&nbsp;
              </Heading>
              <Text inline>
                Enhancer HOC to supply the current "breakpoint" via prop &nbsp;<code>media</code>.
              </Text>
            </Block>
            <Rule borderStyle="dotted" color="#999" />
            <Block padding="1rem 2rem">
              <pre>export default withMedia(MyComponent, [userTheme])</pre>
              <Text>
                <Span italic color="#999">
                  Current value:&nbsp;&nbsp;
                </Span>
                <strong>{this.props.media}</strong>
              </Text>
            </Block>
          </Section>
        </Block>
      </div>
    );
  }
}

export default withMedia(App);
