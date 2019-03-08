import React from "react"
import PropTypes from "prop-types"
import Layout from '../components/layout-mobile-footer'
//import plugin from '../styles/plugin-tags.module.scss'
import { graphql, Link } from "gatsby"
import SoftwareBar from '../components/plugins/software-bar'
import { Helmet } from "react-helmet";
import Card from '../components/plugins/card'
import styled from 'styled-components';
import * as variable from '../styles/variables'
import { darken } from 'polished'
import LazyLoad from "react-lazyload"
import { createGlobalStyle } from 'styled-components'

const Tagss = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} plugin${
    totalCount === 1 ? "" : "s"
  } with the tag "${tag}"`

  return (
    <Layout>
      <GlobalStyle />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Plugins tagged with "{tag}" | BetterDocs</title>
        <meta property="og:site_name" content="BetterDocs"/>
        <meta property="og:title" content={`Plugins tagged with "` + tag + `" | BetterDocs`}/>
        <meta property="og:description" content={ "There are " + totalCount + ` Discordapp plugins that are tagged with "` + tag + `". `}/>
        <meta property="og:url" content="https://betterdocs.us/plugins/" />
      </Helmet>
      <Container>
  
      <Content>
        <SoftwareBar/>
        <Hero>
            <HeroTitle>{tagHeader}</HeroTitle>
            <SearchContainer>
              <Input placeholder="Search the marketplace" />
              <Button>Search</Button>
            </SearchContainer>
        </Hero>
        
        <Main>
          <Cards>
          {edges.map(({ node }) => (
            <LazyLoad key={node.id} height="11rem">
              <Card 
              title={node.frontmatter.title} 
              thumbnail={node.frontmatter.thumbnail}
              slug={node.fields.slug}
              status={node.frontmatter.status}
              tags={node.frontmatter.tags}
              author={node.frontmatter.author}
              excerpt={node.excerpt}
              softwares={node.frontmatter.software}
              key={node.id}/>
            </LazyLoad>
          ))}
          </Cards>
        </Main>
  
      </Content>
  
      </Container>
      <UploadBtn>
          <Link title="Want to publish your plugin?" to="/plugins/upload-a-plugin/">
          +
          </Link>
      </UploadBtn>
      <HelpBtn>
          <Link data-balloon="Want to publish your plugin?" data-balloon-pos="left" to="/plugins/upload-a-plugin" target="blank">?</Link>
      </HelpBtn>
    </Layout>
  )
}

Tagss.propTypes = {
    pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tagss

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark( filter: { frontmatter: { tags: { in: [$tag] } } collection: { eq: "plugins" } } sort: { fields: [frontmatter___title], order: ASC} ) {
      ...pluginFragment
    }
  }
`

const Container = styled.div`
  display: block;
  flex-direction: row;
  background-color: #f1f1f1;
  @media (min-width: 850px) {
      display: flex;
      position: initial;
      top: unset;
      right: unset;
      bottom: unset;
      left: unset;
      padding-top: unset;
  }
`;

const Content = styled.section`
  order: 1;
  overflow: hidden;
  padding-left: unset;
  @media (min-width: 850px) {
    display: flex;
    flex: 3;
    flex-direction: column;
  }
  a:not([class*="SoftwareIcon"]):not([class*="MissingContainer"]):not([class*="Svg"]):not([class*="bar__Tag"]):not(.icon):not([class*="Btn"]):not([class*="ImageContainer"]) {
    display: inline-block;
    transition: color 250ms, text-shadow 250ms;
    color: #000;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    z-index: 0;
    line-height: 1rem;

    &:after {
    position: absolute;
    z-index: -1;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    width: 100%;
    height: 3px;
    background-color: ${variable.SiteColor};
    transition: all 250ms;
    }

    &:hover {
        color: #fff !important;
        opacity: 1;
        background-color: transparent;
        &::after {
            height: 110% !important;
            width: 110% !important;
        }
    }
  }
`;

const Hero = styled.div`
  padding: 40px 80px;
`

const HeroTitle = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-family: sans-serif;
  word-wrap: normal;
  margin: 10px 0;
  @media (min-width: 850px) {
      font-size: 1.7rem;
  }
