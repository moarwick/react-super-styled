import React from 'react'
import { css } from 'styled-components'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { Block, Flex, FlexItem, Heading, Section, Text, Wrap } from './lib/index'

const styles = {
  section: css`
    background-color: #ddd;
  `,
  preview: css`
    background-color: #fff;
  `,
  propNames: css`
    background: linear-gradient(to right, #eee, #bbb);
    padding: 10px;
  `,
  editor: {
    overflowX: 'hidden'
  }
}

const ComponentDemo = props => {
  if (!Object.keys(props).length) return null

  const { code, name, description, propList, scope } = props

  return (
    <Section styles={styles.section}>
      <Block padding="3 2 2">
        <Block>
          <Heading color="firebrick" margin={0} inline large>
            {name}&nbsp;&nbsp;
          </Heading>
          <Text inline>{description}</Text>
          <Text styles={styles.propNames} margin="- - 0">
            <Wrap bold>Props:</Wrap>&nbsp;&nbsp;
            <Wrap small color="firebrick">
              <code>{propList}</code>
            </Wrap>
          </Text>
        </Block>
        <LiveProvider code={code} scope={scope}>
          <Flex>
            <FlexItem col="6|1" xsCol={12}>
              <LiveEditor style={styles.editor} />
              <LiveError />
            </FlexItem>
            <FlexItem col="6|1" xsCol={12} styles={styles.preview}>
              <LivePreview />
            </FlexItem>
          </Flex>
        </LiveProvider>
      </Block>
    </Section>
  )
}

export default ComponentDemo
