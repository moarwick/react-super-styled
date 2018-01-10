import React from 'react';
import styled, { css } from 'styled-components';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Block, Flex, FlexItem, Heading, Section, Text, Wrap } from './lib/index';

const Code = styled.code`
  font-weight: bold;
  color: firebrick;
`;

const styles = {
  section: css`
    background-color: #ddd;
  `,
  preview: css`
    background-color: #1d1f21;
    border-top: 2px solid #ddd;
  `,
  propNames: css`
    background: linear-gradient(to right, #eee, #bbb);
  `,
  editor: {
    overflowX: 'hidden'
  }
};

function renderPropTypesColumns(list) {
  return list.map(propValPair => (
    <FlexItem col={12} smCol={6} lgCol={3}>
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
      <Block padding="3 2 2">
        <Block>
          <Heading color="firebrick" margin={0} inline large>
            {name}&nbsp;&nbsp;
          </Heading>
          <Text inline>{description}</Text>
          <Flex gutter={10} margin="1 * 2">
            {renderedPropTypesList}
          </Flex>
        </Block>
        <LiveProvider code={code} scope={scope}>
          <Flex lgGutter={10}>
            <FlexItem col={12} lgCol={6}>
              <LiveEditor style={styles.editor} />
              <LiveError />
            </FlexItem>
            <FlexItem col={12} lgCol={6} styles={styles.preview} lgStyles="border: none">
              <LivePreview />
            </FlexItem>
          </Flex>
        </LiveProvider>
      </Block>
    </Section>
  );
};

export default ComponentDemo;
