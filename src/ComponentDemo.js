import React from 'react';
import styled, { css } from 'styled-components';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Block, Flex, FlexItem, Heading, Rule, Section, Text, Span } from './lib/index';

const Code = styled.code`
  color: firebrick;
  font-weight: bold;
  font-size: 1.4rem;
`;

export const styles = {
  section: css`
    background-color: #fff;
    box-shadow: 1px 1px 10px 0 rgba(0, 100, 0, 0.2);
    margin-bottom: 2rem;
  `,
  propNames: css`
    background: linear-gradient(to right, #eee, #bbb);
  `,
  editor: {
    overflowX: 'hidden',
    height: '100%',
  },
  preview: css`
    background-color: #1d1f21;
  `,
};

function renderPropTypesColumns(list) {
  return list.map(propValPair => (
    <FlexItem key={propValPair[0]} col={{ xs: 12 / 12, sm: 6 / 12, md: 4 / 12, lg: 3 / 12 }}>
      <Code bold color="firebrick">
        {propValPair[0]}:&nbsp;
        <Span normal color="black">
          {propValPair[1]}
        </Span>
      </Code>
    </FlexItem>
  ));
}

const ComponentDemo = props => {
  if (!Object.keys(props).length) return null;

  const { code, name, description, propTypesList, scope } = props;
  const renderedPropTypesList = renderPropTypesColumns(propTypesList);

  return (
    <Section styles={styles.section}>
      <Block padding="1rem 2rem">
        <Heading color="firebrick" margin={0} inline xLarge normal>
          {name}&nbsp;&nbsp;
        </Heading>
        <Text inline>{description}</Text>
      </Block>
      <Rule borderStyle="dotted" color="#999" />
      <Block padding="0 2rem">
        <Flex gutter={1} margin="1rem 0 2rem">
          {renderedPropTypesList}
        </Flex>
      </Block>
      <LiveProvider code={code} scope={scope}>
        <Flex gutter={{ lg: 1 }}>
          <FlexItem col={{ xs: 12 / 12, lg: 6 / 12 }}>
            <LiveEditor style={styles.editor} />
            <LiveError />
          </FlexItem>
          <FlexItem
            col={{ xs: 12 / 12, lg: 6 / 12 }}
            styles={styles.preview}
            lgStyles="border: none"
          >
            <LivePreview />
          </FlexItem>
        </Flex>
      </LiveProvider>
    </Section>
  );
};

export default ComponentDemo;