`

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Input = styled.input`
  margin: 30px 0;
  display: -webkit-box;
  outline: none;
  background-color: #fff;
  width: 20rem;
  padding: 10px 18px;
  font-size: 0.8rem;
  border: 1px solid #d4d4d5;
  box-shadow: 2px 2px 5px rgba(0,0,0,.1);
  font-family: sans-serif;
  border-right: 0;
  border-radius: 0;
  &:hover {
      box-shadow: 2px 2px 5px rgba(0,0,0,.25);
      cursor: not-allowed;
  }
`

const Button = styled.button`
  margin: 30px 0;
  background-color: ${darken(0.1, variable.SiteColor)};
  border: unset;
  color: #fff;
  border-radius: 0;
  font-size: 0.6rem;
  cursor: not-allowed;
  transition: 250ms ease-in-out;
  padding: 0 10px;
  box-shadow: 2px 2px 5px rgba(0,0,0,.18);
  &:hover {
      background-color: ${variable.SiteColor};
      box-shadow: 2px 2px 5px rgba(0,0,0,.35);
  }
  &:active, &:focus {
      outline: unset;
      background-color: ${darken(0.13, variable.SiteColor)};
  }
`

const Main = styled.div`
  display: flex;
  order: 1;
  flex-direction: column;
  max-height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 3.1rem;
  @media (min-width: 850px) {
      padding-bottom: unset;
    }
  &::-webkit-scrollbar-button { 
      display: none; 
      height: 13px; 
      border-radius: 0px; 
  } 
  &::-webkit-scrollbar-thumb { 
      background-color: rgba(${variable.SiteColor}, 0.3);
      transition: background-color .2s ease-in-out;
  } 
  &::-webkit-scrollbar-thumb:hover { 
      background-color: ${variable.SiteColor}; 
  } 
  &::-webkit-scrollbar-track { 
      background-color: rgba(${variable.SiteColor}, 0.06);
  }
  &::-webkit-scrollbar { 
      width: 8px; 
  }
`

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 25px 0;
  overflow: hidden;
  @media (min-width: 850px) {
      padding: 35px 55px;
  }
`

const UploadBtn = styled.div`
  display: inline;
  position: fixed;
  bottom: 52px;
  z-index: 101;
  color: #fff;
  font-size: 10px;
  width: 100%;
  pointer-events: none;
  @media (min-width: 850px) {
      display: none;
  }
  a {
      background-color: ${variable.SiteColor};
      color: #ffffff;
      border-radius: 50%;
      width: 2em;
      height: 2em;
      line-height: 1.75em;
      text-align: center;
      font-size: 2.8em;
      display: block;
      margin: 0 auto;
      position: relative;
      top: 25px;
      border: 3.5px solid #0a0a0a;
      pointer-events: all;
  }
`

const HelpBtn = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 2.5rem;
  z-index: 100;
  display: none;
  @media (min-width: 850px) {
      right: 1.5rem;
      bottom: 1rem;
      display: initial;
  }
  a {
      display: block;
      width: 2.5rem;
      height: 2.5rem;
      background-color: ${variable.SiteColor};
      color: #fff;
      text-align: center;
      line-height: 2.5rem;
      border-radius: 50%;
      transition: all linear 250ms;
      box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.5), inset 0px 2px 3px -2px #ffffff;
      font-size: 1.3rem;
      &:hover {
          box-shadow: 0px 5px 9px 1px rgba(0, 0, 0, 0.4), inset 0px 2px 3px -2px #ffffff;
          background-color: ${darken(0.1, variable.SiteColor)};
      }
  }
`

const GlobalStyle = createGlobalStyle`
[mode="dark"] {
  ${Container} {
    background-color: #36393f;
    ${Content} {
      a:not([class*="SoftwareIcon"]):not([class*="MissingContainer"]):not([class*="Svg"]):not([class*="bar__Tag"]):not(.icon):not([class*="Btn"]):not([class*="ImageContainer"]) {
        color: #fff;
      }
      ${Hero} {
        ${HeroTitle} {
          color: #eee;
        }
        ${SearchContainer} {
          ${Input} {
            background-color: #18191c;
            border-color: #18191c;
            color: #eee;
          }
        }
      }
      ${Main} {
        
      }
    }
  }
}
`