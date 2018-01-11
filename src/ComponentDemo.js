import React from 'react';
import styled, { css } from 'styled-components';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Block, Flex, FlexItem, Heading, Rule, Section, Text, Wrap } from './lib/index';

const Code = styled.code`
  color: firebrick;
  font-weight: bold;
  font-size: 12px;
`;

const styles = {
  section: css`
    background-color: #fff;
    box-shadow: 1px 1px 10px 0 rgba(0, 100, 0, 0.2);
    margin-bottom: 20px;
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
    <FlexItem key={propValPair[0]} col={12} smCol={6} mdCol={4} lgCol={3}>
      <Code bold color="firebrick">
        {propValPair[0]}:&nbsp;
        <Wrap normal color="black">
          {propValPair[1]}
        </Wrap>
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
      <Block padding="1 2">
        <Heading color="firebrick" margin={0} inline large normal>
          {name}&nbsp;&nbsp;
        </Heading>
        <Text inline>{description}</Text>
      </Block>
      <Rule borderStyle="dotted" color="#999" />
      <Block padding="* 2">
        <Flex gutter={10} margin="1 * 2">
          {renderedPropTypesList}
        </Flex>
      </Block>
      <LiveProvider code={code} scope={scope}>
        <Flex lgGutter={10}>
          <FlexItem col={12} lgCol={6}>
            <LiveEditor style={styles.editor} />
          </FlexItem>
          <FlexItem col={12} lgCol={6} styles={styles.preview} lgStyles="border: none">
            <LivePreview />
          </FlexItem>
        </Flex>
      </LiveProvider>
    </Section>
  );
};

export default ComponentDemo;
